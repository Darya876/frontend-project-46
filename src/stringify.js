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
  const iter = (data, depth) => {
    return data.map((item) => {
      const indent = ' '.repeat(depth * 3);
      const key = item.key;
      const type = item.type;
      const value = item.valueOfKey;
      const value1 = item.valueOfKey1;
      const value2 = item.valueOfKey2;
      switch (type) {
        case 'changed':
          return `${indent}- ${key}: ${stringify(value1)}\n${indent}+ ${key}: ${stringify(value2)}`;
        case 'deleted':
          return `${indent}- ${key}: ${stringify(value)}`;
        case 'added':
          return `${indent}+ ${key}: ${stringify(value)}`;
        case 'unchanged':
          return `${indent}  ${key}: ${stringify(value)}`;
      }
    }).join('\n');
  }
  return `{\n${iter(arr, 1)}\n}`;
};

export default getFinDiff;
