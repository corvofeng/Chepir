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

/**
 * This is the interface for serialize object, object should implements it to
 * enable transfer.
 */
interface ISerialize {
  encode(): any;
  decode(data: any): void;
}

/**
 * For object who will transfer the data.
 */
interface ITransfer {
  send(data: any): Promise<void>;
  receive(): Promise<any>;
}

class OpTrans {
  private ws: WebSocket;

  constructor(wsUri: string = "ws://127.0.0.1:8999/") {
    this.ws = new WebSocket(wsUri);
    if (this.ws === undefined) {
      Logger.error("Connect to ", wsUri, "failed!!");
    }
    this.ws.onopen = this.onOpen.bind(this);
    this.ws.onclose = this.onClose.bind(this);
    // this.ws.onopen = function()
  }
  public onOpen(evt: any): void {
    Logger.info("Connect ws server success", this.ws.url);
  }

  public onClose(evt: any): void {
    Logger.info("Close ws server success", this.ws.url);
  }

  public onSend(data: any): void {
    this.ws.send(data);
  }

  // function send(data: any): Promise<void> {

  // }

  // function receive(): Promise<any>{

  // }
}

export { ISerialize, ITransfer, cheipr as model, OpTrans };
