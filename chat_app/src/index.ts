import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 3030 });

const mp = new Map<number, Set<WebSocket>>();

wss.on("connection", (computer) => {
  computer.on("message", (event) => {
    const data = event.toString();
    const parsedData = JSON.parse(data);

    const { type, roomId, msg } = parsedData;

    if (!roomId || type != "join") {
      computer.send("Wrong roomId || type");
      return;
    }

    if (type == "join") {
      if (!mp.has(roomId)) mp.set(roomId, new Set<WebSocket>());
      mp.get(roomId)?.add(computer);
    }

    if (msg) {
      const allComputers: Set<WebSocket> | undefined = mp.get(roomId);
      if (!allComputers) return;

      for (const client of allComputers) {
        if (client != computer) {
          client.send(msg);
        }
      }
    }
  });
});
