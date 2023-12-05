// App.jsx
import React, { useState } from "react";
import Arduino from "./components/Arduino";
import LED from "./components/LED";
import Wire from "./components/Wire";
import "./App.css";

export default function App() {
	const [objects, setObjects] = useState([]);
	const [wires, setWires] = useState([]);
	const [startPoint, setStartPoint] = useState(null);
	const [isDragging, setIsDragging] = useState(false);

	const handleSidePanelClick = (objectType) => {
		setObjects((prevObjects) => [
			...prevObjects,
			{ id: Date.now(), type: objectType, left: 150, top: 50 },
		]);
	};

	const handleObjectDragStart = (objectId) => {
		console.log(`Dragging started for object with ID: ${objectId}`);
		setIsDragging(true);
	};

	const handleObjectDrag = (objectId, newX, newY) => {
		setObjects((prevObjects) =>
			prevObjects.map((obj) =>
				obj.id === objectId ? { ...obj, left: newX, top: newY } : obj
			)
		);
	};

	const handleObjectDragEnd = () => {
		console.log("Dragging ended");
		setIsDragging(false);
	};

	const handleCanvasClick = (e) => {
		let x, y;
		const target = e.target;

		if (target.classList.contains("point") && !isDragging) {

			const parentTargetStyles = getComputedStyle(target.parentNode, null);
			const targetStyles = getComputedStyle(target, null);

			x = parseInt(parentTargetStyles.getPropertyValue("left")) + parseInt(targetStyles.getPropertyValue("left"));
			y = parseInt(parentTargetStyles.getPropertyValue("top")) + parseInt(targetStyles.getPropertyValue("top"))

			// console.log(x);
			// console.log(y);

			if (startPoint) {
				setWires((prevWires) => [
					...prevWires,
					{ id: Date.now(), start: startPoint, end: { x, y } },
				]);
				setStartPoint(null);
			} else {
				setStartPoint({ x, y });
			}
		}
	};

	const handleWireCreation = (wireId, endX, endY) => {
		setWires((prevWires) =>
			prevWires.map((wire) =>
				wire.id === wireId ? { ...wire, end: { x: endX, y: endY } } : wire
			)
		);
	};

	return (
		<div>
			{/* Side panel with objects */}
			<div className="sidePanel">
				<div
					className="sideObject"
					onClick={() => handleSidePanelClick("Arduino")}
				>
					Arduino
				</div>
				<div className="sideObject" onClick={() => handleSidePanelClick("LED")}>
					LED
				</div>
				{/* Add more objects as needed */}
			</div>

			{/* Container for draggable objects and wires */}
			<div className="canvasContainer" onClick={handleCanvasClick}>
				{objects.map((obj) =>
					obj.type === "Arduino" ? (
						<Arduino
							key={obj.id}
							id={obj.id}
							left={obj.left}
							top={obj.top}
							onDragStart={handleObjectDragStart}
							onDrag={handleObjectDrag}
							onDragEnd={handleObjectDragEnd}
						>
							{obj.type}
						</Arduino>
					) : obj.type === "LED" ? (
						<LED
							key={obj.id}
							id={obj.id}
							left={obj.left}
							top={obj.top}
							onDragStart={handleObjectDragStart}
							onDrag={handleObjectDrag}
							onDragEnd={handleObjectDragEnd}
						>
							{obj.type}
						</LED>
					) : null
				)}
				{wires.map((wire) => (
					<Wire
						key={wire.id}
						start={wire.start}
						end={wire.end}
						onCreate={(endX, endY) => handleWireCreation(wire.id, endX, endY)}
					/>
				))}
			</div>
		</div>
	);
}
