const { error } = require('./src/constants');
const File = require('./src/file');
const { rejects, deepStrictEqual } = require('assert');

(async () => {
    {
        const filePath = './mocks/emptyFile-invalid.csv';
        const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
        const result = File.csvToJson(filePath);
        await rejects(result, rejection);
    }
    {
        const filePath = './mocks/fourItems-invalid.csv';
        const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
        const result = File.csvToJson(filePath);
        await rejects(result, rejection);
    }
    {
        const filePath = './mocks/threeItems-valid.csv';
        const result = await File.csvToJson(filePath);
        const expected = [
            {
                id: 123,
                name: 'Erick Wendel',
                profession: 'Javascript Instructor',
                birthday: 1996,
            },
            {
                id: 321,
                name: 'Victor da Silva',
                profession: 'Javascript Specialist',
                birthday: 1941,
            },
            {
                id: 231,
                name: 'Joaozinho',
                profession: 'Java Developer',
                birthday: 1991,
            },
        ];

        deepStrictEqual(JSON.stringify(result), JSON.stringify(expected));
    }
})();
