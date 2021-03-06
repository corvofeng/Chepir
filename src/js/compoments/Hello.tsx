import * as React from "react";

export interface IHelloProps {
    compiler: string;
    framework: string;
}

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class Hello extends React.Component<IHelloProps, {}> {
    public render() {
        return <h1 id={this.props.compiler}>Hello from {this.props.compiler} and {this.props.framework}!</h1>;
    }
}
