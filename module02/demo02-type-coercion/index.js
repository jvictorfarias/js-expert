9999999999999999n;
// 100000000000000000
true + 2;
// 3
'21' + true;
// '21true'
'21' - true;
// 20
'21' - -1;
// 22
0.1 + 0.2 === 0.3;
// false
3 > 2 > 1;
// false
'1' == 1;
// true
'1' === 1;
// false

// ------------------------------------------------
console.assert(String(123) === '123', 'Explicit conversion');
console.assert(123 + '' === '123', 'Implicit conversion');

console.assert('hello' || 1 === 'hello', '|| returns the first truthy value');
console.assert('hello' && 1 === 1, '&& returns the last truthy value');

// ------------------------------------------------
const item = {
    name: 'Victor',
    age: 25,
    // string: toString if it's not a primitive, call valueOf
    toString() {
        return `Name ${this.name}, Age: ${this.age}`;
    },
    // number: valueOf if it's a primitive,, call toString
    valueOf() {
        return 007;
    },
};

// console.log(''.concat(item));
// console.log(String(item));
// console.log(Number(item));

// ------------------------------------------------
const secondItem = {
    ...item,
    valueOf() {
        return { object: 1 };
    },
};

// console.log(String(secondItem));
// // Will return NaN
// console.log(Number(secondItem));

// ------------------------------------------------
const thirdItem = {
    ...item,
    // Highest priority of conversion
    [Symbol.toPrimitive](hint) {
        console.log('Trying to convert to: ' + hint);
        const types = {
            string: JSON.stringify(this),
            number: this.valueOf(),
        };

        return types[hint] || types.string;
    },
};

console.log(String(thirdItem));
console.log(Number(thirdItem));
// Call the default conversion (boolean)
console.log(new Date(thirdItem));
console.log('!!thirdItem is true?', !!thirdItem);
console.log(
    'implicity + explicity conversion of object',
    thirdItem == String(thirdItem)
);
