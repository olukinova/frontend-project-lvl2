import { load } from 'js-yaml';

const parseFile = (text, extension) => {
  switch (extension) {
    case '.yaml':
    case '.yml':
      return load(text);
    case '.json':
      return JSON.parse(text);
    default:
      throw Error('Parameters in not an support extension!');
  }
};

export default parseFile;
