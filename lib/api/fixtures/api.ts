import { APIRequestContext, test as base } from "@playwright/test";
import { AuthService } from "../services/auth/auth_service_api";
import { TimeService } from "../services/time/time_service_api";
type ApiObjectFixtures = {
  AuthService: AuthService;
  TimeService: TimeService;
  AuthServiceWithoutCookies: AuthService;
  requestWithCookie: APIRequestContext;
};
export const test = base.extend<ApiObjectFixtures>({
  requestWithCookie: async ({ playwright, context }, use) => {
    const storageState = await context.storageState();
    await use(
      await playwright.request.newContext({
        extraHTTPHeaders: {
          Cookie: storageState.cookies
            .map((cookie) => `${cookie.name}=${cookie.value}`)
            .join("; "),
        },
      }),
    );
  },
  AuthService: async ({ requestWithCookie }, use) => {
    await use(new AuthService(requestWithCookie));
  },
  TimeService: async ({ request }, use) => {
    await use(new TimeService(request));
  },
  AuthServiceWithoutCookies: async ({ request }, use) => {
    await use(new AuthService(request));
  },
});

export { expect } from "@playwright/test";
