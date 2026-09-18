import {
  PDFArray,
  PDFDict,
  PDFDocument,
  PDFHexString,
  PDFName,
  PDFNumber,
  PDFString,
  rectangle,
} from '@cantoo/pdf-lib';

const BYTE_RANGE_PLACEHOLDER = '**********';
const SIGNATURE_PLACEHOLDER_LENGTH = 32768;

export const addSigningPlaceholder = async (pdf: Buffer) => {
  const document = await PDFDocument.load(pdf);
  const [firstPage] = document.getPages();

  if (!firstPage) {
    throw new Error('Cannot sign a PDF without pages');
  }

  const byteRange = PDFArray.withContext(document.context);
  byteRange.push(PDFNumber.of(0));
  byteRange.push(PDFName.of(BYTE_RANGE_PLACEHOLDER));
  byteRange.push(PDFName.of(BYTE_RANGE_PLACEHOLDER));
  byteRange.push(PDFName.of(BYTE_RANGE_PLACEHOLDER));

  const signature = document.context.register(
    document.context.obj({
      Type: 'Sig',
      Filter: 'Adobe.PPKLite',
      SubFilter: 'adbe.pkcs7.detached',
      ByteRange: byteRange,
      Contents: PDFHexString.fromText(' '.repeat(SIGNATURE_PLACEHOLDER_LENGTH)),
      Reason: PDFString.of('Signed by B-BAK'),
      M: PDFString.fromDate(new Date()),
    }),
  );

  const widget = document.context.register(
    document.context.obj({
      Type: 'Annot',
      Subtype: 'Widget',
      FT: 'Sig',
      Rect: [0, 0, 0, 0],
      V: signature,
      T: PDFString.of('Signature1'),
      F: 4,
      P: firstPage.ref,
      AP: document.context.obj({
        N: document.context.register(document.context.formXObject([rectangle(0, 0, 0, 0)])),
      }),
    }),
  );

  let widgets: PDFArray;
  try {
    widgets = firstPage.node.lookup(PDFName.of('Annots'), PDFArray);
  } catch {
    widgets = PDFArray.withContext(document.context);
    firstPage.node.set(PDFName.of('Annots'), widgets);
  }
  widgets.push(widget);

  let form: PDFDict;
  try {
    form = document.catalog.lookup(PDFName.of('AcroForm'), PDFDict);
  } catch {
    form = document.context.obj({ Fields: PDFArray.withContext(document.context) });
    document.catalog.set(PDFName.of('AcroForm'), form);
  }

  let fields: PDFArray;
  try {
    fields = form.lookup(PDFName.of('Fields'), PDFArray);
  } catch {
    fields = PDFArray.withContext(document.context);
    form.set(PDFName.of('Fields'), fields);
  }
  form.set(PDFName.of('Fields'), fields);
  fields.push(widget);
  form.set(PDFName.of('SigFlags'), PDFNumber.of(3));

  return Buffer.from(await document.save({ useObjectStreams: false }));
};
