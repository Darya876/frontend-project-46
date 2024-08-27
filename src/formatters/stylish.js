import _ from 'lodash';

const stringify = (value, depth) => {
  const openBracketIndent = ' '.repeat(depth * 2 - 1);
  const closeBracketIndent = ' '.repeat(depth * 2 - 2);

  if (!_.isObject(value)) {
    return `${value}`;
  }
  const lines = Object.entries(value).map(
    ([key, val]) => `${openBracketIndent}  ${key}: ${stringify(val, depth + 1)}`,
  );
  return ['{', ...lines, `${closeBracketIndent} }`].join('\n');
};

const makeStylish = (tree, depth = 1) => {
  const openBracketIndent = ' '.repeat(depth * 2 - 1);
  const closeBracketIndent = ' '.repeat(depth * 2 - 2);

  const items = tree.map((item) => {
    switch (item.type) {
      case 'changed':
        return `${openBracketIndent}- ${item.key}: ${stringify(
          item.valueOld,
          depth + 1,
        )}\n${openBracketIndent}+ ${item.key}: ${stringify(
          item.valueNew,
          depth + 1,
        )}`;
      case 'deleted':
        return `${openBracketIndent}- ${item.key}: ${stringify(
          item.value,
          depth + 1,
        )}`;
      case 'added':
        return `${openBracketIndent}+ ${item.key}: ${stringify(
          item.value,
          depth + 1,
        )}`;
      case 'unchanged':
        return `${openBracketIndent}  ${item.key}: ${stringify(
          item.value,
          depth + 1,
        )}`;
      case 'object':
        return `${openBracketIndent}  ${item.key}: ${makeStylish(
          item.children,
          depth + 1,
        )}`;
      default:
        return null;
    }
  });
  return ['{', ...items, `${closeBracketIndent}}`].join('\n');
};

export default makeStylish;
