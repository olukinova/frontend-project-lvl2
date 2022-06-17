import { readFileSync } from 'fs';
import path from 'path';
import _ from 'lodash';

const diff = (file1, file2) => {
  const filePath1 = path.resolve(process.cwd(), file1).trim();
  const filePath2 = path.resolve(process.cwd(), file2).trim();

  const data1 = readFileSync(filePath1, 'utf8');
  const data2 = readFileSync(filePath2, 'utf8');

  const obj1 = JSON.parse(data1);
  const obj2 = JSON.parse(data2);

  const objKeys1 = Object.keys(obj1);
  const objKeys2 = Object.keys(obj2);

  const arraySumSorted = _.sortBy(_.uniq([...objKeys1, ...objKeys2]));

  const hasProperty = (o, p) => Object.prototype.hasOwnProperty.call(o, p);

  let result = '{\n';

  arraySumSorted.forEach((p) => {
    if (hasProperty(obj1, p) && hasProperty(obj2, p)) {
      if (obj1[p] === obj2[p]) {
        result += `    ${p}: ${obj1[p]}\n`;
      } else {
        result += `  - ${p}: ${obj1[p]}\n`;
        result += `  + ${p}: ${obj2[p]}\n`;
      }
    }
    if (hasProperty(obj1, p) && !hasProperty(obj2, p)) {
      result += `  - ${p}: ${obj1[p]}\n`;
    }
    if (!hasProperty(obj1, p) && hasProperty(obj2, p)) {
      result += `  + ${p}: ${obj2[p]}\n`;
    }
  });

  result = result.concat('}');
  return result;
};

export default diff;

// console.log(diff('../../__fixtures__/file1.json', '../../__fixtures__/file2.json'));
