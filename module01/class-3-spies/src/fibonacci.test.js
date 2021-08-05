const Fibonacci = require('../src/fibonacci');
const sinon = require('sinon');
const assert = require('assert');

(async () => {
    {
        const fibonacci = new Fibonacci();
        const spy = sinon.spy(fibonacci, 'execute');

        // * Generators return iterators(.next)
        // * 3 ways of reading generators: .next, for await, rest/spread
        await Promise.all([...fibonacci.execute(3)]);

        const expectedCallCount = 4;
        assert.deepStrictEqual(spy.callCount, expectedCallCount);
        console.log('callCount', spy.callCount);
    }
    {
        const fibonacci = new Fibonacci();
        const spy = sinon.spy(fibonacci, fibonacci.execute.name);
        const [...results] = fibonacci.execute(5);

        const { args } = spy.getCall(2);
        const expectedResult = [0, 1, 1, 2, 3];
        const expectedParams = Object.values({
            input: 3,
            current: 1,
            next: 2,
        });

        assert.deepStrictEqual(args, expectedParams);
        assert.deepStrictEqual(results, expectedResult);
    }
})();
