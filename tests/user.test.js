const request = require('supertest');
const app = require('../src/app');

jest.setTimeout(10000)

test('Should signup a new user', async () => {
    await request(app).post('/users').send({
        name: 'Andrew',
        email: 'andrew@example.com',
        password: 'MyPass777!'
    }).expect(201)
})