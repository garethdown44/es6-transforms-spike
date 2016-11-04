import transform from './transform';

const json = require('./original.json');

const transformed = transform(json);

console.log(JSON.stringify(transformed, null, 2));