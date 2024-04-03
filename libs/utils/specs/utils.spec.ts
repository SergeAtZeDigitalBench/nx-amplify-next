import { isDefined } from '../src';

describe('isDefined', () => {
  const testData = getTestData();
  it('should return `false` if the value is `null` or `undefined` ', () => {
    const { input, output } = testData.isDefined;
    const received = input.map(isDefined);

    expect(received).toEqual(output);
  });
});

function getTestData() {
  return {
    isDefined: {
      input: [
        null,
        undefined,
        0,
        1,
        '',
        'hi',
        true,
        false,
        [],
        {},
        ['a'],
        { a: 1 },
      ],
      output: [
        false,
        false,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
      ],
    },
  };
}
