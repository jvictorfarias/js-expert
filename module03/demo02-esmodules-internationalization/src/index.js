import DraftLog from 'draftlog';
import chalk from 'chalk';
import chalkTable from 'chalk-table';
import readline from 'readline';

import database from '../database.json';
import Person from './person.js';
const DEFAULT_LANGUAGE = 'pt-BR';

DraftLog(console).addLineListener(process.stdin);

const options = {
    leftPad: 2,
    columns: [
        { field: 'id', name: chalk.cyan('ID') },
        { field: 'vehicles', name: chalk.magenta('Vehicles') },
        { field: 'kmTraveled', name: chalk.red('Km Traveled') },
        { field: 'from', name: chalk.yellow('From') },
        { field: 'to', name: chalk.greenBright('to') },
    ],
};

const table = chalkTable(
    options,
    database.map((person) => new Person(person).formatted(DEFAULT_LANGUAGE))
);
const print = console.draft(table);

const terminal = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
