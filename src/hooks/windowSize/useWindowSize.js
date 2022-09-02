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
 * Keeps track of the window inner size and expose it through the hook.
 * @function
 *
 * @example
 * function Component() {
 *   const { width, height } = useWindowSize();
 *
 *   return (width > 480) ? <p>Small device</p> : <p>Big device</p>;
 * }
 *
 * @return {WindowSize} - The window size.
 */
function useWindowSize() {
	/* ---- States ---------------------------------- */
	const [windowSize, setWindowSize] = useState(/** @type {WindowSize} */ getWindowSize());


	/* ---- Effects --------------------------------- */
	useEffect(() => {
		const handleResize = () => {
			setWindowSize(getWindowSize());
		};

		window.addEventListener("resize", handleResize);
		return () => { window.removeEventListener("resize", handleResize); };
	}, []);

	/* ---- Expose hook ----------------------------- */
	return windowSize;
}

export default useWindowSize;