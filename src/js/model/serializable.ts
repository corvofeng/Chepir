"use strict";
// vim: ts=2 sw=2 sts=2 et:
/*
 *=======================================================================
 *    Filename:serializable.ts
 *
 *     Version: 1.0
 *  Created on: November 15, 2018
 *
 *      Author: corvo
 *=======================================================================
 */

import { cheipr } from "./trans";
import { Logger } from "../util/logger";
import { rejects } from "assert";

/**
 * This is the interface for serialize object, object should implements it to
 * enable transfer.
 */
interface ISerialize {
  encode(): Uint8Array;
  decode(data: Uint8Array): any;
}

/**
 * For object who will transfer the data.
 */
interface ITransfer {
  send(data: any): void;
  receive(evt: MessageEvent): any;
}

class OpTrans implements ITransfer {
  private wsUri: string;
  private ws: WebSocket | undefined;

  constructor(wsUri: string = "ws://127.0.0.1:8999/") {
    this.wsUri = wsUri;
    // this.ws.onopen = function()
    this.ws = undefined;
  }
  public async setUp() {
    return new Promise((resolve) => {
      this.ws = new WebSocket(this.wsUri);
      if (this.ws === undefined) {
        Logger.error("Connect to ", this.wsUri, "failed!!");
      }
      // this.ws.onopen = this.onOpen.bind(this);
      this.ws.onclose = this.onClose.bind(this);
      this.ws.onopen = (/*evt*/) => {
        Logger.info("Connect ws server success", this.wsUri);
        resolve(undefined);
      };
      this.ws.onmessage = this.receive.bind(this);
    });
  }

  public onClose(evt: any): void {
    Logger.info("Close ws server success", this.wsUri);
    this.ws = undefined;
  }

  public async send(data: Uint8Array): Promise<void> {
    if (!this.ws) {
      Logger.error("Can't get the websockte connection for ", this.wsUri);
      return;
    }
    await this.ws.send(data);
  }

  public receive(evt: MessageEvent): any {
    Logger.info("Receive", evt.data);
  }
}

export { ISerialize, ITransfer, cheipr as model, OpTrans };
