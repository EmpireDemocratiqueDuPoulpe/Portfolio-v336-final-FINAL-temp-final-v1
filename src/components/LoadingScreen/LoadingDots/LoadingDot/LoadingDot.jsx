/**
 * @module LoadingDot
 * @category Components
 * @subcategory LoadingScreen
 * @author Alexis L. <alexis.lecomte@supinfo.com>
 */

import PropTypes from "prop-types";
import "./LoadingDot.css";

function LoadingDot({ duration, delay }) {
	/* ---- Page content ---------------------------- */
	return <span className="loading-dot" style={{ animationDuration: `${duration}ms`, animationDelay: `${delay}ms` }}>.</span>;
}
LoadingDot.propTypes = {
	duration: PropTypes.number.isRequired,
	delay: PropTypes.number.isRequired,
};

export default LoadingDot;