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
import { ChepirBaseCanvas, IChepirevents, IPainterEvent } from "./chepir_base_canvas";
import { Operation, Track } from "./operation";
import { OpTrans } from "./serializable";
import { timingSafeEqual } from "crypto";

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
  private lineWidth: number;
  private painterIsDown: boolean;

  constructor() {
    this.curColor = Colors.RED;
    this.curPos = new Position(0, 0);
    this.curPressure = 1.0;
    this.painterIsDown = false;
    this.lineWidth = 1.0;
  }
  public printCurPosition() {
    Logger.info("Current in " + `(${this.curPos.x}, ${this.curPos.y})`);
    return;
  }

  /**
   * You can make you own algorithm, please make pull request for
   * this.
   */
  public getLineWidth() {
    return this.curPressure * 30 * 0.2 + this.lineWidth * 0.8;
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

/**
 *
 * @param htmlElement canvas对象
 * @param painterEvent event对象, 这里选择event对象而不是回调函数, 根本
 *                    原因是为了保证this指针的正确性
 * @param isRegister ture表示注册, false表示销毁
 */
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

/**
 * Maybe it never be called, but it's pretty and good prcatice.
 */
function DeRegisterPaintEvent(
  htmlElement: HTMLElement,
  painterEvent: IChepirevents): void {
  Logger.info("Remove event listener");
  return RegisterPaintEvent(htmlElement, painterEvent, false);
}

class ChepirCanvas extends ChepirBaseCanvas implements IPainterEvent {

  protected eventMaps: Array<[string, string]> = [
    // Mocse event.
    ["mousedown", "atMouseDown"],
    ["mousemove", "atMouseMove"],
    ["mouseup", "atMouseUpORLeave"],
    ["mouseleave", "atMouseUpORLeave"],

    // Touch event
    ["touchstart", "atTouchStart"],
    ["touchmove", "atTouchMove"],
    ["touchend", "atTouchEnd"],
    ["touchcancel", "atTouchCancel"],
  ];

  private painter: Painter;

  private operations: Operation[];
  // private background: Colors;
  // private config: Config;
  // private points: Position[];
  // private touchOperations;

  private opTrans: OpTrans;
  private readOnly: boolean;

  /**
   * Every touch event has an identifer, and in the `touchevent`
   * argument, there are many `Touch` objects, the only way
   * we could identify the object is their identifier.
   *
   * So, for every `Touch`, we save an identifer, point to a
   * operation which record the current touch path.
   */
  private identifer2oper: Map<number, number>;
  private operCnt: number = -1;

  public constructor(
    ctx: CanvasRenderingContext2D | null,
    canvas: HTMLCanvasElement | null,
    width: number = 800,
    height: number = 800,
  ) {
    super(ctx, canvas, width, height);

    // this.background = Colors.WHITE;
    // this.config = new Config();
    this.painter = new Painter();
    // this.points = [];
    this.operations = [];
    this.identifer2oper = new Map();
    this.opTrans = new OpTrans();
    this.opTrans.setUp();
    this.readOnly = false;
  }
  public async readFromTrans() {
    while (this.readOnly) {
      const enData = await this.opTrans.receive();
      Operation.decode(enData);
    }
  }

  /* ----------------------- evt process ------------------------- */

  public atMouseDown(ev: Event): void {
    Logger.info("At mouse down");
    const e = ev as MouseEvent;
    this.painter.setPosition(this._getPosition(e));
    this.painter.setPainterIsDown(true);

    this.operations.push(new Operation(this.painter.getCurPos(), this.opTrans));
    this.operCnt++;
    return;
  }

  /**
   * Wheather the mouse up or leave, it indicates the painting is over.
   */
  public atMouseUpORLeave(ev: Event): void {
    if (!this.painter.isDown()) {
      // The painter does not painting, leave it go;
      return;
    }

    Logger.info("At mouse up or leave");
    const e = ev as MouseEvent;
    const curPainterPos = this._getPosition(e);
    const width = 0.1;

    const curOper: Operation = this.operations[this.operCnt];
    const lastPainterPos = curOper.getLastPosition();

    this.painter.setPosition(curPainterPos);

    this.painter.setPainterIsDown(false);
    // this.painter.printCurPosition();

    this._draw(
      lastPainterPos,
      curPainterPos,
      this.painter.getCurColor(),
      this.painter.getLineWidth());

    curOper.pushTrack(new Track(curPainterPos, width));
    curOper.onFinish();
    Logger.debug("Painting is OVER!! And get line length: ",
      curOper.getTrack().length);

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

      this._draw(
        lastPainterPos,
        curPainterPos,
        this.painter.getCurColor(),
        this.painter.getLineWidth(),
      );

      curOper.pushTrack(new Track(curPainterPos, width));
    }
    return;
  }


  /**
   * This painter support multi touch, every touch event has their own
   * identifier, and we can use it to identify multi touch event.
   * Every touch event has its start and end, at this time, we consider
   * each touch is a painter, and give it an operation.
   *
   * To be honest, I did not decide that weather the painter is only one.
   * It's a little confilict, because I allow moulti touch and have one painter.
   *
   */


  public atTouchStart(evt: Event) {
    const ev = evt as TouchEvent;
    const length: number = ev.changedTouches.length;
    for (let i = 0; i < length; i++) {
      const idx = ev.changedTouches[i].identifier;
      const curPainterPos = this._getPosition(ev.changedTouches[i]);
      this.operations.push(new Operation(this.painter.getCurPos(), this.opTrans));
      this.operCnt++;

      this.identifer2oper.set(idx, this.operCnt);
      this.painter.setPosition(curPainterPos);

      Logger.debug("idx ", idx, " start!");
    }
    return;
  }

  public atTouchMove(evt: Event) {
    const ev = evt as TouchEvent;
    Logger.debug("At touch moves");
    const length: number = ev.changedTouches.length;
    for (let i = 0; i < length; i++) {
      const idx = ev.changedTouches[i].identifier;
      const curPainterPos = this._getPosition(ev.changedTouches[i]);
      const pressure = this._getPressure(ev.changedTouches[i]);
      this.painter.setCurPressure(pressure * 10);

      const operIdx: number | undefined = this.identifer2oper.get(idx);
      if (operIdx === undefined) {
        Logger.warn("The idx ", idx, " is invalid or dispear");
        continue;
      }
      const curOper: Operation = this.operations[operIdx];

      const lastPainterPos = curOper.getLastPosition();

      const width = 0.1;

      if (curOper.getTrack().length > 2) {
        this._draw(
          lastPainterPos,
          curPainterPos,
          this.painter.getCurColor(),
          this.painter.getLineWidth(),
        );
      }

      curOper.pushTrack(new Track(curPainterPos, width));
    }

    return;
  }

  public atTouchEnd(evt: Event) {
    const ev = evt as TouchEvent;
    const length = ev.changedTouches.length;
    for (let i = 0; i < length; i++) {
      const idx = ev.changedTouches[i].identifier;

      const curPainterPos = this._getPosition(ev.changedTouches[i]);
      const width = 0.1;

      const operIdx: number | undefined = this.identifer2oper.get(idx);

      if (operIdx === undefined) {
        Logger.warn("The idx ", idx, " is invalid or dispear");
        continue;
      }

      const curOper: Operation = this.operations[operIdx];
      const lastPainterPos = curOper.getLastPosition();

      // this.painter.setPosition(curPainterPos);

      this.painter.setPainterIsDown(false);
      // this.painter.printCurPosition();

      // this._draw(lastPainterPos, curPainterPos,
      //  this.painter.getCurColor(), this.painter.getCurPresure());

      curOper.pushTrack(new Track(curPainterPos, width));
      Logger.debug("Painting is OVER!! And get line length: ",
        curOper.getTrack().length,
      );
      curOper.onFinish();
      this.identifer2oper.delete(idx);
      Logger.debug("idx ", idx, " ended!");
    }
    return;

  }

  public atTouchCancel(evt: Event) {
    const ev = evt as TouchEvent;
    Logger.debug(ev.targetTouches.length, "touch is canceled!");
  }

}


export {
  Colors,
  Position,
  ChepirCanvas,
  RegisterPaintEvent,
  DeRegisterPaintEvent,
};
