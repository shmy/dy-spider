const Engine = require('../engine');
const { fullClass } = require('./classify');
const Parser = require('./full_parser');
console.log(fullClass)
new Engine(fullClass, Parser, 'zuidazy', 10);