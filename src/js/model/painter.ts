import { Logger } from "../util/logger";

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

enum Colors {
  WHITE = 1,
    RED,
    GREEN,
    GRAY,
    BLACK
}

class Position {
  private x: Number;
  private y: Number;

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
  }
}

class Config {

  public construct() {
  }
}

class MyCanvas {
  private width: Number;
  private height: Number;
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

    this.context = <CanvasRenderingContext2D>canvas.getContext('2d');
    if(this.context === null) {
      Logger.error("The Canvas not exists");
    }
  }

  public simpleDraw() {

  }
}


export { Colors, Position};

