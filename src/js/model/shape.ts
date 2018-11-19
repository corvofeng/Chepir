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
interface IScaleable {
  zoomIn(): void;
  zoomOut(): void;
}

// 可拖拽的
interface IDragable {
  drag(): void;

}

interface IDrawable {
  draw(start: number, end: number, color: Colors, size: number): void;
  erase(start: number, end: number, color: Colors, size: number): void;
  reset(): void;
  undo(): void;
}

class Shape {
  public penDown(pos: Position): void {
    return;
  }
  public penUp(pos: Position): void {
    return;
  }

  public drag(): void {
    return;
  }

  public construct() {
    return;
  }
}

class Rectangle extends Shape {
  public draw(): void {
    return;
  }

  public construct() {
    return;
  }
}

class StraightLine extends Shape {
  public draw(): void {
    return;
  }
}
