import {test} from "../../lib/api/fixtures/api";

test.describe("WebSocket API", () => {
  test("WebSocket connection", async ({ WebSocketService }) => {
    WebSocketService.subscribe(["t://klines/BTCUSDT?duration=5s"])
  });
})