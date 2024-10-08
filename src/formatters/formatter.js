import makeStylish from './stylish.js';
import makePlain from './plain.js';
import makeJson from './json.js';

const formatter = (tree, format = 'stylish') => {
  switch (format) {
    case 'stylish':
      return makeStylish(tree);
    case 'plain':
      return makePlain(tree);
    case 'json':
      return makeJson(tree);
    default:
      throw new Error('Unknown format! Please use one of these formats: stylish, plain, json.');
  }
};

export default formatter;
