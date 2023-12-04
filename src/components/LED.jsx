import React from "react";
import DraggableObject from "./DraggableObject";
import Point from "./Point";
import "../App.css";

// Arduino component extends DraggableObject
function LED({ id, left, top, onDragStart, onDrag, onDragEnd, children }) {
  // You can add specific properties or behaviors for LED here if needed

  return (
    <DraggableObject
      id={id}
      left={left}
      top={top}
      onDragStart={onDragStart}
      s
      onDrag={onDrag}
      onDragEnd={onDragEnd}
    >
      {children}
      <Point x={10} y={10} />
    </DraggableObject>
  );
}

export default LED;
