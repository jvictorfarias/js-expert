const assert = require('assert');

const obj = {};
const arr = [];
const fn = () => {};

// Internally, literal objects become explicity extension of Object function
console.log(
    'new Object() is equal {}?',
    new Object().__proto__ === {}.__proto__
);
assert.deepStrictEqual(new Object().__proto__, {}.__proto__);

// __proto__ is the object references with his properties
console.log(obj.__proto__ === Object.prototype);
assert.deepStrictEqual(obj.__proto__, Object.prototype);

console.log(arr.__proto__ === Array.prototype);
assert.deepStrictEqual(arr.__proto__, Array.prototype);

console.log(fn.__proto__ === Function.prototype);
assert.deepStrictEqual(fn.__proto__, Function.prototype);

// The __proto__ of Object.prototype is null
console.log(obj.__proto__.__proto__ === null);
assert.deepStrictEqual(obj.__proto__.__proto__, null);

// ------------------------------------------------------------

function Employee() {}
Employee.prototype.salary = () => 'salary';

function Supervisor() {}
Supervisor.prototype = Object.create(Employee.prototype);
Supervisor.prototype.profitShare = () => 'profitShare';

function Manager() {}
Manager.prototype = Object.create(Supervisor.prototype);
Manager.prototype.bonus = () => 'bonus';

// We can call the method by using the prototype, but no directly
console.log('Manager', Manager.prototype.salary());

// If you don't use NEW, the first __proto__ will be a Function instance without inherited properties
console.log(Manager.prototype.__proto__ === Supervisor.prototype);
assert.deepStrictEqual(Manager.prototype.__proto__, Supervisor.prototype);

// ------------------------------------------------------------
// When we use NEW, the __proto__ will receive the prototype of the constructor
console.log(
    'manager.__proto__',
    new Manager().__proto__,
    new Manager().salary()
);
console.log(Supervisor.prototype === new Manager().__proto__.__proto__);
assert.deepStrictEqual(Supervisor.prototype, new Manager().__proto__.__proto__);

// ------------------------------------------------------------
const manager = new Manager();
console.log(manager.salary());
console.log(manager.profitShare());
console.log(manager.bonus());

console.log(manager.__proto__.__proto__.__proto__.__proto__.__proto__);
assert.deepStrictEqual(manager.__proto__, Manager.prototype);
assert.deepStrictEqual(manager.__proto__.__proto__, Supervisor.prototype);
assert.deepStrictEqual(
    manager.__proto__.__proto__.__proto__,
    Employee.prototype
);
assert.deepStrictEqual(
    manager.__proto__.__proto__.__proto__.__proto__,
    Object.prototype
);
assert.deepStrictEqual(
    manager.__proto__.__proto__.__proto__.__proto__.__proto__,
    Object.prototype.__proto__
);

// ------------------------------------------------------------
class T1 {
    ping() {
        return 'ping';
    }
}

class T2 extends T1 {
    pong() {
        return 'pong';
    }
}

class T3 extends T2 {
    shoot() {
        return 'shoot';
    }
}

const t3 = new T3();
console.log(
    't3 inherits null?',
    t3.__proto__.__proto__.__proto__.__proto__.__proto__
);
assert.deepStrictEqual(t3.__proto__, T3.prototype);
assert.deepStrictEqual(t3.__proto__.__proto__, T2.prototype);
assert.deepStrictEqual(t3.__proto__.__proto__.__proto__, T1.prototype);
assert.deepStrictEqual(
    t3.__proto__.__proto__.__proto__.__proto__,
    Object.prototype
);
assert.deepStrictEqual(
    t3.__proto__.__proto__.__proto__.__proto__.__proto__,
    null
);
