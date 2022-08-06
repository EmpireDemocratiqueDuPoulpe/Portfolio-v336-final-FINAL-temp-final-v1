import { createContext, useContext, useState, useRef, useMemo, useCallback } from "react";
import PropTypes from "prop-types";

/*****************************************************
 * Constants
 *****************************************************/

const ExperiencesContext = createContext(null);

/*****************************************************
 * ExperiencesProvider
 *****************************************************/
export function ExperiencesProvider({ experiences, children }) {
	/* ---- States - Part one ----------------------- */
	const exps = useRef(experiences);
	const [currentExp, setCurrentExp] = useState(exps.current[0]);

	/* ---- Functions ------------------------------- */
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

export default function useExperiences() {
	return useContext(ExperiencesContext);
}