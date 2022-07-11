import _ from 'lodash';

const stringify = (data, depth, replacer) => {
  if (!_.isObject(data)) {
    return `${data}`;
  }
  const keyIndent = replacer.repeat(depth + 1);
  const bracketIndent = replacer.repeat(depth);
  const lines = Object.entries(data).map(([key, value]) => `${keyIndent}${key}: ${stringify(value, depth + 1, replacer)}`);
  return ['{', ...lines, `${bracketIndent}}`].join('\n');
};
const symbol = {
  added: '+',
  deleted: '-',
  notChanged: ' ',
};
const makeStylish = (diff, replacer = '    ') => {
  const iter = (tree, depth) => tree.map((node) => {
    const indent = replacer.repeat(depth);
    const signIndent = indent.slice(2);
    const makeString = (value, sign) => `${signIndent}${sign} ${node.key}: ${stringify(value, depth, replacer)}`;
    switch (node.state) {
      case 'added':
        return makeString(node.value, symbol.added);
      case 'deleted':
        return makeString(node.value, symbol.deleted);
      case 'notChanged':
        return makeString(node.value, symbol.notChanged);
      case 'changed':
        return [`${makeString(node.value1, symbol.deleted)}`,
          `${makeString(node.value2, symbol.added)}`].join('\n');
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
