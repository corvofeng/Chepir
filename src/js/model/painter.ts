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

class BaseCanvas {
  private context: CanvasRenderingContext2D | null;
  public constructor(ctx: CanvasRenderingContext2D | null) {
    this.context = ctx;
  }
}

interface IPainterEvent {
  atMouseDown: EventListener;
  atMouseUp: EventListener;
  atMouseMove: EventListener;

  // atTouchStart: EventListener;
  // atTouchMove: EventListener;
  // atTouchLeave: EventListener;
  // atTouchEnd: EventListener;
}


function RegisterPaintEvent(
  htmlElement: HTMLElement,
  painterEvent: IPainterEvent,
  isRegister: boolean = true): void {
  Logger.info("Add event listener");
  const eventMaps: Array<[string, EventListener]> = [
    ["mousedown", painterEvent.atMouseDown],
    ["mouseup", painterEvent.atMouseUp],
    ["mousemove", painterEvent.atMouseMove],
  ];

  eventMaps.forEach((pair: [string, EventListener]) => {
    const eventName: string = pair[0];
    const eventListener: EventListener = pair[1];
    if (isRegister) {
      htmlElement.addEventListener(eventName, eventListener);
    } else {
      htmlElement.removeEventListener(eventName, eventListener);
    }
  });
  return;
}

function DeRegisterPaintEvent(
  htmlElement: HTMLElement,
  painterEvent: IPainterEvent): void {
  Logger.info("Remove event listener");
  return RegisterPaintEvent(htmlElement, painterEvent, false);
}

class ChepirCanvas implements IPainterEvent {
  private width: number;
  private height: number;
  private background: Colors;
  private config: Config;
  private painter: Painter;
  private context: CanvasRenderingContext2D;

  public constructor(ctx: CanvasRenderingContext2D | null) {
    this.width = 400;
    this.height = 400;
    this.background = Colors.WHITE;
    this.config = new Config();
    this.painter = new Painter();

    // This time the ctx is null
    this.context = ctx as CanvasRenderingContext2D;
  }

  public setContext(ctx: CanvasRenderingContext2D) {
    this.context = ctx;
  }

  public atMouseDown(ev: Event): void {
    Logger.debug("At mouse down");
    return;
  }

  public atMouseUp(ev: Event): void {
    Logger.debug("At mouse up");
    return;
  }

  public atMouseMove(ev: Event): void {
    return;
  }
  public simpleDraw() {
    this.context.fillRect(0, 0, 400, 400);
    return;
  }
  public getWidth(): number {
    return this.width;
  }
  public getHeight(): number {
    return this.height;
  }
}


export {
  Colors,
  Position,
  ChepirCanvas,
  RegisterPaintEvent,
  DeRegisterPaintEvent,
};

