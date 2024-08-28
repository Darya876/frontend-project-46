import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value) && value !== null) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return String(value);
};

const getFullPath = (node, currentPath) => {
  if (currentPath !== '') {
    return `${currentPath}.${node.key}`;
  }
  return String(node.key);
};

const iter = (tree, path) => tree
  .filter((item) => item.type !== 'unchanged')
  .map((item) => {
    const currentPath = getFullPath(item, path);
    switch (item.type) {
      case 'added':
        return `Property '${currentPath}' was added with value: ${stringify(
          item.value,
        )}`;
      case 'deleted':
        return `Property '${currentPath}' was removed`;
      case 'changed':
        return `Property '${currentPath}' was updated. From ${stringify(
          item.valueOld,
        )} to ${stringify(item.valueNew)}`;
      case 'object':
        return iter(item.children, currentPath).join('\n');
      default:
        throw new Error('Unknown type of key');
    }
  });

const makePlain = (tree) => iter(tree, '').join('\n');

export default makePlain;
