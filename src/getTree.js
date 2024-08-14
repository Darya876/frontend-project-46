import _ from 'lodash';

const getTree = (data1, data2) => {
  const keys = _.union(Object.keys(data1), Object.keys(data2));
  const diff = keys.map((key) => {
    if (!Object.hasOwn(data1, key)) {
      return {
        key: key,
        type: 'added',
        valueofKey: data2[key],
      };
    } else if (!Object.hasOwn(data2, key)) {
      return {
        key: key,
        type: 'deleted',
        valueofKey: data1[key],
      };
    } else if (data1[key] !== data2[key]) {
      return {
        key: key,
        type: 'changed',
        valueOfKeyOfFile1: data1[key],
        valueOfKeyOfFile2: data2[key],
      };
    }
    return {
      key: key,
      type: 'unchanged',
      valueOfKey: data1[key],
    };
  });

  return diff;
};

export default getTree;
