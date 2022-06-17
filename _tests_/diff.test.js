import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import diff from '../src/bin/index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf8');

test('gendiff ext-js', () => {
  const path1 = getFixturePath('file1.json');
  const path2 = getFixturePath('file2.json');
  const correctJs = readFile('correctResultJSON.txt');
  expect(diff(path1, path2)).toEqual(correctJs);
});
