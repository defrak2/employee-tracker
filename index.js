const { CLI }= require('./lib/prompts');
const cli = new CLI();


const { Database } = require('./lib/queries');
const database = new Database();

cli.run();
