import * as React from "react";
import * as ReactDOM from "react-dom";
import { Logger } from "../util/logger";
import { ChepirCanvas, RegisterPaintEvent, DeRegisterPaintEvent } from "../model/painter";

export class CanvasComponent extends React.Component {
  private chepirCanvas: ChepirCanvas;

  public constructor(props: any) {
    super(props);
    this.chepirCanvas = new ChepirCanvas(null);
  }

  public componentDidMount() {
    this.updateCanvas();
  }

  public updateCanvas() {
    // ctx.fillRect(0,0, 100, 100);
    const canvasHTML: HTMLCanvasElement = ReactDOM.findDOMNode(this) as HTMLCanvasElement;


    const canvas: any = this.refs.canvas;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    this.chepirCanvas.setContext(ctx);
    this.chepirCanvas.simpleDraw();
    RegisterPaintEvent(canvasHTML, this.chepirCanvas, true);
    // canvasHTML.addEventListener("mousedown", () => {
    //   Logger.info("Mouse down");
    // });

    Logger.info("Update canvas");
  }

  public componentWillUnmount() {
    const canvasHTML: HTMLCanvasElement = ReactDOM.findDOMNode(this) as HTMLCanvasElement;
    DeRegisterPaintEvent(canvasHTML, this.chepirCanvas);
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
      <div>
        <canvas ref="canvas"
          className="chepir-canvas"
          style={this.loadStyles(1)}
          width={this.chepirCanvas.getWidth()}
          height={this.chepirCanvas.getHeight()}
        />
        {/* <canvas ref="canvas" className="chepir-canvas" style={this.loadStyles(2)} width={600} height={600} /> */}
        {/* <img ref="image" className="hidden" /> */}
      </div>

    );
  }
}
