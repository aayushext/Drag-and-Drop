import React from "react";
import "../App.css";

function Point({ x, y }) {
  const handleMouseDown = (e) => {
    console.log("Mouse down on point");
  };

  return (
    <div
      className="point"
      style={{ left: `${x - 5}px`, top: `${y - 5}px` }}
      onMouseDown={handleMouseDown}
    ></div>
  );
}

export default Point;
