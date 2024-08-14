import fs from 'fs';
import path from 'path';
import parseFile from './parse.js';
import getTree from './getTree.js';
import getFinDiff from './stringify.js';

const getFilepath = (filepath) => path.resolve(process.cwd(), filepath);

const getFormat = (filepath) => filepath.split('.').at(-1);

const getData = (filepath) => fs.readFileSync(filepath, { encoding: 'utf8' });

const genDiff = (filepath1, filepath2) => {
  const path1 = getFilepath(filepath1);
  const data1 = getData(path1);
  const formatFile1 = getFormat(path1);
  const dataParsed1 = parseFile(data1, formatFile1);

  const path2 = getFilepath(filepath2);
  const data2 = getData(path2);
  const formatFile2 = getFormat(path2);
  const dataParsed2 = parseFile(data2, formatFile2);

  const tree = getTree(dataParsed1, dataParsed2);
  return getFinDiff(tree);
};

export default genDiff;
