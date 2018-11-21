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

class ChepirCanvas implements IPainterEvent, EventListenerObject {
  public eventMaps: Array<[string, string]> = [
    ["mousedown", "atMouseDown"],
    ["mouseup", "atMouseUp"],
    ["mousemove", "atMouseMove"],
  ];

  private width: number;
  private height: number;
  private background: Colors;
  private config: Config;
  private painter: Painter;
  private context: CanvasRenderingContext2D;
  private points: Position[];

  public constructor(ctx: CanvasRenderingContext2D | null) {
    this.width = 600;
    this.height = 600;
    this.background = Colors.WHITE;
    this.config = new Config();
    this.painter = new Painter();
    this.points = [];

    // This time the ctx is null
    this.context = ctx as CanvasRenderingContext2D;
  }

  public setContext(ctx: CanvasRenderingContext2D) {
    this.context = ctx;
  }
  public contextMove(pos: Position) {
    this.context.moveTo(pos.x, pos.y);
  }

  public atMouseDown(ev: Event): void {
    Logger.info("At mouse down");
    const e = ev as MouseEvent;
    this.painter.setPosition(new Position(e.pageX, e.pageY));
    this.painter.setPainterIsDown(true);

    this.painter.printCurPosition();

    this.context.lineWidth = this.painter.getCurPresure() * 50;
    this.context.strokeStyle = "red";
    this.context.lineCap = "round";
    this.context.lineJoin = "round";
    this.context.beginPath();
    this.contextMove(this.painter.getCurPos());
    this.points.push(this.painter.getCurPos());

    return;
  }

  public getAllEvents(): string[] {
    const events: string[] = [];
    this.eventMaps.forEach((pair: [string, string]) => {
      events.push(pair[0]);
    });
    return events;
  }

  public atMouseUp(ev: Event): void {
    Logger.info("At mouse up");
    const e = ev as MouseEvent;
    this.painter.setPosition(new Position(e.pageX * 2, e.pageY * 2));
    this.painter.setPainterIsDown(false);
    this.painter.printCurPosition();
    const l =  this.points.length - 1;
    this.context.quadraticCurveTo(this.points[l].x, this.points[l].y,
              this.painter.getCurPos().x, this.painter.getCurPos().y)
    this.context.stroke();
    this.points = [];
    return;
  }

  public handleEvent(evt: Event): void {
    this.eventMaps.forEach((pair: [string, string]) => {
      const eventName: string = pair[0];
      // const eventListener: EventListener =Object.call(this, pair[1], evt); //$.getOwnPropertyDescriptor(pair[1]);
      // eventListener(evt);
      if (evt.type === eventName) {
        (this as any)[pair[1]](evt);
      }
    });
    evt.preventDefault();
  }

  public atMouseMove(ev: Event): void {
    const e = ev as MouseEvent;
    if (this.painter.isDown()) {
      Logger.debug("Start paint");
      this.painter.setPosition(new Position(e.pageX * 2, e.pageY * 2));
      this.points.push(this.painter.getCurPos());
      this.context.strokeStyle = "red";
      this.context.lineCap = "round";
      this.context.lineJoin = "round";

      if (this.points.length >= 3) {
        const l = this.points.length - 1;
        const xc = (this.points[l].x + this.points[l - 1].x) / 2;
        const yc = (this.points[l].y + this.points[l - 1].y) / 2;

        this.context.quadraticCurveTo(this.points[l - 1].x, this.points[l - 1].y, xc, yc);
        this.context.stroke();
        this.context.beginPath();
        this.context.moveTo(xc, yc);
      }

      this.contextMove(this.painter.getCurPos());
    }
    return;
  }
  public simpleDraw() {
    // this.context.fillRect(0, 0, 400, 400);
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

