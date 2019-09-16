"use strict";
// vim: ts=2 sw=2 sts=2 et:
/*
 *=======================================================================
 *    Filename:divlog.ts
 *
 *     Version: 1.0
 *  Created on: November 26, 2018
 *
 *      Author: corvo
 *=======================================================================
 */

import * as CodeMirror from "codemirror";
import { IContext } from "js-logger/src/types";
import { isMochaRunning } from "./util";

/**
 * Refer to this  https://github.com/bahmutov/console-log-div.
 *
 * In ipad, it's not easy to use the console, but we need the console, need logs.
 * I write this class for log print, may be it's simple, but it's just enough.
 *
 */
class ConsoleLogDiv {
  public static ObjectToString(input: object | string): string {
    if (input instanceof Object) {
      return JSON.stringify(input);
    } else {
      return input;
    }
  }

  private id: string = "console-log-div";
  private codeMirrorObj: CodeMirror.Editor | undefined;
  private lastLog: string = "";
  private lastLogCnt: number = 0;
  private lastPosition: CodeMirror.Position = {line: 0} as CodeMirror.Position;

  public constructor() {
    if (isMochaRunning()) {
      return;
    }
    const outer = this.createOuterElement();
    const caption = document.createTextNode("console output");
    const legend = document.createElement("legend");
    legend.appendChild(caption);
    outer.appendChild(legend);

    const textArea = document.createElement("textarea");
    outer.appendChild(textArea);
    this.codeMirrorObj = CodeMirror.fromTextArea(
      textArea,
      {
        lineNumbers: true,
        readOnly: true,
      });
    // this.codeMirroObj.setSize(800, 400);
  }

  public createOuterElement() {
    let outer = document.getElementById(this.id);
    if (!outer) {
      // outer = document.createElement("fieldset");
      outer = document.createElement("div");
      outer.id = this.id;
      document.body.appendChild(outer);
    }
    outer.classList.add(this.id);
    return outer;
  }

  public logWithCopy(messages: any[], context: IContext) {
    if (!this.codeMirrorObj) {
      return;
    }
    const msg: string = Array.prototype.slice
      .call(messages, 0)
      .map(ConsoleLogDiv.ObjectToString)
      .join(" ");

    // const formatLog = `[${context.name}: ${context.level.name[0]}] ${msg}`;
    const formatLog = `[${context.level.name[0]}] ${msg}`;

    if (msg === this.lastLog) {
      this.lastLogCnt += 1;
      this.replaceLastLine(formatLog + ` - ${this.lastLogCnt}\n`);
    } else {
      this.lastLog = msg;
      this.lastLogCnt = 0;
      this.codeMirrorObj
        .getDoc()
        .replaceRange(formatLog + "\n", this.lastPosition);
    }

    this.codeMirrorObj
      .getDoc()
      .setCursor({ line: Infinity as number } as CodeMirror.Position);
    this.lastPosition = this.codeMirrorObj.getDoc().getCursor();
  }
  private replaceLastLine(log: string): void {
    if (!this.codeMirrorObj) {
      return;
    }
    this.lastPosition.line -= 1;
    this.lastPosition.ch = 0;
    this.codeMirrorObj.getDoc().replaceRange(log, this.lastPosition, {
      line: Infinity as number,
    } as CodeMirror.Position);
  }
}

const divLog = new ConsoleLogDiv();
export { divLog };
