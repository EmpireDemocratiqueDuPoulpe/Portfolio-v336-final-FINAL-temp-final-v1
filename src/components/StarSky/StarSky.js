import Star from "./Star/Star.js";
import "./StarSky.css";

function StarSky() {
	/* ---- Page content ---------------------------- */
	return (
		<div className="stars-sky">
			<div className="stars-layer far-stars">
				<Star layer="far"/>
			</div>

			<div className="stars-layer midway-stars">
				<Star layer="midway"/>
			</div>

			<div className="stars-layer close-stars">
				<Star layer="close"/>
			</div>
		</div>
	);
}

export default StarSky;