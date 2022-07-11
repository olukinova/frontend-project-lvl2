import { load } from 'js-yaml';

const parseFile = (fileContent, fileExtension) => {
  switch (fileExtension) {
    case 'yaml':
    case 'yml':
      return load(fileContent);
    case 'json':
      return JSON.parse(fileContent);
    default:
      throw Error('Parameters in not an support extension!');
  }
};

export default parseFile;
