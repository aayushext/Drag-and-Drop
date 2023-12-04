import React from "react";
import DraggableObject from "./DraggableObject";
import Point from "./Point";

// Arduino component extends DraggableObject
function Arduino({ id, left, top, onDragStart, onDrag, onDragEnd, children }) {
  // You can add specific properties or behaviors for Arduino here if needed

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
      <Point x={0} y={0} />
    </DraggableObject>
  );
}

export default Arduino;
