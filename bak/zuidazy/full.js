const Engine = require('../engine');
const { fullClass } = require('./classify');
const Parser = require('./full_parser');
new Engine(fullClass, Parser, 'zuidazy', 10);