/**
 * @module Star
 * @category Components
 * @subcategory StarSky
 * @author Alexis L. <alexis.lecomte@supinfo.com>
 */

import { useMemo } from "react";
import PropTypes from "prop-types";
import { random } from "lodash-es";
import useClassName from "../../../hooks/className/useClassName.js";
import ReactRellax from "../../ReactRellax/ReactRellax.js";
import "./Star.css";

/*****************************************************
 * Typedefs
 *****************************************************/

/**
 * @typedef {Object} Layer
 *
 * @property {string} name - Layer name.
 * @property {number} speed - Parallax effect speed.
 */

/**
 * @typedef {Object} StarProperties
 *
 * @property {string} top - Top positioning used with `position: absolute;`.
 * @property {string} left - Left positioning used with `position: absolute;`.
 * @property {Object} styles - ClassNames to add to the star component.
 * @property {string} styles.opacity - A random opacity class applied on the star.
 */

/*****************************************************
 * Constants
 *****************************************************/

/**
 * @const
 * @readonly
 * @type {Array<Layer>}
 */
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
	const layer = /** @type {Layer} */ LAYERS.filter(l => l.name === layerName)[0];
	const properties = useMemo(/** @type {function(): StarProperties} */ () => {
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