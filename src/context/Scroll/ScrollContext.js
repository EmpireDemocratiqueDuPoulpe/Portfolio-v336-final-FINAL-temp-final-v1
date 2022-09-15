/**
 * @module Scroll
 * @category Contexts
 * @author Alexis L. <alexis.lecomte@supinfo.com>
 */

import { createContext, useContext, useRef, useEffect, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";

/*****************************************************
 * Typedefs
 *****************************************************/

/** @typedef {React.Context<null|Object>} ScrollCtx */

/**
 * @typedef {Object} ScrollBox
 *
 * @property {number} top - scrollTop progress, from 0 to 1.
 * @property {number} left - scrollLeft progress, from 0 to 1.
 * @property {number} clientWidth - Width of the view.
 * @property {number} clientHeight - Height of the view.
 * @property {number} scrollWidth - Native scrollWidth.
 * @property {number} scrollHeight - Native scrollHeight.
 * @property {number} scrollLeft - Native scrollLeft.
 * @property {number} scrollTop - Native scrollTop.
 */

/*****************************************************
 * Functions of ScrollProvider
 *****************************************************/

/**
 * Adds a listener to the scroll event.
 * @callback addListenerFunction
 *
 * @param {function} callback - The callback to trigger when the event is fired.
 */

/**
 * Removes a listener of the scroll event.
 * @callback removeListenerFunction
 *
 * @param {function} callback - The callback to remove.
 */

/*****************************************************
 * Constants
 *****************************************************/

/**
 * @const
 * @private
 * @type {ScrollCtx}
 */
const ScrollContext = createContext(null);

/*****************************************************
 * ScrollProvider
 *****************************************************/
export function ScrollProvider({ children }) {
	/* ---- States - Part one ----------------------- */
	const api = useRef(/** @type {Object|null} */ null);
	const listeners = useRef(/** @type {Object} */ Object.create(null));
	const scrollPos = useRef(/** @type {number|null} */ null);
	const restoredScrollPos = useRef(/** @type {number|null} */ null);

	/* ---- Functions ------------------------------- */
	/**
	 * Stores the scroll API used by `react-custom-scrollbars-2`.
	 * @function
	 *
	 * @param {Object} api - Scroll API.
	 */
	const setAPI = api => {
		api.current = api;

		if (restoredScrollPos.current) {
			api.scrollTop(restoredScrollPos.current);
			restoredScrollPos.current = null;
		}
	};

	/**
	 * Returns the scroll API used by `react-custom-scrollbars-2`.
	 * @function
	 *
	 * @return {Object|null} - Scroll API.
	 */
	const getAPI = () => api.current;

	/**
	 * Find a listener callback in the `listeners` object.
	 * @function
	 * @private
	 *
	 * @param {function} callback - The searched callback reference.
	 * @return {string|undefined} - The callback key or undefined if it's not found.
	 */
	const findListenerKey = callback => Object.keys(listeners.current).find(key => listeners.current[key] === callback);

	/** @type {addListenerFunction} */
	const addListener = useCallback(callback => {
		const key = findListenerKey(callback);

		if (!key) {
			listeners.current[uuidv4()] = callback;
		}
	}, []);

	/** @type {removeListenerFunction} */
	const removeListener = useCallback(callback => {
		const key = findListenerKey(callback);

		if (key) {
			delete listeners.current[key];
		}
	}, []);

	/**
	 * Saves the current scroll position to the session storage.
	 * @function
	 */
	const saveScrollPos = useCallback(() => {
		if (scrollPos.current !== null) {
			localStorage.setItem("scroll-position", `${scrollPos.current}`);
		}
	}, []);

	const restoreScrollPos = () => {
		const savedScrollPos = localStorage.getItem("scroll-position");

		if (savedScrollPos) {
			restoredScrollPos.current = parseInt(savedScrollPos, 10);
		}
	};

	/**
	 * Propagates the scroll event to every listener when triggered.
	 * @function
	 *
	 * @param {ScrollBox} scrollBox - Current scroll status.
	 */
	const handleScroll = useCallback(scrollBox => {
		scrollPos.current = scrollBox.scrollTop;

		for (const key in listeners.current) {
			listeners.current[key](scrollBox);
		}
	}, []);

	/* ---- Effects --------------------------------- */
	useEffect(() => {
		// Restore the scroll position
		restoreScrollPos();

		// "beforeunload" event is used to save the current scroll position.
		window.addEventListener("beforeunload", saveScrollPos);
		return () => {
			window.removeEventListener("beforeunload", saveScrollPos);
		};
	}, [saveScrollPos]);

	/* ---- States - Part two ----------------------- */
	const memoizedContext = useMemo(() => ({
		setAPI, getAPI,
		addListener, removeListener, handleScroll,
	}), [addListener, removeListener, handleScroll]);

	/* ---- Page content ---------------------------- */
	return (
		<ScrollContext.Provider value={memoizedContext}>
			{children}
		</ScrollContext.Provider>
	);
}
ScrollProvider.propTypes = { children: PropTypes.node };

/*****************************************************
 * Hook
 *****************************************************/

/**
 * Returns the `ScrollContext`.
 * @function
 *
 * @return {ScrollCtx|Object}
 */
export default function useScrollContext() {
	return useContext(ScrollContext);
}