import _ from 'lodash';

const buildDifference = (file1, file2) => {
  const keys1 = _.keys(file1);
  const keys2 = _.keys(file2);
  const sortedKeys = _.sortBy(_.union(keys1, keys2));
  return sortedKeys.map((key) => {
    if (!_.has(file1, key)) {
      return { key, state: 'added', value: file2[key] };
    }
    if (!_.has(file2, key)) {
      return { key, state: 'deleted', value: file1[key] };
    }
    if (_.isObject(file1[key]) && _.isObject(file2[key])) {
      return { key, state: 'nested', value: buildDifference(file1[key], file2[key]) };
    }
    if (!_.isEqual(file1[key], file2[key])) {
      return {
        key, state: 'changed', value1: file1[key], value2: file2[key],
      };
    }
    return { key, state: 'notChanged', value: file1[key] };
  });
};

// console.log(buildDifference(file1, file2));

export default buildDifference;
