/**
 * @module LoadingBar
 * @category Components
 * @subcategory LoadingScreen
 * @author Alexis L. <alexis.lecomte@supinfo.com>
 */

import PropTypes from "prop-types";
import "./LoadingBar.css";

function LoadingBar({ duration }) {
	/* ---- Page content ---------------------------- */
	return <div className="loading-bar" style={{ animationDuration: `${duration}ms` }}/>;
}
LoadingBar.propTypes = {
	duration: PropTypes.number.isRequired
};

export default LoadingBar;