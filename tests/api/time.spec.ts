import { test, expect } from "@fixtures/api";

test.describe("Time API", () => {
  test("get current time", async ({ TimeService }) => {
    const response = await TimeService.getCurrentTime<{ time: string }>();
    const { body, statusCode } = response;
    expect(statusCode).toBe(200);
    expect(body.time).toBeCloseTo(Date.now(), 1000);
  });
});
