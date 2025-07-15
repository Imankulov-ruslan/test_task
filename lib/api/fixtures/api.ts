import { test as base } from '@playwright/test';
import { AuthService } from '../services/auth_service_api';
type ApiObjectFixtures = {
  AuthService: AuthService
}
export const test = base.extend<ApiObjectFixtures>({
    AuthService: async ({ request }, use) => {
        await use(new AuthService(request))
    },
})

export {expect} from "@playwright/test"