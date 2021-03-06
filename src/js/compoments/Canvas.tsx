import * as React from "react";
import * as ReactDOM from "react-dom";
import { Logger } from "../util/logger";
import { ChepirCanvas, RegisterPaintEvent, DeRegisterPaintEvent } from "../model/painter";

export class CanvasComponent extends React.Component {
  public static getEleAttr(ele: Element, attr: string): string | undefined {
    const a = ele.getAttribute(attr);
    let val: string | undefined;
    if (a !== null) {
      val = a;
    }
    return val;
  }
  private element: HTMLDivElement | null;
  private chepirCanvas: ChepirCanvas | null;
  private interval: number;
  private intervalTime: number;

  public constructor(props: any) {
    super(props);
    this.chepirCanvas = null;
    this.element = null;
    this.interval = -1;
    this.intervalTime = 1000;
  }

  public async componentDidMount() {
    await this.updateCanvas();

    this.interval = window.setInterval(this.timer, this.intervalTime);
  }

  public timer() {
    Logger.debug("In canvas timer");
  }

  public async updateCanvas() {
    const canvasHTML: HTMLCanvasElement = ReactDOM.findDOMNode(this) as HTMLCanvasElement;
    let width: number = 400;
    let height: number = 400;

    if (this.element) {
      width = this.element.offsetWidth;
      height = this.element.offsetHeight;
      Logger.info("Update canvas");
    }

    const canvas: any = this.refs.canvas;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    // Get some config in element attributes.
    const ele = ReactDOM.findDOMNode(this) as Element;
    const pNode = ele.parentNode as Element;

    const wsURL = CanvasComponent.getEleAttr(pNode, "ws-url");
    const wsPath = CanvasComponent.getEleAttr(pNode, "ws-path");
    Logger.debug("Get attr: ws-url", wsURL, "ws-path", wsPath);

    this.chepirCanvas = new ChepirCanvas(ctx, canvas, width, height, wsURL, wsPath);
    RegisterPaintEvent(canvasHTML, this.chepirCanvas, true);
    await this.chepirCanvas.readFromTrans();
    // Every time the div changed, call updateDimensions
    // window.addEventListener("resize", this);

  }



  public componentWillUnmount() {
    window.clearInterval(this.interval);

    const canvasHTML: HTMLCanvasElement = ReactDOM.findDOMNode(this) as HTMLCanvasElement;
    if (this.chepirCanvas) {
      DeRegisterPaintEvent(canvasHTML, this.chepirCanvas);
    }
  }

  public loadStyles(cnt: number): object {
    const divStyle = {
      zIndex: `${cnt}`,
    };
    Logger.info("Load ", divStyle);
    return divStyle;
  }

  public render() {
    return (
      <div
        ref={(ele) => { this.element = ele; }}
        style={{
          width: "100%",
          height: "400px",
          // height: `${}`,
        }}
      >
        <canvas ref="canvas"
          className="chepir-canvas"
          style={this.loadStyles(1)}
        >
          Sorry, your browser is too old for this.
        </canvas>
        {/* <canvas ref="canvas" className="chepir-canvas" style={this.loadStyles(2)} width={600} height={600} /> */}
        {/* <img ref="image" className="hidden" /> */}
        {/* <div>
          {this.chepirCanvas.debugInfo()}
        </div> */}
      </div>
    );
  }
}
