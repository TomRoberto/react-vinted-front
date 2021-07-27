import * as React from "react";
import { Range } from "react-range";
import { useState, useEffect } from "react";

const SuperSimple = ({ setPriceMin, setPriceMax }) => {
  const [values, setValues] = useState([0, 500]);
  const [finalValues, setFinalValues] = useState([0, 500]);
  useEffect(() => {
    const handleChanges = () => {
      setPriceMin(finalValues[0]);
      setPriceMax(finalValues[1]);
    };
    handleChanges();
  }, [finalValues]);

  return (
    <Range
      step={1}
      min={0}
      max={500}
      values={values}
      onChange={(values) => setValues(values)}
      onFinalChange={(values) => setFinalValues(values)}
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
            height: "50px",
            width: "50px",
            borderRadius: "25px",
            backgroundColor: "#999",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {values[index]} €
        </div>
      )}
    />
  );
};

export default SuperSimple;
