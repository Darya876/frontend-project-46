import _ from 'lodash';

const getTree = (data1, data2) => {
  const keys = _.union(Object.keys(data1), Object.keys(data2));
  const diff = keys.map((key) => {
    if (!Object.hasOwn(data1, key)) {
      return {
        key: key,
        type: 'added',
        valueOfKey: data2[key],
      };
    } else if (!Object.hasOwn(data2, key)) {
      return {
        key: key,
        type: 'deleted',
        valueOfKey: data1[key],
      };
    } else if (data1[key] !== data2[key]) {
      return {
        key: key,
        type: 'changed',
        valueOfKey1: data1[key],
        valueOfKey2: data2[key],
      };
    }
    return {
      key: key,
      type: 'unchanged',
      valueOfKey: data1[key],
    };
  });
  return _.sortBy(diff, 'key');
};

export default getTree;
