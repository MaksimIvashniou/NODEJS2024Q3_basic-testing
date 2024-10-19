import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 4, b: 2, action: Action.Add, expected: 6 },
  { a: 4, b: 2, action: Action.Subtract, expected: 2 },
  { a: 4, b: 2, action: Action.Multiply, expected: 8 },
  { a: 4, b: 2, action: Action.Divide, expected: 2 },
  { a: 4, b: 2, action: Action.Exponentiate, expected: 16 },
  { a: 4, b: 2, action: '&', expected: null },
  { a: {}, b: 2, action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'should return $expected when $a $action $b',
    ({ expected, ...args }) => {
      expect(simpleCalculator({ ...args })).toBe(expected);
    },
  );
});
