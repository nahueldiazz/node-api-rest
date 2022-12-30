const request = require('supertest')
const app = require('./../app')
const { userModel } = require('../models')


const testAuthLogin = {
    'email': 'test@test',
    "password": 'aaaa'
}
const testAuthRegister = {
    "name": "nagu",
    "age": 18,
    "email": "test@testeee.com",
    "password": "1234433"
  }

  beforeAll(async()=>{
    await userModel.deleteMany()
  })

describe('[AUTH] prueba en /api/auth', () => {
    test('return 403', async ()=>{
        const response = await request(app).post('/api/auth/login').send(testAuthLogin)

        expect(response.statusCode).toEqual(403)
    })
})

describe('[AUTH] prueba en /api/register', () => {
    test('return 201', async ()=>{
        const response = await request(app).post('/api/auth/register').send(testAuthRegister)

        expect(response.statusCode).toEqual(200)
        expect(response.body).toHaveProperty('data')
    })
})