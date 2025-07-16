import WebSocket from "ws";

export class WebSocketSubscription {
    private socket: WebSocket;
    private subscriptions: Set<string>;
    
    constructor(socket: WebSocket) {
        this.socket = socket;
        this.subscriptions = new Set();
        this.socket.on("open", () => {
            console.log("WebSocket connection established");
            // Send initial data when connection opens
            this.socket.send(JSON.stringify({ action: "init", message: "Connection started" }));
        });
    }
    
    subscribe(channels: string[]): void {
                this.socket.on("open", () => {
            console.log("WebSocket connection established");
            // Send initial data when connection opens
            this.socket.send(JSON.stringify({ action: "init", message: "Connection started" }));
            this.socket.onmessage = (event) => {
                        console.log(event)
            };
        });
    }

}