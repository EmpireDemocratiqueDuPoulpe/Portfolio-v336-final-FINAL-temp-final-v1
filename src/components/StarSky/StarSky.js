import { useState, useRef, useEffect } from "react";
import Star from "./Star/Star.js";
import "./StarSky.css";

function StarSky() {
	/* ---- States ---------------------------------- */
	const containerRef = useRef();
	const [farStars, setFarStars] = useState(null);
	const [midwayStars, setMidwayStars] = useState(null);
	const [closeStars, setCloseStars] = useState(null);

	/* ---- Effects --------------------------------- */
	useEffect(() => {
		const generateStars = (layer, count) => {
			const stars = [];

			for(let index = 0; index <= count; index++) {
				stars.push(<Star key={`stars-sky-${layer}-star${index}`} parent={containerRef.current} layer={layer}/>);
			}

			return stars;
		};

		if (containerRef.current) {
			if (!farStars) setFarStars(generateStars("far", 30));
			if (!midwayStars) setMidwayStars(generateStars("midway", 30));
			if (!closeStars) setCloseStars(generateStars("close", 30));
		}
		// This hook must only run once per container
		// eslint-disable-next-line
	}, [containerRef.current]);

	/* ---- Page content ---------------------------- */
	return (
		<div ref={containerRef} className="stars-sky">
			<div className="stars-layer far-stars">
				{farStars}
			</div>

			<div className="stars-layer midway-stars">
				{midwayStars}
			</div>

			<div className="stars-layer close-stars">
				{closeStars}
			</div>
		</div>
	);
}

export default StarSky;