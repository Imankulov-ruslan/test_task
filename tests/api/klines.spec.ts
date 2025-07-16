import { KlineIntervals } from "../../lib/api/enums/klines";
import { Symbols } from "../../lib/api/enums/symbols";
import { test, expect } from "../../lib/api/fixtures/api";
import { TimestampComparator } from "../../lib/api/helpers/timestamp";

test.describe("Klines API", () => {
  test("unauthenticated request", async ({ KlinesService }) => {
    const response = await KlinesService.get(
      {
        symbol: Symbols.BTCUSDT,
        interval: KlineIntervals["1s"],
      },
      {},
      { Cookie: "" },
    );
    const { body, statusCode } = response;
    expect(statusCode).toBe(401);
    expect(body.message).toBe("Cookie missing");
  });

  Object.values(KlineIntervals).forEach((interval) => {
    test(`schema for ${interval} interval`, async ({ KlinesService }) => {
      const response = await KlinesService.get({
        symbol: Symbols.BTCUSDT,
        interval,
      });
      const { body, statusCode } = response;
      expect(statusCode).toBe(200);
      const itemSchema = {
        interval: expect.any(String),
        timestamp: expect.any(Number),
        open: expect.any(String),
        high: expect.any(String),
        low: expect.any(String),
        close: expect.any(String),
      };

      expect(body.items).toBeInstanceOf(Array);
      for (const item of body.items) {
        expect(item).toMatchObject(itemSchema);
      }

      expect(body).toMatchObject({
        items: expect.any(Array),
        cursor: null,
        has_next_page: false,
      });
    });
  });

  Object.values(KlineIntervals).forEach((interval) => {
    test(`interval value for ${interval} interval`, async ({
      KlinesService,
    }) => {
      const response = await KlinesService.get({
        symbol: Symbols.BTCETH,
        interval,
      });
      const { body } = response;
      for (const item of body.items) {
        expect(item.interval).toBe(interval);
      }
    });
  });

  test("invalid symbol", async ({ KlinesService }) => {
    const response = await KlinesService.get({
      symbol: "INVALID",
      interval: KlineIntervals["1s"],
    });
    const { body, statusCode } = response;
    expect(statusCode).toBe(200);
    expect(body.items).toHaveLength(0);
  });

  test("invalid interval", async ({ KlinesService }) => {
    const response = await KlinesService.get({
      symbol: Symbols.BTCUSDT,
      interval: "INVALID" as KlineIntervals,
    });
    const { body, statusCode } = response;
    expect(statusCode).toBe(400);
    expect(body.message).toBe("Wrong query params");
  });

  for (const limit of [0, 1, 1000]) {
    test(`valid limit ${limit}`, async ({ KlinesService }) => {
      const response = await KlinesService.get(
        { symbol: Symbols.BTCUSDT, interval: KlineIntervals["1s"] },
        { limit },
      );
      const { body, statusCode } = response;
      expect(statusCode).toBe(200);
      expect(body.items).toHaveLength(limit);
    });
  }

  for (const invalidLimit of [-1, 10_001]) {
    test(`invalid limit ${invalidLimit}`, async ({ KlinesService }) => {
      const response = await KlinesService.get(
        { symbol: Symbols.BTCUSDT, interval: KlineIntervals["1s"] },
        { limit: invalidLimit },
      );
      const { body, statusCode } = response;
      expect(statusCode).toBe(400);
      expect(body.message).toBe("Wrong query params");
    });
  }

  const now = Math.floor(Date.now() / 1000);

  const testData = {
    timestamp_gt: now + 60,
    timestamp_gte: now,
    timestamp_lt: now - 60,
    timestamp_lte: now,
  };

  for (const key in testData) {
    test(`${key}`, async ({ KlinesService }) => {
      const response = await KlinesService.get(
        { symbol: Symbols.BTCUSDT, interval: KlineIntervals["1s"] },
        { [key]: testData[key] },
      );
      const { body, statusCode } = response;
      expect(statusCode).toBe(200);
      for (const item of body.items) {
        const compareFunction = TimestampComparator.getCompareFunction(key);
        expect(compareFunction(item.timestamp, testData[key])).toBe(true);
      }
    });
  }

  test("non intersected timestamps", async ({ KlinesService }) => {
    const response = await KlinesService.get(
      { symbol: Symbols.BTCUSDT, interval: KlineIntervals["1s"] },
      {
        timestamp_gt: testData.timestamp_gt,
        timestamp_lt: testData.timestamp_lt,
      },
    );
    const { body, statusCode } = response;
    expect(statusCode).toBe(200);
    expect(body.items).toHaveLength(0);
  });
});
