/**
 * @module DocumentTitle
 * @category Contexts
 * @author Alexis L. <alexis.lecomte@supinfo.com>
 */

import { createContext, useContext, useRef, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { Content } from "../../config/config.js";

/*****************************************************
 * Typedefs
 *****************************************************/

/** @typedef {React.Context<null|Object>} DocTitleCtx */

/**
 * @typedef {Object} TitleProperties
 *
 * @property {null|string} [prefix] - Prefix of the document title.
 * @property {null|string} [suffix] - Suffix of the document title.
 * @property {null|string} [override] - String that override the document title.
 */

/*****************************************************
 * Functions of DocumentTitleProvider
 *****************************************************/

/**
 * Updates the document title with the new properties.
 * @callback updateTitleFunction
 * @private
 */

/**
 * Sets the prefix of the document title.
 * @callback setPrefixFunction
 *
 * @param {string} prefix - The new prefix.
 */

/**
 * Sets the suffix of the document title.
 * @callback setSuffixFunction
 *
 * @param {string} suffix - The new suffix.
 */

/**
 * Overrides the document title with the specified string.
 * @callback overrideFunction
 *
 * @param {string} title - The string that will override the document title.
 */

/**
 * Removes the override string and renders the document title as usual.
 * @callback disableOverrideFunction
 */

/*****************************************************
 * Constants
 *****************************************************/

/**
 * @const
 * @private
 * @type {DocTitleCtx}
 */
const DocumentTitleContext = createContext(null);

/*****************************************************
 * DocumentTitleProvider
 *****************************************************/
export function DocumentTitleProvider({ children }) {
	/* ---- States ---------------------------------- */
	const titleRef = useRef(/** @type {TitleProperties} */ { prefix: null, suffix: null, override: null });
	
	/* ---- Functions ------------------------------- */
	/** @type {updateTitleFunction} */
	const updateTitle = useCallback(() => { document.title = buildTitle(); }, []);

	/**
	 * Returns the current prefix of the document title.
	 * @function
	 *
	 * @return {null|string}
	 */
	const getPrefix = () => titleRef.current.prefix;

	/** @type {setPrefixFunction} */
	const setPrefix = useCallback(prefix => {
		titleRef.current.prefix = prefix;
		updateTitle();
	}, [updateTitle]);

	/**
	 * Returns the current suffix of the document title.
	 * @function
	 *
	 * @return {null|string}
	 */
	const getSuffix = () => titleRef.current.suffix;

	/** @type {setSuffixFunction} */
	const setSuffix = useCallback(suffix => {
		titleRef.current.suffix = suffix;
		updateTitle();
	}, [updateTitle]);

	/** @type {overrideFunction} */
	const override = useCallback(title => {
		titleRef.current.override = title;
		updateTitle();
	}, [updateTitle]);

	/** @type {disableOverrideFunction} */
	const disableOverride = useCallback(() => {
		// noinspection JSValidateTypes
		titleRef.current.override = null;
		updateTitle();
	}, [updateTitle]);

	/**
	 * Builds the title and returns it.
	 * @function
	 *
	 * @return {string} - The full title.
	 */
	const buildTitle = () => {
		if (titleRef.current.override) return `${titleRef.current.override}`;
		else {
			let title = Content.title;
			
			if (titleRef.current.prefix) title = `${titleRef.current.prefix} | ${title}`;
			if (titleRef.current.suffix) title = `${title} | ${titleRef.current.suffix}`;
			
			return title;
		}
	};
	
	/* ---- States - Part two ----------------------- */
	const memoizedContext = useMemo(() => ({
		getPrefix, setPrefix,
		getSuffix, setSuffix,
		override, disableOverride,
		getFullTitle: buildTitle
	}), [setPrefix, setSuffix, override, disableOverride]);

	/* ---- Page content ---------------------------- */
	return (
		<DocumentTitleContext.Provider value={memoizedContext}>
			{children}
		</DocumentTitleContext.Provider>
	);
}
DocumentTitleProvider.propTypes = { children: PropTypes.node };

/*****************************************************
 * Hook
 *****************************************************/

/**
 * Returns the `DocumentTitleContext`.
 * @function
 *
 * @return {DocTitleCtx|Object}
 */
export default function useDocumentTitleContext() {
	return useContext(DocumentTitleContext);
}