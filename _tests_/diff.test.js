import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const getFixturePath = (filename) => path.join(__dirname, '/../__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf8');

test('Compares two JSON files without errors', () => {
  const path1 = getFixturePath('file1.json');
  const path2 = getFixturePath('file2.json');
  const correctJs = readFile('correctResultJSON.txt');
  expect(genDiff(path1, path2)).toEqual(correctJs);
});

test('Compares two yaml files without errors', () => {
  const path1 = getFixturePath('file1.yaml');
  const path2 = getFixturePath('file2.yaml');
  const correctJs = readFile('correctResultYML.txt');
  expect(genDiff(path1, path2)).toEqual(correctJs);
});

test('Compares two yaml files without errors (with different extensions)', () => {
  const path1 = getFixturePath('file1.yaml');
  const path2 = getFixturePath('file2.yml');
  const correctJs = readFile('correctResultYML.txt');
  expect(genDiff(path1, path2)).toEqual(correctJs);
});

test('Compares json and yaml files without errors', () => {
  const path1 = getFixturePath('file1.json');
  const path2 = getFixturePath('file2.yml');
  const correctJs = readFile('correctResultJSON.txt');
  expect(genDiff(path1, path2)).toEqual(correctJs);
});
