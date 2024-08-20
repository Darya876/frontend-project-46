import genDiff from '../src/index.js';

test('First test', () => {
  expect(typeof genDiff(file1.json, file2.json)).toBe('string');
});

