import WebSocket from "ws";

export class WebSocketSubscription {
  private socket: WebSocket;

  constructor(socket: WebSocket) {
    this.socket = socket;
  }

  async subscribe(channels: string[]): Promise<void> {
    return new Promise((resolve, reject) => {
      this.socket.on("error", console.error);

      this.socket.on("open", () => {
        this.socket.send(
          JSON.stringify({
            subscribe: channels,
          }),
        );
      });

      this.socket.on("message", function message(data) {
        console.log("received: %s", data);
      });
    });
  }
}
