/**
 * @module StarSky
 * @category Components
 * @author Alexis L. <alexis.lecomte@supinfo.com>
 */

import { useState, useRef, useEffect } from "react";
import Star from "./Star/Star.js";
import "./StarSky.css";

function StarSky() {
	/* ---- States ---------------------------------- */
	const containerRef = useRef(/** @type {Element|null} */ null);
	const [farStars, setFarStars] = useState(/** @type{Array<JSX.Element>|null} */ null);
	const [midwayStars, setMidwayStars] = useState(/** @type{Array<JSX.Element>|null} */ null);
	const [closeStars, setCloseStars] = useState(/** @type{Array<JSX.Element>|null} */ null);

	/* ---- Effects --------------------------------- */
	useEffect(() => {
		/**
		 * Generates `count` stars and returns an array of JSX elements ready to be inserted into the document.
		 * @function
		 * @private
		 *
		 * @param {"far"|"midway"|"close"} layer - The layer in which the star will be located.
		 * @param {number} count - How many stars to generate?
		 *
		 * @return {Array<JSX.Element>} - Generated stars
		 */
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
				<div className="nebula style-1"/>
				<div className="nebula style-2"/>

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