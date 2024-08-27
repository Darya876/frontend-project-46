import fs from 'fs';
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

const fileJson1 = './__fixtures__/file1.json';
const fileJson2 = './__fixtures__/file2.json';

const fileYaml1 = './__fixtures__/file1.yaml';
const fileYaml2 = './__fixtures__/file1.yaml';

const fileYml1 = './__fixtures__/file1.yml';
const fileYml2 = './__fixtures__/file1.yml';

test('comparing files with nesting', () => {
  expect(genDiff(fileJson1, fileJson2).toEqual(expectedFileStylish));
  expect(genDiff(fileYaml1, fileYaml2).toEqual(expectedFileStylish));
  expect(genDiff(fileYml1, fileYml2).toEqual(expectedFileStylish));

  expect(genDiff(fileJson1, fileJson2).toEqual(expectedFilePlain));
  expect(genDiff(fileYaml1, fileYaml2).toEqual(expectedFilePlain));
  expect(genDiff(fileYml1, fileYml2).toEqual(expectedFilePlain));

  expect(genDiff(fileJson1, fileJson2).toEqual(expectedFileJson));
  expect(genDiff(fileYaml1, fileYaml2).toEqual(expectedFileJson));
  expect(genDiff(fileYml1, fileYml2).toEqual(expectedFileJson));
});
