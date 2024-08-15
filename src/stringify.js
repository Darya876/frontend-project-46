import _ from 'lodash';

const stringify = (value) => {
  const iter = (data, depth) => {
    if (!_.isObject(data)) {
      return `${data}`;
    }
    const lines = Object.entries(data).map(([key, val]) => `${key}: ${iter(val, depth + 1)}`);
    return ['{', ...lines, '}'].join('\n');
  };
  return iter(value, 1);
};

const getFinDiff = (arr) => {
  const iter = (data, depth) => data.map((item) => {
    const indent = ' '.repeat(depth * 3);
    switch (item.type) {
      case 'changed':
        return `${indent}- ${item.key}: ${stringify(item.valueOfKey1)}\n${indent}+ ${item.key}: ${stringify(item.valueOfKey2)}`;
      case 'deleted':
        return `${indent}- ${item.key}: ${stringify(item.valueOfKey)}`;
      case 'added':
        return `${indent}+ ${item.key}: ${stringify(item.valueOfKey)}`;
      case 'unchanged':
        return `${indent}  ${item.key}: ${stringify(item.valueOfKey)}`;
      default:
        throw new Error('No required type to use!');
    }
  }).sort().join('\n');
  return `{\n${iter(arr, 1)}\n}`;
};

export default getFinDiff;
