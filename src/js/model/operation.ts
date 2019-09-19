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
import { guid, Assert } from "../util/util";
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
  public static decode(enData: Uint8Array): Operation {
    const op = new Operation(new Position(-1, -1));
    op._decode(enData);
    return op;
  }

  private startPos: Position;
  private startTime: Date;
  private isDraw: boolean; // draw or erase
  private tracks: Track[];
  private uuid: string;
  private isOver: boolean;
  // record current operation trans position
  private transPosition: number;
  private transObj: ITransfer | undefined;

  constructor(pos: Position, transObj?: ITransfer) {
    this.startPos = pos;
    this.startTime = new Date();
    this.isDraw = true;
    this.tracks = [];
    this.transPosition = 0;
    this.uuid = guid();
    this.isOver = false;
    this.transObj = transObj;
  }

  public pushTrack(track: Track) {
    this.tracks.push(track);
  }

  public async onFinish() {
    // Mark this operation is over.
    this.isOver = true;
    Logger.info("This paint is over");
    if (this.transObj && this.transObj.canRW()) {
      while (true) {
        const data = this.encode();
        if (data) {
          this.transObj.send(data);
        } else {
          break;
        }
      }
    } else {
      Logger.warn("Current websocket not work");
    }
  }

  public getStartPosition(): Position {
    return this.startPos;
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

  public encode(): Uint8Array | undefined {
    // We can't encode data twice, but we can encode any time we want.
    // it will record the data shift, and next we want encode, it
    // will start from the last position.
    // const ops: model.Operation[] = [];
    // return model.Operation.encode(op).finish();
    while (true) {
      const data = this.iter();
      if (data !== undefined) {
        return model.Operation.encode(data).finish();
      } else {
        break;
      }
    }
    return undefined;
  }
  public iter(maxLen: number = 10): model.Operation | undefined {
    const op = model.Operation.create();
    if (this.transPosition === 0) {
      op.startPos = this.startPos;
      op.isDraw = this.isDraw;
      op.uuid = this.uuid;
    }

    op.uuid = this.uuid;
    op.isDraw = this.isDraw;

    const itStart = this.transPosition;
    for (let i = itStart; i < itStart + maxLen && i < this.tracks.length; i++) {
      const tTrack = model.Operation.Track.create();
      const track = this.tracks[i];
      tTrack.pos = track.pos;
      tTrack.width = track.width;
      op.tracks.push(tTrack);
      this.transPosition += 1;
    }
    if (op.tracks.length === 0) {
      return undefined;
    }
    return op;
  }

  public merge(obj: Operation): void {
    /**
     * If the origin operation is exist, this enData is a section
     * belong to this operation, so we only make an uuid check
     * and push new position data.
     *
     * TODO: the sections may be disorder, we need to resort the section.
     */
    Assert(obj.uuid === this.uuid);
    obj.tracks.forEach((t: model.Operation.ITrack) => {
      this.tracks.push(new Track(t.pos as Position, t.width as number));
    });
    return;
  }

  /**
   * This function should not exist, please refer to `ISerialize`
   * Don't call this function directly.
   */
  public _decode(enData: Uint8Array) {
    let data: model.Operation | undefined;
    try {
      data = model.Operation.decode(enData) as model.Operation;
    } catch (error) {
      Logger.error("decode ", enData, "with error: ", error);
    }
    if (data === undefined) {
      Logger.warn("Can't get data from ", enData);
      return;
    }
    this.uuid = data.uuid;
    this.startPos = data.startPos as Position;
    this.isDraw = data.isDraw;

    data.tracks.forEach((t: model.Operation.ITrack) => {
      this.tracks.push(new Track(t.pos as Position, t.width as number));
    });
    return;
  }

  public getUUID(): string {
    return this.uuid;
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
