import { beforeEach, describe, expect, it, vi } from 'vitest';

import { calculateAuthorizationToken, requestSignatureFromAPI } from './trusted-signatures';

describe('Trusted Signatures transport', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('calculates the HMAC over the request body and timestamp', () => {
    const token = calculateAuthorizationToken({
      apiKey: Buffer.from('secret'),
      message: '{"digest":"abc"}',
      timeAsIso8601String: '2026-01-01T00:00:00.000Z',
    });

    expect(token.toString('hex')).toBe('ca94fbc034955b709710e047cf28d76a29b3c2939d1efe025a35b8bfd8cd73cd');
  });

  it('sends the digest request and decodes the returned signature', async () => {
    const fetchMock = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue(
        new Response(JSON.stringify({ signature: Buffer.from('cms').toString('base64') }), { status: 200 }),
      );

    const result = await requestSignatureFromAPI({
      apiKeyId: 'key-id',
      apiKey: Buffer.from('secret'),
      digest: Buffer.from('digest'),
      tsaTimestamp: true,
    });

    expect(result).toEqual(Buffer.from('cms'));
    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.trusted-signatures.com/v1/sign',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'X-Authorization-Key': 'key-id',
          'X-Authorization-Algorithm': 'HmacSHA256',
        }),
      }),
    );
  });

  it('reports a non-successful API response', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(null, { status: 400 }));

    await expect(
      requestSignatureFromAPI({
        apiKeyId: 'key-id',
        apiKey: Buffer.from('secret'),
        digest: Buffer.from('digest'),
        tsaTimestamp: false,
      }),
    ).rejects.toThrow('status 400');
  });
});
