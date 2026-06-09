import CryptoJS from 'crypto-js';
import {logger} from './logger';

// In a real application, this secret should be more robustly managed
// (e.g., generated on first run and stored in Keychain/Keystore)
const SECRET_KEY = 'doit-app-secret-key-revisar-persistencia-segura';

/**
 * Encrypts a string using AES.
 */
export const encrypt = (data: string): string => {
  return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
};

/**
 * Decrypts an AES encrypted string.
 * Returns null if decryption fails.
 */
export const decrypt = (encryptedData: string): string | null => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);

    if (!decryptedData) {
      return null;
    }

    return decryptedData;
  } catch (error) {
    logger.error('Decryption failed:', error);
    return null;
  }
};
