import _ from 'lodash';

const getIndent = (depth, leftShift = 2) => ' '.repeat(depth * 4 - leftShift);

const stringify = (value, depth) => {
  if (!_.isObject(value)) {
    return `${value}`;
  }
  const lines = Object.entries(value).map(([key, val]) => {
    if (!_.isObject(val)) {
      return `${getIndent(depth)}  ${key}: ${stringify(val, depth)}`;
    }
    return `${getIndent(depth)}  ${key}: ${stringify(val, depth + 1)}`;
  });
  return ['{', ...lines, `${getIndent(depth, 4)}}`].join('\n');
};

const makeStylish = (tree, depth = 1) => {
  const items = tree.map((item) => {
    switch (item.type) {
      case 'changed':
        return `${getIndent(depth)}- ${item.key}: ${stringify(
          item.valueOld,
          depth + 1,
        )}\n${getIndent(depth)}+ ${item.key}: ${stringify(
          item.valueNew,
          depth + 1,
        )}`;
      case 'deleted':
        return `${getIndent(depth)}- ${item.key}: ${stringify(
          item.value,
          depth + 1,
        )}`;
      case 'added':
        return `${getIndent(depth)}+ ${item.key}: ${stringify(
          item.value,
          depth + 1,
        )}`;
      case 'unchanged':
        return `${getIndent(depth)}  ${item.key}: ${stringify(
          item.value,
          depth + 1,
        )}`;
      case 'object':
        return `${getIndent(depth)}  ${item.key}: ${makeStylish(
          item.children,
          depth + 1,
        )}`;
      default:
        throw new Error('Unknown type of key');
    }
  });
  return ['{', ...items, `${getIndent(depth, 4)}}`].join('\n');
};

export default makeStylish;
