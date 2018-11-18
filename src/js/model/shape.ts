"use strict";
// vim: ts=2 sw=2 sts=2 et:
/*
 *=======================================================================
 *    Filename:shape.ts
 *
 *     Version: 1.0
 *  Created on: November 15, 2018
 *
 *      Author: corvo
 *=======================================================================
 */

import { Logger } from "../util/logger";
import { Colors, Position } from "./painter";

// 可放大缩小的
interface Scaleable {
  zoomIn(): void;
  zoomOut(): void;
}

// 可拖拽的
interface Dragable {
  drag(): void;

}

interface Drawable {
  draw(start: Number, end: Number, color: Colors, size: Number): void;
  erase(start: Number, end: Number, color: Colors, size: Number): void;
  reset(): void;
  undo(): void;
}

class Shape {
  public penDown(pos: Position): void {

  }
  public penUp(pos: Position): void {

  }

  public drag(): void {

  }

  public construct() {

  }
}

class Rectangle extends Shape {
  public draw(): void {
  }

  public construct() {

  }
}

class StraightLine extends Shape {
  public draw(): void {
  }
}
