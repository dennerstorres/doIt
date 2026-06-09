import {encrypt, decrypt} from '../security';

describe('Security Utility', () => {
  const plainText = '{"tasks": [{"id": "1", "task": "Test Task"}]}';

  it('should encrypt and decrypt correctly', () => {
    const encrypted = encrypt(plainText);
    expect(encrypted).not.toBe(plainText);

    const decrypted = decrypt(encrypted);
    expect(decrypted).toBe(plainText);
  });

  it('should return null for invalid encrypted data', () => {
    const invalidData = 'not-encrypted-data';
    const decrypted = decrypt(invalidData);
    expect(decrypted).toBeNull();
  });

  it('should produce different encrypted values for the same plain text (due to AES salt)', () => {
    const encrypted1 = encrypt(plainText);
    const encrypted2 = encrypt(plainText);

    // In many AES implementations with random salt/IV, these would be different.
    // crypto-js AES.encrypt uses a random salt by default.
    expect(encrypted1).not.toBe(encrypted2);

    // Both should still decrypt to the same plain text
    expect(decrypt(encrypted1)).toBe(plainText);
    expect(decrypt(encrypted2)).toBe(plainText);
  });
});
