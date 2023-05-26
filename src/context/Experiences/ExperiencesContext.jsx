/**
 * @module Experiences
 * @category Contexts
 * @author Alexis L. <alexis.lecomte@supinfo.com>
 */

import { createContext, useContext, useState, useRef, useMemo, useCallback } from "react";
import PropTypes from "prop-types";

/*****************************************************
 * Typedefs
 *****************************************************/

/** @typedef {React.Context<null|Object>} ExperiencesCtx */

/**
 * @typedef {Object} Experience
 *
 * @property {number} id - Experience ID.
 */

/*****************************************************
 * Functions of ExperiencesProvider
 *****************************************************/

/**
 * Sets the currently selected experience.
 * @callback setFunction
 *
 * @param {number} id - The experience ID to mark as selected.
 */

/*****************************************************
 * Constants
 *****************************************************/

/**
 * @const
 * @private
 * @type {ExperiencesCtx}
 */
const ExperiencesContext = createContext(null);

/*****************************************************
 * ExperiencesProvider
 *****************************************************/
export function ExperiencesProvider({ experiences, children }) {
	/* ---- States - Part one ----------------------- */
	const exps = useRef(/** @type {Array<Experience>} */ experiences);
	const [currentExp, setCurrentExp] = useState(/** @type {Experience} */ exps.current[0]);

	/* ---- Functions ------------------------------- */
	/** @type {setFunction} */
	const set = useCallback(id => {
		const index = exps.current.findIndex(exp => exp.id === id);
		setCurrentExp((index !== -1) ? exps.current[index] : null);
	}, []);

	/* ---- States - Part two ----------------------- */
	const memoizedContext = useMemo(() => ({ current: currentExp, set }), [currentExp, set]);

	/* ---- Page content ---------------------------- */
	return (
		<ExperiencesContext.Provider value={memoizedContext}>
			{children}
		</ExperiencesContext.Provider>
	);
}
ExperiencesProvider.propTypes = {
	experiences: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
		})
	).isRequired,
	children: PropTypes.node
};

/*****************************************************
 * Hook
 *****************************************************/

/**
 * Returns the `ExperiencesContext`.
 * @function
 *
 * @return {ExperiencesCtx|Object}
 */
export default function useExperiences() {
	return useContext(ExperiencesContext);
}