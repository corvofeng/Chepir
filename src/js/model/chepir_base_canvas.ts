"use strict";
// vim: ts=2 sw=2 sts=2 et:
/*
 *=======================================================================
 *    Filename:chepir_base_canvas.ts
 *
 *     Version: 1.0
 *  Created on: November 22, 2018
 *
 *      Author: corvo
 *=======================================================================
 */

import { Position, Colors } from "./painter";
import { Assert } from "../util/util";


/**
 * An Canvas need to have canvas element, and context, but a specific
 * class should not know anything about the canvas. there is only
 * thing the need to know, they can draw.
 */
class ChepirBaseCanvas {
    /**
     * A an tuple for events map, every use this as a base
     * class, then eventMaps musted by covered. Or you will failed
     * in `getAllEvents`, it uses `Assert` to make sure that
     * the `eventMaps` is not empty.
     */
    protected eventMaps: Array<[string, string]>;

    private context: CanvasRenderingContext2D;
    private canvas: HTMLCanvasElement;

    public constructor(
        ctx: CanvasRenderingContext2D | null,
        canvas: HTMLCanvasElement | null) {

        // This time the ctx may be null
        this.context = ctx as CanvasRenderingContext2D;
        this.canvas = canvas as HTMLCanvasElement;
        this.eventMaps = [];
    }
    public setContext(ctx: CanvasRenderingContext2D) {
        this.context = ctx;
    }

    public setCanvas(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
    }

    /**
     * This will only called by inheritance.
     */
    public getAllEvents(): string[] {
        Assert(this.eventMaps.length !== 0);
        const events: string[] = [];
        this.eventMaps.forEach((pair: [string, string]) => {
            events.push(pair[0]);
        });
        return events;
    }

    /**
     * This will only called by inheritance.
     */
    public handleEvent(evt: Event): void {
        Assert(this.eventMaps.length !== 0);

        // Choose specific eventlistener, why did I give this task
        // to browser, beacuse, use browser will loss the `this`
        // pointer. Maybe add some judge will damage time,
        // the urgent thing is keep it more comfortable for human.
        this.eventMaps.forEach((pair: [string, string]) => {
            const eventName: string = pair[0];
            if (evt.type === eventName) {
                (this as any)[pair[1]](evt);
            }
        });
        evt.preventDefault();
    }

    /**
     * Canvas event's position is the absulate position from the whole
     * screen, not from current canvas, we must make some conversion.
     */
    protected _getPosition(event: MouseEvent): Position {
        const rect = this.canvas.getBoundingClientRect();
        const x: number = event.pageX - window.pageXOffset;
        const y: number = event.pageY - window.pageYOffset;

        return new Position(
            (x - rect.left) / (rect.right - rect.left) * this.canvas.width,
            (y - rect.top) / (rect.bottom - rect.top) * this.canvas.height,
        );
    }

    protected _stroke(
        start: Position,
        end: Position,
        color: Colors,
        size: number,
        compositeOperation: string) {

        this.context.save();
        this.context.lineJoin = "round";
        this.context.lineCap = "round";
        this.context.strokeStyle = "red";
        this.context.lineWidth = size;
        this.context.globalCompositeOperation = compositeOperation;
        this.context.beginPath();
        this.context.moveTo(start.x, start.y);
        this.context.lineTo(end.x, end.y);
        this.context.closePath();
        this.context.stroke();

        this.context.restore();
    }
    protected _draw(
        start: Position,
        end: Position,
        color: Colors,
        size: number,
    ) {
        this._stroke(start, end, color, size, "source-over");
    }

    protected _erase(
        start: Position,
        end: Position,
        color: Colors,
        size: number,
    ) {
        this._stroke(start, end, color, size, "destination-out");
    }
}

export { ChepirBaseCanvas };
