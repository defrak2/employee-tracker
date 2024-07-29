const { CLI }= require('./lib/prompts');
const { Database } = require('./lib/queries');


const cli = new CLI();
const database = new Database();

cli.run();
