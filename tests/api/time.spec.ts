import { test, expect } from "../../lib/api/fixtures/api";

test.describe("Time API", () => {
  test("get current time", async ({ TimeService }) => {
    const response = await TimeService.getCurrentTime<{ time: string }>();
    const { body, statusCode } = response;
    console.log(body)
    expect(statusCode).toBe(200);
    // expect(body).toHaveProperty("time");
    // expect(typeof body.time).toBe("string");
  });
});