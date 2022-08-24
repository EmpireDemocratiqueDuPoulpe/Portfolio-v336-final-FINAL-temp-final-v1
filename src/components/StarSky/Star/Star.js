import { useMemo } from "react";
import PropTypes from "prop-types";
import { random } from "lodash-es";
import useClassName from "../../../hooks/className/useClassName.js";
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

function Star({ parent, layer: layerName }) {
	/* ---- States ---------------------------------- */
	const layer = LAYERS.filter(l => l.name === layerName)[0];
	const properties = useMemo(() => {
		const boundingBox = parent ? parent.getBoundingClientRect() : { width: 0, height: 0 };
		
		return {
			top: `${(random(0, boundingBox.height, false) * 100) / boundingBox.height}%`,
			left: `${(random(0, boundingBox.width, false) * 100) / boundingBox.width}%`,
			styles: {
				opacity: `opacity-${random(1, 3, false)}`
			}
		};
	}, [parent]);
	const classes = useClassName(hook => {
		hook.set("star");
		hook.set(properties.styles.opacity);
	}, [properties.styles.opacity]);

	/* ---- Page content ---------------------------- */
	return <ReactRellax
		className={classes}
		style={{ top: properties.top, left: properties.left }}
		wrapper=".App-scrollbar .scrollbar-view"
		speed={layer.speed}
	/>;
}
Star.propTypes = {
	parent: PropTypes.any.isRequired,
	layer: PropTypes.oneOf(LAYERS.map(l => l.name)).isRequired
};

export default Star;