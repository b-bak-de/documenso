export const updateSigningPlaceholder = (pdf: Buffer) => {
  const byteRangePosition = pdf.lastIndexOf('/ByteRange');
  const byteRangeStart = pdf.indexOf('[', byteRangePosition);
  const byteRangeEnd = pdf.indexOf(']', byteRangePosition);
  const contentsPosition = pdf.indexOf('/Contents', byteRangeEnd);
  const signatureStart = pdf.indexOf('<', contentsPosition);
  const signatureEnd = pdf.indexOf('>', signatureStart);

  if (
    byteRangePosition < 0 ||
    byteRangeStart < 0 ||
    byteRangeEnd < 0 ||
    contentsPosition < 0 ||
    signatureStart < 0 ||
    signatureEnd < 0
  ) {
    throw new Error('Could not locate the PDF signing placeholder');
  }

  const byteRange = [0, signatureStart, signatureEnd + 1, pdf.length - signatureEnd - 1];
  const originalByteRange = pdf.subarray(byteRangeStart, byteRangeEnd + 1);
  const replacement = Buffer.from(`[${byteRange.join(' ')}]`.padEnd(originalByteRange.length, ' '));

  if (replacement.length > originalByteRange.length) {
    throw new Error('PDF byte range placeholder is too small');
  }

  return {
    pdf: Buffer.concat([pdf.subarray(0, byteRangeStart), replacement, pdf.subarray(byteRangeEnd + 1)]),
    byteRange,
    signatureStart,
    signatureEnd,
  };
};
