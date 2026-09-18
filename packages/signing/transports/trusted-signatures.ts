import crypto from 'node:crypto';

import { env } from '@documenso/lib/utils/env';

import { addSigningPlaceholder } from '../helpers/add-signing-placeholder';
import { updateSigningPlaceholder } from '../helpers/update-signing-placeholder';

const TRUSTED_SIGNATURES_URL = 'https://api.trusted-signatures.com/v1/sign';

export type SignWithTrustedSignaturesOptions = {
  pdf: Buffer;
};

export const signWithTrustedSignatures = async ({ pdf }: SignWithTrustedSignaturesOptions) => {
  const apiKeyId = env('NEXT_PRIVATE_SIGNING_TS_API_KEY_ID');
  const apiKeyHex = env('NEXT_PRIVATE_SIGNING_TS_API_KEY');

  if (!apiKeyId) {
    throw new Error('No API Key ID found for Trusted Signatures signing');
  }

  if (!apiKeyHex) {
    throw new Error('No API Key found for Trusted Signatures signing');
  }

  const apiKey = Buffer.from(apiKeyHex, 'hex');
  const placeholderPdf = await addSigningPlaceholder(pdf);
  const updated = updateSigningPlaceholder(placeholderPdf);
  const content = Buffer.concat([
    updated.pdf.subarray(0, updated.byteRange[1]),
    updated.pdf.subarray(updated.byteRange[2]),
  ]);
  const signature = await requestSignatureFromAPI({
    apiKeyId,
    apiKey,
    digest: crypto.createHash('sha256').update(content).digest(),
    tsaTimestamp: env('NEXT_PRIVATE_SIGNING_TS_TIMESTAMP') === 'true',
  });

  const signatureHex = signature.toString('hex');
  const availableHexLength = updated.signatureEnd - updated.signatureStart - 1;

  if (signatureHex.length > availableHexLength) {
    throw new Error('Trusted Signatures response exceeds the PDF signature placeholder');
  }

  return Buffer.concat([
    updated.pdf.subarray(0, updated.signatureStart + 1),
    Buffer.from(signatureHex.padEnd(availableHexLength, '0')),
    updated.pdf.subarray(updated.signatureEnd),
  ]);
};

export const calculateAuthorizationToken = ({
  apiKey,
  message,
  timeAsIso8601String,
}: {
  apiKey: Buffer;
  message: string;
  timeAsIso8601String: string;
}) => {
  const hmac = crypto.createHmac('sha256', apiKey);
  hmac.update(message);
  hmac.update(timeAsIso8601String);
  return hmac.digest();
};

export const requestSignatureFromAPI = async ({
  apiKeyId,
  apiKey,
  digest,
  tsaTimestamp,
}: {
  apiKeyId: string;
  apiKey: Buffer;
  digest: Buffer;
  tsaTimestamp: boolean;
}) => {
  const timeAsIso8601String = new Date().toISOString();
  const message = JSON.stringify({
    digestAlgorithm: 'SHA256',
    digest: digest.toString('base64'),
    tsaTimestamp,
  });
  const hmac = calculateAuthorizationToken({ apiKey, message, timeAsIso8601String });
  const response = await fetch(TRUSTED_SIGNATURES_URL, {
    method: 'POST',
    headers: {
      'User-Agent': 'Documenso',
      'Content-Type': 'application/json',
      'X-Authorization': hmac.toString('base64'),
      'X-Authorization-Time': timeAsIso8601String,
      'X-Authorization-Key': apiKeyId,
      'X-Authorization-Algorithm': 'HmacSHA256',
    },
    body: message,
  });

  if (!response.ok) {
    throw new Error(`Trusted Signatures request failed with status ${response.status}`);
  }

  const payload = (await response.json()) as { signature?: string };

  if (!payload.signature) {
    throw new Error('Trusted Signatures response did not contain a signature');
  }

  return Buffer.from(payload.signature, 'base64');
};
