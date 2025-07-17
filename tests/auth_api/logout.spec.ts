import { test, expect } from "@fixtures/api";

test.describe("Auth user", () => {
  test("double logout", async ({ AuthService }) => {
    let reponse = await AuthService.logout();
    let statusCode = reponse.statusCode;
    expect(statusCode).toBe(204);

    reponse = await AuthService.logout();
    statusCode = reponse.statusCode;
    expect(statusCode).toBe(401);
  });

  test("logout with invalid token", async ({ AuthServiceWithoutCookies }) => {
    const response = await AuthServiceWithoutCookies.logout<{
      message: string;
    }>({ Cookie: "access_token=invalid" });
    const { body, statusCode } = response;
    expect(body.message).toBe("Auth error: InvalidToken");
    expect(statusCode).toBe(401);
  });
});
