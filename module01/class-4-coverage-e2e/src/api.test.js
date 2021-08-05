const { describe, it } = require('mocha');
const request = require('supertest');
const app = require('./api');
const assert = require('assert');

describe('API Suit test', () => {
    describe('/contact', () => {
        it('should request the contact page and return HTTP status 200', async () => {
            const response = await request(app).get('/contact').expect(200);
            assert.deepStrictEqual(response.text, '<h1>contact us page</h1>');
        });
    });

    describe('/hello', () => {
        it('should request an inexistent route /hi and redirect to /hello', async () => {
            const response = await request(app).get('/hi').expect(200);
            assert.deepStrictEqual(response.text, '<h1>Hello World</h1>');
        });
    });

    describe('/login', () => {
        it('should successfully login an existing user and return 200 HTTP success', async () => {
            const response = await request(app)
                .post('/login')
                .send({
                    username: 'admin',
                    password: 'admin',
                })
                .expect(200);
            assert.deepStrictEqual(response.text, 'succeeded login!');
        });

        it('should not authenticate user with wrong credentials and return HTTP 401 status', async () => {
            const response = await request(app)
                .post('/login')
                .send({
                    username: 'admin1',
                    password: 'admin',
                })
                .expect(401);
            assert.deepStrictEqual(response.text, 'login failed!');
        });
    });
});
