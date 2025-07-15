import { test, expect } from '../lib/api/fixtures/api';
import { faker } from '@faker-js/faker';
test.describe('Auth user', () => {
  const validUsername = process.env.USERNAME!
  const validPassword = process.env.PASSWORD!
  test('correct login and password', async ({ AuthService }) => {
    const reponse = await AuthService.login<{id:string, email:string, role:string}>(validUsername, validPassword)
    const {body, statusCode, headers} = reponse
    expect(statusCode).toBe(200)
    expect(body.email).toEqual(validUsername)
    expect(body.role).toEqual('user')
    expect(headers['set-cookie']).toBeDefined()
  });

    test('incorrect login', async ({ AuthService }) => {
      const reponse = await AuthService.login<{message:string}>(validUsername, 'incorrectPassword')
      const {body, statusCode, headers} = reponse
      expect(statusCode).toBe(400)
      expect(body.message).toEqual('Wrong login or password')
      expect(headers['set-cookie']).not.toBeDefined()
  });
    test('incorrect login as number', async ({ AuthService }) => {
      const reponse = await AuthService.login<{message:string}, string, number>(validUsername, 123)
      const {body, statusCode, headers} = reponse
      expect(statusCode).toBe(400)
      expect(body.message).toEqual('Wrong login or password')
      expect(headers['set-cookie']).not.toBeDefined()
  });
    test('short password', async ({ AuthService }) => {
      const reponse = await AuthService.login<{message:string}>(validUsername, '')
      const {body, statusCode, headers} = reponse
      expect(statusCode).toBe(400)
      expect(body.message).toEqual('"password" must be between 1 and 50 characters')
      expect(headers['set-cookie']).not.toBeDefined()
  });

    test('long password', async ({ AuthService }) => {
      const reponse = await AuthService.login<{message:string}>(validUsername, faker.string.sample(51))
      const {body, statusCode, headers} = reponse
      expect(statusCode).toBe(400)
      expect(body.message).toEqual('"password" must be between 1 and 50 characters')
      expect(headers['set-cookie']).not.toBeDefined()
  });
})

