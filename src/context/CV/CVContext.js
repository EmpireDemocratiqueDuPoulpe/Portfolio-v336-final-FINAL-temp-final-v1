import { createContext, useContext, useState, useRef, useEffect, useMemo, useCallback } from "react";
import PropTypes from "prop-types";

/*****************************************************
 * Constants
 *****************************************************/

const CVContext = createContext(null);

export const states = { HIDDEN: "hidden", HIDING: "hiding", SHOWN: "shown" };

const NO_SCROLL_CLASS = "no-scroll";

/*****************************************************
 * CVProvider
 *****************************************************/
export function CVProvider({ children }) {
	/* ---- States - Part one ----------------------- */
	const file = "./documents/cv.pdf";
	const [state, setState] = useState(states.HIDDEN);
	const [animDurationMs, setAnimDurationMs] = useState(250);
	const animTimeout = useRef(0);
	const [pagesCount, setPagesCount] = useState(null);
	const [currentPage] = useState(1);
	
	/* ---- Effects --------------------------------- */
	useEffect(() => {
		return () => {
			clearTimeout(animTimeout.current);
			document.body.parentElement.classList.remove(NO_SCROLL_CLASS);
		};
	}, []);

	/* ---- Functions ------------------------------- */
	const show = () => {
		setState(states.SHOWN);
		document.body.parentElement.classList.add(NO_SCROLL_CLASS);
	};

	const hide = useCallback(() => {
		setState(states.HIDING);

		clearTimeout(animTimeout.current);
		animTimeout.current = setTimeout(() => {
			setState(states.HIDDEN);
			document.body.parentElement.classList.remove(NO_SCROLL_CLASS);
		}, animDurationMs);
	}, [animDurationMs]);

	const toggle = useCallback(() => {
		if (state === states.HIDDEN) {
			show();
		} else if (state === states.SHOWN) {
			hide();
		}
	}, [state, hide]);

	const getDurationStr = useCallback(() => `${animDurationMs}ms`, [animDurationMs]);
	const changeAnimationDuration = durationMs => { setAnimDurationMs(durationMs); };

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

export default function useCV() {
	return useContext(CVContext);
}