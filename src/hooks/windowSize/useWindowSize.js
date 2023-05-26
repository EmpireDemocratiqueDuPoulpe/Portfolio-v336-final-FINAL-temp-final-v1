/**
 * @module useWindowSize
 * @category Hooks
 * @subcategory Browser
 * @author Alexis L. <alexis.lecomte@supinfo.com>
 *
 * From a StackOverflow answer.
 * @See https://stackoverflow.com/a/36862446/15024857
 */

import { useState, useEffect } from "react";

/*****************************************************
 * Typedefs
 *****************************************************/

/**
 * @typedef {Object} WindowSize
 *
 * @property {number} width - Inner width of the `window` object.
 * @property {number} height - Inner height of the `window` object.
 */

/**
 * @typedef {"landscape"|"portrait"} WindowOrientation
 */

/**
 * @typedef {Object} WindowProperties
 *
 * @property {number} width - Inner width of the `window` object.
 * @property {number} height - Inner height of the `window` object.
 * @property {WindowOrientation} orientation - Window orientation.
 * @property {boolean} isPortrait - Provided for convenience. Is the window in portrait mode?
 * @property {boolean} isLandscape - Provided for convenience. Is the window in landscape mode?
 */

/*****************************************************
 * Hook
 *****************************************************/

/**
 * Returns an object with a `width` and `height` properties corresponding to the window inner size.
 * @function
 * @private
 *
 * @return {WindowSize} - The window size.
 */
function getWindowSize() {
	return { width: window.innerWidth, height: window.innerHeight };
}

/**
 * @const
 * @private
 * @type {MediaQueryList}
 */
const watchOrientation = window.matchMedia("(orientation: portrait)");

/**
 * Returns the window orientation as a string.
 * @function
 * @private
 *
 * @param {MediaQueryList} [event] - Use an event query list instead of the default one.
 * @param {WindowOrientation} [watchFor] - Required if `event` is set. Which orientation is this event matching?
 *
 * @return {WindowOrientation} - The window orientation.
 */
function getWindowOrientation(event, watchFor) {
	if (event && !watchFor) throw Error("useWindowSize: Missing `watchFor` parameter in function call!");
	return (event ?? watchOrientation).matches ? (event ? watchFor : "portrait") : (event ? (watchFor === "portrait" ? "landscape" : "portrait") : "landscape");
}

/**
 * Keeps track of the window inner size and expose it through the hook.
 * @function
 *
 * @example
 * function Component() {
 *   const { width } = useWindowSize();
 *
 *   return (width > 480) ? <p>Small device</p> : <p>Big device</p>;
 * }
 *
 * @return {WindowProperties} - The window size.
 */
function useWindowSize() {
	/* ---- States - Part one ----------------------- */
	const [windowSize, setWindowSize] = useState(/** @type {WindowSize} */ getWindowSize());
	const [orientation, setOrientation] = useState(/** @type {WindowOrientation} */ getWindowOrientation());

	/* ---- Effects --------------------------------- */
	useEffect(() => {
		const handleResize = () => { setWindowSize(getWindowSize()); };
		const handleRotation = event => { setOrientation(getWindowOrientation(event, "portrait")); };

		window.addEventListener("resize", handleResize);
		watchOrientation.addEventListener("change", handleRotation);
		return () => {
			window.removeEventListener("resize", handleResize);
			watchOrientation.removeEventListener("change", handleRotation);
		};
	}, []);

	/* ---- Expose hook ----------------------------- */
	return {
		...windowSize, orientation, isPortrait: orientation === "portrait", isLandscape: orientation === "landscape"
	};
}

export default useWindowSize;