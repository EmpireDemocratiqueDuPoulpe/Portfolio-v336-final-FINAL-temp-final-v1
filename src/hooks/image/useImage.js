/**
 * @module useImage
 * @category Hooks
 * @subcategory DOM
 * @author Alexis L. <alexis.lecomte@supinfo.com>
 */

import { useReducer, useEffect } from "react";

/*****************************************************
 * Constants
 *****************************************************/

/**
 * @typedef Image
 * @type {Object}
 *
 * @property {string} status - Image status.
 * @property {boolean} [isLoaded] - Provided for convenience. True when the status is `LOADED`, false otherwise.
 * @property {null|string} image - Image itself, used in a src or srcSet attribute.
 * @property {null|string} error - An error occurred during the loading.
 */

/**
 * Image states.
 * @readonly
 * @enum {string}
 */
export const states = { LOADING: "LOADING", LOADED: "LOADED" };

/**
 * Internal image states.
 * @private
 * @readonly
 * @enum {string}
 */
const internalStates = { ERROR: "ERROR" };

/**
 * Initial image state.
 * @private
 * @type {Image}
 */
const initialState = { status: states.LOADING, image: null, error: null };

/*****************************************************
 * Hook
 *****************************************************/

/**
 * Loads an image asynchronously.
 * @function
 *
 * @example
 * function Component() {
 *   const image = useImage("projects/image.png");
 *
 *   return <img src={image.isLoaded ? image.image : null} alt="Alt text"/>;
 * }
 *
 * @param {string} src - Relative path to the image file. The root folder is `src/assets/images`.
 * @return {Image} - The image state.
 */
function useImage(src) {
	/* ---- States ---------------------------------- */
	const [state, dispatch] = useReducer((state, action) => {
		switch (action.type) {
			case states.LOADING:
				return { ...state, status: states.LOADING, image: null, error: null };
			case states.LOADED:
				return { ...state, status: states.LOADED, image: action.image, error: null };
			case internalStates.ERROR:
				return { ...state, error: action.error };
			default:
				throw new Error("useImage: Invalid action.type!");
		}
	}, initialState, undefined);

	/* ---- Functions ------------------------------- */
	const setLoading = () => { dispatch({ type: states.LOADING }); };

	const setLoaded = (image) => { dispatch({ type: states.LOADED, image }); };

	const setError = (error) => { dispatch({ type: internalStates.ERROR, error }); };

	/* ---- Effects --------------------------------- */
	useEffect(() => {
		const fetch = async () => {
			setLoading();

			try {
				const response = await import(`../../assets/images/${src}`);
				setLoaded(response.default);
			} catch (err) {
				setError(err);
			}
		};

		fetch().catch();
	}, [src]);

	/* ---- Expose hook ----------------------------- */
	return { ...state, isLoaded: state.status === states.LOADED };
}

export default useImage;