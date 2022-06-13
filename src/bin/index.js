import { readFileSync } from 'fs';
import path from 'path';
import _ from 'lodash';

const diff = (file1, file2) => {

const filePath1 = path.resolve(process.cwd(), file1);
const filePath2 = path.resolve(process.cwd(), file2);

const data1 = readFileSync(filePath1, 'utf8');
const data2 = readFileSync(filePath2);

const obj1 = JSON.parse(data1);
const obj2 = JSON.parse(data2);

const arrayFile1 = [];
const arrayFile2 = [];

_.forIn(obj1,function(value, key) {
    arrayFile1.push(`${key}:${value} `)
  });
  _.forIn(obj2,function(value, key) {
    arrayFile2.push(`${key}:${value} `)
  });

  const arraySum = [...arrayFile1, ...arrayFile2].sort();
  const arraySumSorted = _.sortedUniqBy(arraySum);
  console.log(arraySumSorted);

  const result= arraySumSorted.map((item)=>{
  if(arrayFile1.includes(item) && arrayFile2.includes(item)){
    return `  ${item}`
  }
  else if(arrayFile1.includes(item)){
    return `- ${item}`
  }
  return `+ ${item}`
})
return result.join('\n');

}

console.log(diff('file1.json', 'file2.json'));