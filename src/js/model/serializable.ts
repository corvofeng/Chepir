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
import { delay } from "../util/util";

/**
 * This is the interface for serialize object, object should implements it to
 * enable transfer.
 */
interface ISerialize {
  encode(): Uint8Array | undefined;

  /**
   * TODO: The interface should have `static decode` fucntion
   * Now the interfact doesn't support the static member,
   * In `Operation`, I use the `static decode` to fake.
   * https://github.com/Microsoft/TypeScript/issues/13462
   * https://github.com/microsoft/TypeScript/issues/14600
   */
  /* static */ _decode(data: Uint8Array): any;

  iter(maxLen?: number): any;
  merge(obj: any): void;
}
/**
 * For object who will transfer the data.
 */
interface ITransfer {
  send(data: any): void;
  receive(): any;
  canRW(): boolean;
}

class OpTrans implements ITransfer {
  private wsUri: string;
  private wsPath: string;
  private ws: WebSocket | undefined;
  private receiveBuff: any[];

  constructor(wsUri: string = "ws://127.0.0.1:8999", wsPath: string = "/") {
    this.wsUri = wsUri;
    this.wsPath = wsPath;
    // this.ws.onopen = function()
    this.ws = undefined;
    this.receiveBuff = [];
  }
  public async setUp() {
    return new Promise(resolve => {
      const url = this.wsUri + this.wsPath;
      this.ws = new WebSocket(url);
      this.ws.binaryType = "arraybuffer";
      if (this.ws === undefined) {
        Logger.error("Connect to ", url, "failed!!");
      }
      // this.ws.onopen = this.onOpen.bind(this);
      this.ws.onclose = this.onClose.bind(this);
      this.ws.onopen = (/*evt*/) => {
        Logger.info("Connect ws server success", url);
        resolve(undefined);
      };
      this.ws.onmessage = this.onReceive.bind(this);
    });
  }
  public onReceive(evt: MessageEvent): void {
    const enData = new Uint8Array(evt.data);
    Logger.debug("Receive: ", enData);
    this.receiveBuff.push(enData);
  }
  public canRW(): boolean {
    if (this.ws === undefined) {
      return false;
    }
    if (this.ws.readyState !== WebSocket.OPEN) {
      return false;
    }
    return true;
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

  public async receive(): Promise<Uint8Array> {
    let data;
    while (true) {
      data = await this.receiveBuff.shift();
      if (data !== undefined) {
        break;
      }

      if (this.receiveBuff.length === 0) {
        await delay(1000); // Don't check too often
      }
    }
    return data;
  }
}

export { ISerialize, ITransfer, cheipr as model, OpTrans };
