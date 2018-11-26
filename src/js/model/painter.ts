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
import { Assert } from "../util/util";
import { ChepirBaseCanvas } from "./chepir_base_canvas";
import { Operation, Track } from "./operation";

enum Colors {
  WHITE = 1,
  RED,
  GREEN,
  GRAY,
  BLACK,
}

class Position {
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

class Painter {
  private curColor: Colors;
  private curPos: Position;
  private curPressure: number;
  private painterIsDown: boolean;

  constructor() {
    this.curColor = Colors.RED;
    this.curPos = new Position(0, 0);
    this.curPressure = 1.0;
    this.painterIsDown = false;
  }
  public printCurPosition() {
    Logger.info("Current in " + `(${this.curPos.x}, ${this.curPos.y})`);
    return;
  }

  public setPainterIsDown(down: boolean) {
    this.painterIsDown = down;
  }
  public setColor(color: Colors) {
    this.curColor = color;
  }
  public setPosition(position: Position) {
    this.curPos = position;
  }
  public setCurPressure(pressure: number) {
    this.curPressure = pressure;
  }
  public getCurColor(): Colors {
    return this.curColor;
  }
  public getCurPos(): Position {
    return this.curPos;
  }
  public getCurPresure(): number {
    return this.curPressure;
  }
  public isDown(): boolean {
    return this.painterIsDown;
  }
}

class Config {

  public construct() {
    return;
  }
}
interface IChepirevents extends EventListenerObject {

  getAllEvents(): string[];
}

interface IPainterEvent extends IChepirevents {
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
  painterEvent: IChepirevents,
  isRegister: boolean = true): void {
  Logger.info("Add event listener");

  const events = painterEvent.getAllEvents();

  if (isRegister) {
    // htmlElement.addEventListener(eventName, eventListener, undefined); // .call(painterEvent);
    events.forEach((evt: string) => {
      htmlElement.addEventListener(evt, painterEvent); // .call(painterEvent);
    });
  } else {
    events.forEach((evt: string) => {
      htmlElement.removeEventListener(evt, painterEvent);
    });
  }
  return;
}

function DeRegisterPaintEvent(
  htmlElement: HTMLElement,
  painterEvent: IChepirevents): void {
  Logger.info("Remove event listener");
  return RegisterPaintEvent(htmlElement, painterEvent, false);
}

class ChepirCanvas extends ChepirBaseCanvas implements IPainterEvent, EventListenerObject {
  protected eventMaps: Array<[string, string]> = [
    ["mousedown", "atMouseDown"],
    ["mousemove", "atMouseMove"],
    ["mouseup", "atMouseUp"],
    ["mouseleave", "atMouseUp"],
    ["touchstart", "atTouchStart"],
  ];

  private width: number;
  private height: number;
  private background: Colors;
  private config: Config;
  private painter: Painter;
  private points: Position[];
  private operations: Operation[];
  private operCnt: number = -1;

  public constructor(
    ctx: CanvasRenderingContext2D | null,
    canvas: HTMLCanvasElement | null) {

    super(ctx, canvas);
    this.width = 800;
    this.height = 800;
    this.background = Colors.WHITE;
    this.config = new Config();
    this.painter = new Painter();
    this.points = [];
    this.operations = [];
  }

  public atMouseDown(ev: Event): void {
    Logger.info("At mouse down");
    const e = ev as MouseEvent;
    this.painter.setPosition(this._getPosition(e));
    this.painter.setPainterIsDown(true);
    // this.points.push(this.painter.getCurPos());

    this.operations.push(new Operation(this.painter.getCurPos()));
    this.operCnt++;
    return;
  }
  public atTouchStart(ev: Event): void {
    console.log("Touch Start");
  }

  public atMouseUp(ev: Event): void {
    Logger.info("At mouse up");
    const e = ev as MouseEvent;
    const curPainterPos = this._getPosition(e);
    const width = 0.1;

    const curOper: Operation = this.operations[this.operCnt];
    const lastPainterPos = curOper.getLastPosition();

    this.painter.setPosition(curPainterPos);

    this.painter.setPainterIsDown(false);
    this.painter.printCurPosition();

    this._draw(lastPainterPos, curPainterPos,
      this.painter.getCurColor(), this.painter.getCurPresure());

    curOper.pushTrack(new Track(curPainterPos, width));
    Logger.debug("This operation made by ", curOper.getTrack().length)
    return;
  }

  public atMouseMove(ev: Event): void {
    const e = ev as MouseEvent;
    if (this.painter.isDown()) {
      Logger.debug("Painting!!");
      const curOper: Operation = this.operations[this.operCnt];
      const lastPainterPos = curOper.getLastPosition();

      const curPainterPos = this._getPosition(e);
      const width = 0.1;

      this.painter.setPosition(curPainterPos);

      this._draw(lastPainterPos, curPainterPos,
        this.painter.getCurColor(), this.painter.getCurPresure(),
      );

      curOper.pushTrack(new Track(curPainterPos, width));
    }
    return;
  }
  public simpleDraw() {
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

