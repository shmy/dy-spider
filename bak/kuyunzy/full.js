const Engine = require('../engine');
const model = require('../model');
const { fullClass } = require('./classify');
const Parser = require('./full_parser');
new Engine(fullClass, Parser, 'kuyunzy', 10, model.failKunYunZYModel);