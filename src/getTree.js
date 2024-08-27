import _ from 'lodash';

const getTree = (data1, data2) => {
  const keys = _.union(Object.keys(data1), Object.keys(data2));
  const diff = keys.map((key) => {
    if (!Object.hasOwn(data1, key)) {
      return {
        key,
        type: 'added',
        value: data2[key],
      };
    } if (!Object.hasOwn(data2, key)) {
      return {
        key,
        type: 'deleted',
        value: data1[key],
      };
    } if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return {
        key,
        type: 'object',
        children: getTree(data1[key], data2[key]),
      };
    } if (data1[key] !== data2[key]) {
      return {
        key,
        type: 'changed',
        valueOld: data1[key],
        valueNew: data2[key],
      };
    }
    return {
      key,
      type: 'unchanged',
      value: data1[key],
    };
  });
  return _.sortBy(diff, 'key');
};

export default getTree;
