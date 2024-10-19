import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const values = { a: 4, b: 2 };
    const action = Action.Add;
    const result = 6;

    expect(simpleCalculator({ ...values, action })).toBe(result);
  });

  test('should subtract two numbers', () => {
    const values = { a: 4, b: 2 };
    const action = Action.Subtract;
    const result = 2;

    expect(simpleCalculator({ ...values, action })).toBe(result);
  });

  test('should multiply two numbers', () => {
    const values = { a: 4, b: 2 };
    const action = Action.Multiply;
    const result = 8;

    expect(simpleCalculator({ ...values, action })).toBe(result);
  });

  test('should divide two numbers', () => {
    const values = { a: 4, b: 2 };
    const action = Action.Divide;
    const result = 2;

    expect(simpleCalculator({ ...values, action })).toBe(result);
  });

  test('should exponentiate two numbers', () => {
    const values = { a: 4, b: 2 };
    const action = Action.Exponentiate;
    const result = 16;

    expect(simpleCalculator({ ...values, action })).toBe(result);
  });

  test('should return null for invalid action', () => {
    const values = { a: 4, b: 2 };
    const action = 'no-typical-action';

    expect(simpleCalculator({ ...values, action })).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const values = { a: {}, b: 2 };
    const action = Action.Add;

    expect(simpleCalculator({ ...values, action })).toBeNull();
  });
});
