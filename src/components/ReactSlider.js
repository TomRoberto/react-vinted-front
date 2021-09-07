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
    <div className="range-container">
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
              backgroundColor: "#2DB0BA",
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
              // backgroundColor: "#999",
              backgroundColor: "#2DB0BA",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
            }}
          >
            {values[index]} €
          </div>
        )}
      />
    </div>
  );
};

export default SuperSimple;
