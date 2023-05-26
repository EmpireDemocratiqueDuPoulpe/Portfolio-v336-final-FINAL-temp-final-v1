/**
 * @module LoadingDots
 * @category Components
 * @subcategory LoadingScreen
 * @author Alexis L. <alexis.lecomte@supinfo.com>
 */

import PropTypes from "prop-types";
import LoadingDot from "./LoadingDot/LoadingDot.jsx";

function LoadingDots({ duration, count }) {
	/* ---- Page content ---------------------------- */
	return (
		<>
			{[...Array(count)].map((_, index) => (
				<LoadingDot key={`loading-dots-dot-${index}`} duration={duration} delay={(duration / 2) / (count - index)}/>
			))}
		</>
	);
}
LoadingDots.propTypes = {
	duration: PropTypes.number.isRequired,
	count: PropTypes.number,
};
LoadingDots.defaultProps = { count: 3 };

export default LoadingDots;