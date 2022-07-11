import { readFileSync } from 'fs';
import path from 'path';
import buildDifference from './treeBuilder.js';
import parseFile from './parsers.js';
import stylish from './formatters/fileFormatters.js';

const getAbsoluteFilePath = (file) => path.resolve(process.cwd(), file).trim();
// console.log(getAbsoluteFilePath('../__fixtures__/file1.json'));
const getFileExtensions = (file) => path.extname(file).slice(1);

const getFileContent = (file) => {
  const filePath = getAbsoluteFilePath(file);
  const fileContent = readFileSync(filePath, 'utf8');
  const fileExtension = getFileExtensions(file);
  return parseFile(fileContent, fileExtension);
};

const genDiff = (filePath1, filePath2, format = 'stylish') => {
  const file1 = getFileContent(filePath1);
  const file2 = getFileContent(filePath2);
  const diffInfo = buildDifference(file1, file2);
  return stylish(diffInfo,format, '    ');
};

export default genDiff;

// console.log(genDiff('../__fixtures__/file1.json', '../__fixtures__/file2.json'));
