import { WebSocketServer } from "ws";
const wss = new WebSocketServer({ port: 3010 });
console.log("websocket on port: 3010");
let count = 0;
wss.on("connection", (computer) => {
    console.log(computer);
    count += 1;
    console.log(`computer connected ${count}`);
});
//# sourceMappingURL=index.js.map