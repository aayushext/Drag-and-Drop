import React, { useState } from "react";

import "../App.css";

// DraggableObject component
function DraggableObject({
  id,
  left,
  top,
  onDragStart,
  onDrag,
  onDragEnd,
  children,
}) {
  const [isDragging, setDragging] = useState(false);
  const [initialX, setInitialX] = useState(0);
  const [initialY, setInitialY] = useState(0);

  const handleMouseDown = (e) => {
    e.preventDefault();
    const boundingRect = e.target.getBoundingClientRect();

    setDragging(true);
    setInitialX(e.clientX - boundingRect.left);
    setInitialY(e.clientY - boundingRect.top);

    onDragStart(id);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const newX = e.clientX - initialX;
      const newY = e.clientY - initialY;
      onDrag(id, newX, newY);
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
    onDragEnd();
  };

  return (
    <div
      className="draggable"
      style={{ left, top }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {children}
    </div>
  );
}

export default DraggableObject;
