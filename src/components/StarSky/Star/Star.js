import PropTypes from "prop-types";
import ReactRellax from "../../ReactRellax/ReactRellax.js";
import "./Star.css";

/*****************************************************
 * Constants
 *****************************************************/

const LAYERS = [
	{ name: "close", speed: -1 },
	{ name: "midway", speed: 0 },
	{ name: "far", speed: 1 },
];

/*****************************************************
 * Star
 *****************************************************/

function Star({ layer: layerName }) {
	/* ---- States ---------------------------------- */
	const layer = LAYERS.filter(l => l.name === layerName)[0];

	/* ---- Page content ---------------------------- */
	return <ReactRellax className="star" speed={layer.speed} wrapper=".App-scrollbar .scrollbar-view"/>;
}
Star.propTypes = {
	layer: PropTypes.oneOf(LAYERS.map(l => l.name)).isRequired
};

export default Star;