import fs from 'fs';
import path from 'path';
import parseFile from './parse.js';
import getTree from './getTree.js';
import formatter from './formatters/formatter.js';

const getFilepath = (filepath) => path.resolve(process.cwd(), filepath);

const getFileExt = (filepath) => filepath.split('.').at(-1);

const getData = (filepath) => fs.readFileSync(filepath, { encoding: 'utf8' });

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const path1 = getFilepath(filepath1);
  const data1 = getData(path1);
  const fileExt1 = getFileExt(path1);
  const dataParsed1 = parseFile(data1, fileExt1);

  const path2 = getFilepath(filepath2);
  const data2 = getData(path2);
  const fileExt2 = getFileExt(path2);
  const dataParsed2 = parseFile(data2, fileExt2);

  const tree = getTree(dataParsed1, dataParsed2);
  return formatter(tree, format);
};

export default genDiff;
