import * as express from "express";
import * as http from "http";
import * as WebSocket from "ws";
import { AddressInfo } from "net";

import * as jsLogger from "js-logger/src/logger";
import { IContext } from "js-logger/src/types";

const Logger = jsLogger.get("Chepir-Back");
Logger.setLevel(jsLogger.DEBUG);
jsLogger.setHandler((messages: any[], context: IContext) => {
    const msg: string = Array.prototype.slice.call(messages, 0)
        .join(" ");

    /* tslint:disable */
    console.log(`[${context.level.name[0]}]`, msg);
    /* tslint:enable */
});

/**
 * Usage::
 *      > npm install @types/express --no-save
 *      > npm install express --no-save
 *      > npm run gen_server
 *      > node dist/server.js
 *
 * Someone maybe ask why it use express?
 * As a complete project, the chepir has its own frontend and backend.
 * I intend to use `typescript` and `react` in my frontend,
 * and use `golang` for the backend.
 *
 * This repository is intended as a frontend project, but during my develop,
 * I need to test the websocket and the protobuf. If I take goland
 * backend, maybe I do not need to create this file and you will
 * never see the `express` in my project. But it may take many time
 * to debug between two languages and increase programming difficulty.
 */
const app = express();

// initialize a simple http server
const server = http.createServer(app);

// initialize the WebSocket server instance
const wss: WebSocket.Server = new WebSocket.Server({
    server,
});

wss.on("connection", (ws: WebSocket) => {

    ws.binaryType = "arraybuffer";
    // connection is up, let"s add a simple simple event
    ws.on("message", (message: ArrayBuffer) => {

        // log the received message and send it back to the client
        // Logger.debug("Get message: ", message);
        // console.log("received: %s", message);
        // ws.send(`Hello, you sent -> ${message}`);
        Logger.debug("Get message: ", new Uint8Array(message));
        // console.log(message);
        // Logger.info("Message type", message.type);
        // Logger.info("Message data", message.data);
        ws.send(message);
    });

    // send immediatly a feedback to the incoming connection
    // ws.send("Hi there, I am a WebSocket server");
});

// start our server
server.listen(process.env.PORT || 8999, () => {
    const port = (server.address() as AddressInfo).port;
    Logger.info(`Server started on port ${port} :)`);
});
