"use strict";
// vim: ts=2 sw=2 sts=2 et:
/*
 *=======================================================================
 *    Filename:operation.ts
 *
 *     Version: 1.0
 *  Created on: November 15, 2018
 *
 *      Author: corvo
 *=======================================================================
 */

import { Position } from "./painter";
import { ISerialize, model, ITransfer } from "./serializable";
import { guid } from "../util/util";
import { Logger } from "../util/logger";

class Track {
  public pos: Position;
  public width: number;

  constructor(pos: Position, width: number) {
    this.pos = pos;
    this.width = width;
  }
}

/**
 * 一幅图画由一系列的Operation组成, Every operation made by a
 * start point with many points folows it.
 */
class Operation implements ISerialize {

  private startPos: Position;
  private startTime: Date;
  private isDraw: boolean;  // draw or erase
  private tracks: Track[];
  private uuid: string;
  private isOver: boolean;
  // record current operation trans position
  private transPosition: number;
  // private transObj: ITransfer;

  constructor(pos: Position) {
    this.startPos = pos;
    this.startTime = new Date();
    this.isDraw = true;
    this.tracks = [];
    this.transPosition = 0;
    this.uuid = guid();
    this.isOver = false;
    // this.transObj = undefined as ITransfer;
  }

  public pushTrack(track: Track) {
    this.tracks.push(track);
  }

  public async onFinish() { // Mark this operation is over.
    this.isOver = true;
    Logger.info("This paint is over");
    Logger.info(this.encode());
  }

  public getLastPosition(): Position {
    if (this.tracks.length === 0) {
      return this.startPos;
    }
    return this.tracks.slice(-1)[0].pos;
  }
  public getTrack(): Track[] {
    return this.tracks;
  }

  public encode(): any {
    // We can't encode data twice, but we can encode any time we want.
    // it will record the data shift, and next we want encode, it
    // will start from the last position.
    // const ops: model.Operation[] = [];
    const op = model.Operation.create();
    if (this.transPosition === 0) {
      op.startPos = this.startPos;
      op.isDraw = this.isDraw;
      op.uuid = this.uuid;
      this.transPosition += 1;
    }

    op.uuid = this.uuid;
    op.isDraw = this.isDraw;

    // beacuse the tracks will be pushed, we need store current
    // length for trans.
    const curLenght = this.tracks.length;
    for (let i = this.transPosition; i < curLenght; i++) {
      const tTrack = model.Operation.Track.create();
      const track = this.tracks[i];
      tTrack.pos = track.pos;
      tTrack.width = track.width;
      op.tracks.push(tTrack);
      this.transPosition += 1;
    }
    return model.Operation.encode(op);
    // op.toObject();
    // return op;
  }

  public decode(data: model.Operation) {
    if (data.uuid !== this.uuid) {
      this.uuid = data.uuid;
      this.startPos = data.startPos as Position;
      this.isDraw = data.isDraw;
    }

    data.tracks.forEach((t: model.Operation.ITrack) => {
      this.tracks.push(
        new Track(t.pos as Position, t.width as number));
    });

    return;
  }
}

class TouchOperation extends Operation {
  /**
   *  The mouse event does not have any identifier,
   * but the touch event has.
   */
  private identifier: string;

  constructor(pos: Position, identifier: string) {
    super(pos);
    this.identifier = identifier;
  }
}

export { Operation, Track };
