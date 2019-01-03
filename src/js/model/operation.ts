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
import { ISerialize, model } from "./serializable";
import { guid } from "../util/util";

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
  private isDraw: boolean;
  private tracks: Track[];
  private uuid: string;
  // record current operation trans position
  private transPosition: number;

  constructor(pos: Position) {
    this.startPos = pos;
    this.startTime = new Date();
    this.isDraw = true;
    this.tracks = [];
    this.transPosition = 0;
    this.uuid = guid();
  }

  public pushTrack(track: Track) {
    this.tracks.push(track);
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

  public encode(): any[] {
    const ops: model.Operation[] = [];
    if (this.transPosition === 0) {
      const op = model.Operation.create();
      op.startPos = this.startPos;
      op.isDraw = this.isDraw;
      op.uuid = this.uuid;
      ops.push(op);
      this.transPosition += 1;
    }

    for (let i = this.transPosition; i < this.tracks.length; i++) {
      const op = new model.Operation();
      op.isDraw = this.isDraw;
      const track = this.tracks[i];
      op.tracks.push({ pos: track.pos, width: track.width });

      ops.push(op);
    }
    return ops;
  }

  public decode() {
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
