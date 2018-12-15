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
class Operation {
  private startPos: Position;
  private startTime: Date;
  private isDraw: boolean;
  private tracks: Track[];

  constructor(pos: Position) {
    this.startPos = pos;
    this.startTime = new Date();
    this.isDraw = true;
    this.tracks = [];
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
