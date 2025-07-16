import { test, expect } from '../lib/api/fixtures/api';
import { faker } from '@faker-js/faker';
import {request} from '@playwright/test'
test.describe('Auth user', () => {
    test('logout', async ({ AuthService}) => {
      const reponse = await AuthService.logout<{message:string}>()
      const {body, statusCode} = reponse
      console.log(reponse)

  });
})

