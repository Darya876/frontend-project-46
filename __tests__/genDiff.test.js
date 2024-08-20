import genDiff from '../src/index.js';

test('First test', () => {
  expect(typeof genDiff('../__fixtures__/file1.json', '../__fixtures__/file2.json')).toBe('string');
});
