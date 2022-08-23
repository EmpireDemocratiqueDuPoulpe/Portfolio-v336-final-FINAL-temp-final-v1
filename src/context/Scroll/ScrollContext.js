import { createContext, useContext, useRef, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";

/*****************************************************
 * Constants
 *****************************************************/

const ScrollContext = createContext(null);

/*****************************************************
 * ScrollProvider
 *****************************************************/
export function ScrollProvider({ children }) {
	/* ---- States - Part one ----------------------- */
	const api = useRef(null);
	const listeners = useRef(Object.create(null));

	/* ---- Functions ------------------------------- */
	const setAPI = api => { api.current = api; };
	const getAPI = () => api.current;

	const findListenerKey = callback => Object.keys(listeners.current).find(key => listeners.current[key] === callback);

	const addListener = useCallback(callback => {
		const key = findListenerKey(callback);

		if (!key) {
			listeners.current[uuidv4()] = callback;
		}
	}, []);

	const removeListener = useCallback(callback => {
		const key = findListenerKey(callback);

		if (key) {
			delete listeners.current[key];
		}
	}, []);

	const handleScroll = scrollBox => {
		for (const key in listeners.current) {
			listeners.current[key](scrollBox);
		}
	};

	/* ---- States - Part two ----------------------- */
	const memoizedContext = useMemo(() => ({
		setAPI, getAPI,
		addListener, removeListener, handleScroll,
	}), [addListener, removeListener]);

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

export default function useScrollContext() {
	return useContext(ScrollContext);
}