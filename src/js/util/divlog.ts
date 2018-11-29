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

/**
 * Refer to this  https://github.com/bahmutov/console-log-div
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
  private codeMirroObj: CodeMirror.Editor;
  private lastLog: string = "";
  private lastLogCnt: number = 0;
  private lastPosition: CodeMirror.Position = { line: 0 } as CodeMirror.Position;

  public constructor() {
    const outer = this.createOuterElement();

    const caption = document.createTextNode("console output");
    const legend = document.createElement("legend");
    legend.appendChild(caption);
    outer.appendChild(legend);

    const textArea = document.createElement("textarea");
    outer.appendChild(textArea);

    this.codeMirroObj = CodeMirror.fromTextArea(
      textArea,
      {
        lineNumbers: true,
        readOnly: true,
      });
    this.codeMirroObj.setSize(800, 400);
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
    const msg: string = Array.prototype.slice.call(messages, 0)
      .map(ConsoleLogDiv.ObjectToString)
      .join(" ");

    if (msg === this.lastLog) {
      this.lastLogCnt += 1;
      this.replaceLastLine(`${msg} - ${this.lastLogCnt}\n`);
    } else {
      this.lastLog = msg;
      this.lastLogCnt = 0;
      this.codeMirroObj.getDoc().replaceRange(`${msg}\n`, this.lastPosition);
    }

    this.codeMirroObj.getDoc().setCursor({ line: Infinity as number } as CodeMirror.Position);
    this.lastPosition = this.codeMirroObj.getDoc().getCursor();
  }
  private replaceLastLine(log: string): void {
    this.lastPosition.line -= 1;
    this.lastPosition.ch = 0;
    this.codeMirroObj.getDoc().replaceRange(log, this.lastPosition,
      { line: Infinity as number } as CodeMirror.Position
    );
  }
}

export { ConsoleLogDiv };
