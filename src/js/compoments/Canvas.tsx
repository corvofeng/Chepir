import * as React from "react";
import * as ReactDOM from "react-dom";
import { Logger } from "../util/logger";
import { ChepirCanvas, RegisterPaintEvent, DeRegisterPaintEvent } from "../model/painter";

export class CanvasComponent extends React.Component {
  private element: HTMLDivElement | null;
  private chepirCanvas: ChepirCanvas | null;

  public constructor(props: any) {
    super(props);
    this.chepirCanvas = null;
    this.element = null;
  }

  public componentDidMount() {
    this.updateCanvas();
  }

  public updateCanvas() {
    const canvasHTML: HTMLCanvasElement = ReactDOM.findDOMNode(this) as HTMLCanvasElement;
    let width: number = 800;
    let height: number = 800;

    if (this.element) {
      width = this.element.offsetWidth;
      height = this.element.offsetHeight;
      Logger.info("Update canvas");
    }

    const canvas: any = this.refs.canvas;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    this.chepirCanvas = new ChepirCanvas(ctx, canvas, width, height);
    // canvas.width = 800;
    // canvas.height = 800;
    // this.chepirCanvas.setContext(ctx);
    // this.chepirCanvas.setCanvas(canvas);
    RegisterPaintEvent(canvasHTML, this.chepirCanvas, true);

    // Every time the div changed, call updateDimensions
    // window.addEventListener("resize", this);

  }

  public componentWillUnmount() {
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
          height: "800px",
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
