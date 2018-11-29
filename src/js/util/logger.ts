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
import { ConsoleLogDiv } from "./divlog";

jsLogger.useDefaults();
const myLogger: ILogger = jsLogger.get("Chepir");
myLogger.setLevel(jsLogger.DEBUG);

const consoleLog = new ConsoleLogDiv();

// 将一份日志写入到Div中
function trans(messages: any[], context: IContext): void {
  consoleLog.logWithCopy(messages, context);
}
jsLogger.setHandler(trans as ILogHandler);

export { myLogger as Logger };
