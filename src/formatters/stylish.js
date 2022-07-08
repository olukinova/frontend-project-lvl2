import _ from 'lodash';

const stringify = (data, depth, replacer) => {
// если данные не являются объектом - возвращаем данные
  if (!_.isObject(data)) {
    return `${data}`;
  }

  const indentForProp = replacer.repeat(depth + 1); //replacer для строки
  const indentForBracket = replacer.repeat(depth); //replacer для скобки
  const element = Object.entries(data)
    .map(([key, value]) => `${indentForProp}${key}: ${stringify(value, depth + 1, replacer)}`);

  return ['{', ...element, `${indentForBracket}}`].join('\n'); //формируем строку в массив, объединяем и упаковываем ее в фигурные скобки 
};

const sign = {
  added: '+',
  deleted: '-',
  unchanged: ' ',
};

const makeStylish = (diff, replacer = '    ') => {
  const iter = (tree, depth) => tree.map((node) => {
    const indent = replacer.repeat(depth);
    const indentForSign = indent.slice(2);

    const makeLine = (value, mark) => `${indentForSign}${mark} ${node.key}: ${stringify(value, depth, replacer)}`;

    switch (node.state) {
      case 'added':
        return makeLine(node.value, sign.added);
      case 'deleted':
        return makeLine(node.value, sign.deleted);
      case 'notChanged':
        return makeLine(node.value, sign.unchanged);
      case 'changed':
        return [`${makeLine(node.value1, sign.deleted)}`,
          `${makeLine(node.value2, sign.added)}`].join('\n');
      case 'nested':
        return `${indent}${node.key}: ${['{', ...iter(node.value, depth + 1), `${indent}}`].join('\n')}`;
      default:
        throw new Error(`Type: ${node.state} is undefined`);
    }
  });

  const stylishDiff = iter(diff, 1);
  return ['{', ...stylishDiff, '}'].join('\n');
};

export default makeStylish;
