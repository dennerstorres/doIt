import {sanitizeInput} from '../sanitization';

describe('sanitization utility', () => {
  it('should remove HTML tags', () => {
    const input = 'Hello <b>World</b>';
    const expected = 'Hello World';
    expect(sanitizeInput(input)).toBe(expected);
  });

  it('should remove script tags', () => {
    const input = '<script>alert("xss")</script>Test';
    const expected = 'alert("xss")Test';
    expect(sanitizeInput(input)).toBe(expected);
  });

  it('should trim whitespace', () => {
    const input = '   Clean Me   ';
    const expected = 'Clean Me';
    expect(sanitizeInput(input)).toBe(expected);
  });

  it('should handle empty input', () => {
    expect(sanitizeInput('')).toBe('');
    // @ts-ignore
    expect(sanitizeInput(null)).toBe('');
    // @ts-ignore
    expect(sanitizeInput(undefined)).toBe('');
  });

  it('should handle complex nested tags', () => {
    const input = '<div><span>Nested</span> <br/> content</div>';
    const expected = 'Nested  content';
    expect(sanitizeInput(input)).toBe(expected);
  });

  it('should not affect normal text', () => {
    const input = 'Buy milk & eggs';
    const expected = 'Buy milk & eggs';
    expect(sanitizeInput(input)).toBe(expected);
  });
});
