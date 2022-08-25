/**
 * @module CV
 * @category Contexts
 * @author Alexis L. <alexis.lecomte@supinfo.com>
 */

import { createContext, useContext, useState, useRef, useEffect, useMemo, useCallback } from "react";
import PropTypes from "prop-types";

/*****************************************************
 * Typedefs
 *****************************************************/

/** @typedef {React.Context<null|Object>} CVCtx */

/*****************************************************
 * Functions of CVProvider
 *****************************************************/

/**
 * Hides the CV modal.
 * @callback hideFunction
 */

/**
 * Toggles the CV modal.
 * @callback toggleFunction
 */

/**
 * Builds the `animation-duration` string and returns it.
 * @callback getDurationStrFunction
 *
 * @return {string} - The `animation-duration` string.
 */

/*****************************************************
 * Constants
 *****************************************************/

/**
 * @const
 * @private
 * @type {CVCtx}
 */
const CVContext = createContext(null);

/**
 * CV modal states
 * @const
 * @readonly
 * @enum {Object<string>}
 */
export const states = { HIDDEN: "hidden", HIDING: "hiding", SHOWN: "shown" };

/**
 * CSS class used to disable the scrolling.
 * @const
 * @readonly
 * @private
 * @type {string}
 */
const NO_SCROLL_CLASS = "no-scroll";

/*****************************************************
 * CVProvider
 *****************************************************/
export function CVProvider({ children }) {
	/* ---- States - Part one ----------------------- */
	const file = "./documents/cv.pdf";
	const [state, setState] = useState(/** @type {string} */ states.HIDDEN);
	const [animDurationMs, setAnimDurationMs] = useState(/** @type {number} */ 250);
	const animTimeout = useRef(/** @type {number} */ 0);
	const [pagesCount, setPagesCount] = useState(/** @type {number|null} */ null);
	const [currentPage] = useState(/** @type {number} */ 1);
	
	/* ---- Effects --------------------------------- */
	useEffect(() => {
		return () => {
			clearTimeout(animTimeout.current);
			document.body.parentElement.classList.remove(NO_SCROLL_CLASS);
		};
	}, []);

	/* ---- Functions ------------------------------- */
	/**
	 * Shows the CV modal.
	 * @function
	 */
	const show = () => {
		setState(states.SHOWN);
		document.body.parentElement.classList.add(NO_SCROLL_CLASS);
	};

	/** @type {hideFunction} */
	const hide = useCallback(() => {
		setState(states.HIDING);

		clearTimeout(animTimeout.current);
		animTimeout.current = setTimeout(() => {
			setState(states.HIDDEN);
			document.body.parentElement.classList.remove(NO_SCROLL_CLASS);
		}, animDurationMs);
	}, [animDurationMs]);

	/** @type {toggleFunction} */
	const toggle = useCallback(() => {
		if (state === states.HIDDEN) {
			show();
		} else if (state === states.SHOWN) {
			hide();
		}
	}, [state, hide]);

	/** @type {getDurationStrFunction} */
	const getDurationStr = useCallback(() => `${animDurationMs}ms`, [animDurationMs]);

	/**
	 * Changes the animation duration.
	 * @function
	 *
	 * @param {number} durationMs - The duration **in milliseconds**.
	 */
	const changeAnimationDuration = durationMs => { setAnimDurationMs(durationMs); };

	/**
	 * Initialize the CV context when the document is loaded.
	 * @function
	 *
	 * @param {{ numPages: number }} properties - Loaded file properties.
	 */
	const handleLoadSuccess = ({ numPages }) => { setPagesCount(numPages); };
	
	/* ---- States - Part two ----------------------- */
	const memoizedContext = useMemo(() => ({
		file,
		state, show, hide, toggle,
		animation: { durationMs: animDurationMs, getDurationStr, setDuration: changeAnimationDuration },
		pages: { total: pagesCount, current: currentPage },
		events: { onLoadSuccess: handleLoadSuccess },
	}), [state, hide, toggle, animDurationMs, getDurationStr, pagesCount, currentPage]);
	
	/* ---- Page content ---------------------------- */
	return (
		<CVContext.Provider value={memoizedContext}>
			{children}
		</CVContext.Provider>
	);
}
CVProvider.propTypes = {
	children: PropTypes.node
};

/*****************************************************
 * Hook
 *****************************************************/

/**
 * Returns the `CVContext`.
 * @function
 *
 * @return {CVCtx|Object}
 */
export default function useCV() {
	return useContext(CVContext);
}