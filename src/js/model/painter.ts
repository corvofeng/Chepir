"use strict";
// vim: ts=2 sw=2 sts=2 et:
/*
 *=======================================================================
 *    Filename:painter.ts
 *
 *     Version: 1.0
 *  Created on: November 12, 2018
 *
 *      Author: corvo
 *=======================================================================
 */

import { Logger } from "../util/logger";

enum Colors {
  WHITE = 1,
    RED,
    GREEN,
    GRAY,
    BLACK,
}

class Position {
  private x: number;
  private y: number;

  constructor() {
    this.x = 0;
    this.y = 0;
  }
}

class Painter {
  private curColor: Colors;
  private curPos: Position;

  constructor() {
    this.curColor = Colors.RED;
    this.curPos = new Position();
  }
  public printCurPosition() {
    return;
  }
}

class Config {

  public construct() {
    return;
  }
}

class MyCanvas {
  private width: number;
  private height: number;
  private background: Colors;
  private config: Config;
  private painter: Painter;
  private readonly context: CanvasRenderingContext2D;

  public constructor(canvas: HTMLCanvasElement) {
    this.width = 400;
    this.height = 400;
    this.background = Colors.WHITE;
    this.config = new Config();
    this.painter = new Painter();

    this.context = canvas.getContext("2d") as CanvasRenderingContext2D;
    if (this.context === null) {
      Logger.error("The Canvas not exists");
    }
  }

  public simpleDraw() {
    return;
  }
}


export { Colors, Position};

