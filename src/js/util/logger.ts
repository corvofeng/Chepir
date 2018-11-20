"use strict";
// vim: ts=2 sw=2 sts=2 et:
/*
 *=======================================================================
 *    Filename:logger.ts
 *
 *     Version: 1.0
 *  Created on: October 24, 2018
 *
 *      Author: fengyuhao
 *=======================================================================
 */

// You must install latest js-logger
// Refer to this:
// Github: jonnyreeves/js-logger
//      master  => test-src/typescript-consumer/index.ts
import * as jsLogger from "js-logger";

interface IMyLogger {
  trace(...x: any[]): void;
  debug(...x: any[]): void;
  info(...x: any[]): void;
  log(...x: any[]): void;
  warn(...x: any[]): void;
  error(...x: any[]): void;
  time(label: string): void;
  timeEnd(label: string): void;
  setLevel(level: any): void;
}

jsLogger.useDefaults();
const myLogger: IMyLogger = jsLogger.get("Chepir");

myLogger.setLevel(jsLogger.DEBUG);

export { myLogger as Logger };
