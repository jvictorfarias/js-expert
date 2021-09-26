'use strict';

const {
    watch,
    promises: { readFile },
} = require('fs');

class File {
    watch(event, filename) {
        console.log('this', this);
        console.log('arguments', Array.prototype.slice.call(arguments));
        this.showContent(filename);
    }

    async showContent(filename) {
        console.log((await readFile(filename)).toString());
    }
}

const file = new File();
// In this way it ignores the 'this' from the parent class
// Inherit the 'this' from the watch function
// watch(__filename, file.watch);

// We can change this behavior by using anonimous function
// ! watch(__filename, (event, filename) => file.watch(event, filename));

// Explicit context
// Bind returns a function with the 'this' of file, ignoring the watch function
// ! watch(__filename, file.watch.bind(file));

// The diference is that one you passes the arguments as array or list
file.watch.call(
    { showContent: () => console.log('call: hey sinon') },
    null,
    __filename
);

file.watch.apply({ showContent: () => console.log('apply: hey sinon') }, [
    null,
    __filename,
]);
