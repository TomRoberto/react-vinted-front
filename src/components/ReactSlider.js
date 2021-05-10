import * as React from "react";
import { Range } from "react-range";

class SuperSimple extends React.Component {
  state = { values: [50] };
  render() {
    return (
      <Range
        step={1}
        min={0}
        max={500}
        values={this.state.values}
        onChange={(values) => this.setState({ values })}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "6px",
              width: "100%",
              backgroundColor: "#ccc",
            }}
          >
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "22px",
              width: "22px",
              backgroundColor: "#999",
            }}
          />
        )}
      />
    );
  }
}

export default SuperSimple;
