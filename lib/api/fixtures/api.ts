import { APIRequestContext, test as base } from "@playwright/test";
import { AuthService } from "../services/auth/auth_service_api";
import { TimeService } from "../services/time/time_service_api";
import { KlinesService } from "../services/klines/klines_service_api";
import { WebSocketSubscription } from "../services/websocket/websocket_api";
import { WebSocket } from "ws";

type ApiObjectFixtures = {
  AuthService: AuthService;
  TimeService: TimeService;
  KlinesService: KlinesService;
  SubscriptionSocket: WebSocket;
  WebSocketService: WebSocketSubscription; // Placeholder for WebSocket service if needed
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
  SubscriptionSocket: async ({ baseURL }, use) => {
    await use(new WebSocket(baseURL!));
  },
  AuthService: async ({ requestWithCookie }, use) => {
    await use(new AuthService(requestWithCookie));
  },
  TimeService: async ({ request }, use) => {
    await use(new TimeService(request));
  },
  KlinesService: async ({ requestWithCookie }, use) => {
    await use(new KlinesService(requestWithCookie));
  },
  WebSocketService: async ({ SubscriptionSocket }, use) => {
    await use(new WebSocketSubscription(SubscriptionSocket));
  },
  AuthServiceWithoutCookies: async ({ request }, use) => {
    await use(new AuthService(request));
  },
});

export { expect } from "@playwright/test";
