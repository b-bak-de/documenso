import { describe, expect, it } from 'vitest';

import { updateSigningPlaceholder } from './update-signing-placeholder';

describe('updateSigningPlaceholder', () => {
  it('writes a byte range without changing PDF length', () => {
    const pdf = Buffer.from('%PDF\n/ByteRange [********** ********** ********** **********]\n/Contents <0000>\n%%EOF');
    const result = updateSigningPlaceholder(pdf);

    expect(result.pdf.length).toBe(pdf.length);
    expect(result.byteRange[0]).toBe(0);
    expect(result.byteRange[1]).toBe(pdf.indexOf('<'));
    expect(result.pdf.toString()).toContain(`[0 ${result.byteRange[1]} ${result.byteRange[2]} ${result.byteRange[3]}]`);
  });
});
