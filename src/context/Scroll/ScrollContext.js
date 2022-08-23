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
	const listeners = useRef(Object.create(null));

	/* ---- Functions ------------------------------- */
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
	const memoizedContext = useMemo(() => ({ addListener, removeListener, handleScroll }), [addListener, removeListener]);

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