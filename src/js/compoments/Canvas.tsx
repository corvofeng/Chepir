import * as React from "react";
import { Logger } from "../util/logger";

export class CanvasComponent extends React.Component {
  componentDidMount() {
    this.updateCanvas();
  }
  updateCanvas() {
    // const ctx = this.refs.canvas.getContext('2d');
    // ctx.fillRect(0,0, 100, 100);
    const canvas: any = this.refs.canvas
    const ctx = canvas.getContext("2d")
    ctx.fillRect(0,0, 100, 100);


    // const img: any = this.refs.image;
    // img.onload = () => {
    //   ctx.drawImage(img, 0, 0)
    //   ctx.font = "40px Courier"
    //   ctx.fillText("Hello world", 210, 75)
    // }

    Logger.info("Update canvas");
  }
  render() {
    return (
      <div>
        <canvas ref="canvas" width={300} height={300} />
        <canvas ref="canvas" width={300} height={300} />
        {/* <img ref="image" className="hidden" /> */}
      </div>

    );
  }
}