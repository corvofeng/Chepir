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
import * as jsLogger from "js-logger/src/logger";
import { ILogger, ILogHandler, IContext } from "js-logger/src/types";
// import { divLog } from "./divlog";

jsLogger.useDefaults();
const myLogger: ILogger = jsLogger.get("Chepir");
myLogger.setLevel(jsLogger.DEBUG);


const defaultHandler = jsLogger.createDefaultHandler();

function trans(messages: any[], context: IContext): void {

  // Write a log to div
  // divLog.logWithCopy(messages, context);

  // Also print log in console
  // we need add this beacuse the function `setHandler` will change
  // the handler, no more print to console.
  defaultHandler(messages, context);
}
jsLogger.setHandler(trans as ILogHandler);

export { myLogger as Logger };
