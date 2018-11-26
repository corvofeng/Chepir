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

/**
 * Refer to this  https://github.com/bahmutov/console-log-div
 */
class ConsoleLogDiv {
  private id: string = "console-log-div";
  private codeMirroObj: CodeMirror.Editor;

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
      });
    this.codeMirroObj.setSize(800, 400);
  }

  public toString(x: any) {
    if (x instanceof Error) {
      return x.message;
    }
    return typeof x === "string" ? x : JSON.stringify(x);
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
    // const style = outer.style;
    // // style.width = '100%';
    // // style.minHeight = '200px';
    // // style.maxHeight = "500px";
    // style.fontFamily = "monospace";
    // style.marginTop = "20px";
    // style.marginLeft = "10px";
    // style.marginRight = "10px";
    // style.whiteSpace = "pre";
    // style.border = "1px solid black";
    // style.borderRadius = "5px";
    // style.padding = "5px 10px";
    return outer;
  }
  public printToDiv() {
    const msg = Array.prototype.slice.call(arguments, 0)
      .map(toString)
      .join(" ");
    const text = this.div.textContent;
    this.div.textContent = text + msg + "\n";
    this.codeMirroObj.getDoc().replaceRange(`${msg}\n`, { line: Infinity as number } as CodeMirror.Position);
  }

  public logWithCopy(...messages: any[]) {
    // log.apply(null, arguments);
    this.printToDiv.apply(this, messages);
  }
}

export { ConsoleLogDiv };