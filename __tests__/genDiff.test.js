import * as fs from 'node:fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';
import makePlain from '../src/formatters/plain.js';
import makeStylish from '../src/formatters/stylish.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), { encoding: 'utf8' });

const expectedFileStylish = readFile('expectedFileStylish.txt');
const expectedFilePlain = readFile('expectedFilePlain.txt');
const expectedFileJson = readFile('expectedFileJson.txt');

test('comparing files with nesting', () => {
  expect(genDiff('./__fixtures__/file1.json', './__fixtures__/file2.json', 'stylish')).toEqual(expectedFileStylish);
  expect(genDiff('./__fixtures__/file1.yaml', './__fixtures__/file2.yaml', 'stylish')).toEqual(expectedFileStylish);
  expect(genDiff('./__fixtures__/file1.yml', './__fixtures__/file2.yml', 'stylish')).toEqual(expectedFileStylish);

  expect(genDiff('./__fixtures__/file1.json', './__fixtures__/file2.json', 'plain')).toEqual(expectedFilePlain);
  expect(genDiff('./__fixtures__/file1.yaml', './__fixtures__/file2.yaml', 'plain')).toEqual(expectedFilePlain);
  expect(genDiff('./__fixtures__/file1.yml', './__fixtures__/file2.yml', 'plain')).toEqual(expectedFilePlain);

  expect(genDiff('./__fixtures__/file1.json', './__fixtures__/file2.json', 'json')).toEqual(expectedFileJson);
  expect(genDiff('./__fixtures__/file1.yaml', './__fixtures__/file2.yaml', 'json')).toEqual(expectedFileJson);
  expect(genDiff('./__fixtures__/file1.yml', './__fixtures__/file2.yml', 'json')).toEqual(expectedFileJson);
});

test('testing possible errors', () => {
  expect(() => {
    genDiff('./__fixtures__/fileError1.txt', './__fixtures__/fileError2.txt');
  }).toThrow('Unknown file extension!');

  expect(() => {
    genDiff('./__fixtures__/file2.json', './__fixtures__/file2.json', 'anotherFormat');
  }).toThrow('Unknown format! Please use one of these formats: stylish, plain, json.');

  expect(() => {
    const wrongTree = [
      { key: 'follow', type: 'deleted', value: false },
      { key: 'host', type: 'unchanged', value: 'hexlet.io' },
      { key: 'proxy', type: 'deleted', value: '123.234.53.22' },
      {
        key: 'timeout', type: 'wrongType', valueOld: 50, valueNew: 20,
      },
      { key: 'verbose', type: 'added', value: true },
    ];
    makePlain(wrongTree);
  }).toThrow('Unknown type of key');

  expect(() => {
    const wrongTree = [
      { key: 'follow', type: 'deleted', value: false },
      { key: 'host', type: 'unchanged', value: 'hexlet.io' },
      { key: 'proxy', type: 'deleted', value: '123.234.53.22' },
      {
        key: 'timeout', type: 'wrongType', valueOld: 50, valueNew: 20,
      },
      { key: 'verbose', type: 'added', value: true },
    ];
    makeStylish(wrongTree);
  }).toThrow('Unknown type of key');
});
