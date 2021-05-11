import * as React from "react";
import { Range } from "react-range";
import { useState } from "react";

const SuperSimple = ({ setPriceMin, setPriceMax }) => {
  const [values, setValues] = useState([0, 500]);
  setPriceMin(values[0]);
  setPriceMax(values[1]);

  return (
    <Range
      step={1}
      min={0}
      max={500}
      values={values}
      onChange={(values) => setValues(values)}
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
      renderThumb={({ props, index }) => (
        <div
          {...props}
          style={{
            ...props.style,
            height: "32px",
            width: "32px",
            backgroundColor: "#999",
          }}
        >
          {values[index]} €
        </div>
      )}
    />
  );
};

export default SuperSimple;
