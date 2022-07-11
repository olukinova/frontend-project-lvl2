import makeStylish from './stylish.js';

export default (data, format, replacer) => {
  switch (format) {
    case 'stylish':
      return makeStylish(data, replacer);
    default:
      throw new Error(`Invalid file format: '.${format}'! Please try supported file formats.`);
  }
};
