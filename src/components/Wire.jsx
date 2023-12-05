import React, { useState } from "react";
import "../App.css";

const Wire = ({ start, end }) => {
	const [startPoint, setStartPoint] = useState(null);
	const [endPoint, setEndPoint] = useState(null);


	return (
		<svg width="100%" height="100%" /*style={{ position: "relative" }}*/>
			{/* <path className="wire" stroke="black" fill="transparent" ref={pathRef} /> */}
			< line
				className="wire"
				x1={start.x}
				y1={start.y}
				x2={end.x}
				y2={end.y}
			/>
		</svg >
	);
};

export default Wire;
