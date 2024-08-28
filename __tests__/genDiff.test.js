import * as fs from 'node:fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), { encoding: 'utf8' });

const expectedFileStylish = readFile('expectedFileStylish.txt');
const expectedFilePlain = readFile('expectedFilePlain.txt');
const expectedFileJson = readFile('expectedFileJson.txt');

const fileJson1 = getFixturePath('file1.json');
const fileJson2 = getFixturePath('file2.json');

const fileYaml1 = getFixturePath('file1.yaml');
const fileYaml2 = getFixturePath('file2.yaml');

const fileYml1 = getFixturePath('file1.yml');
const fileYml2 = getFixturePath('file2.yml');

test('comparing files with nesting', () => {
  expect(genDiff(fileJson1, fileJson2, 'stylish')).toEqual(expectedFileStylish);
  expect(genDiff(fileYaml1, fileYaml2, 'stylish')).toEqual(expectedFileStylish);
  expect(genDiff(fileYml1, fileYml2, 'stylish')).toEqual(expectedFileStylish);

  expect(genDiff(fileJson1, fileJson2, 'plain')).toEqual(expectedFilePlain);
  expect(genDiff(fileYaml1, fileYaml2, 'plain')).toEqual(expectedFilePlain);
  expect(genDiff(fileYml1, fileYml2, 'plain')).toEqual(expectedFilePlain);

  expect(genDiff(fileJson1, fileJson2, 'json')).toEqual(expectedFileJson);
  expect(genDiff(fileYaml1, fileYaml2, 'json')).toEqual(expectedFileJson);
  expect(genDiff(fileYml1, fileYml2, 'json')).toEqual(expectedFileJson);
});
