/**
 * @module LoadingScreen
 * @category Components
 * @subcategory LoadingScreen
 * @author Alexis L. <alexis.lecomte@supinfo.com>
 */

import PropTypes from "prop-types";
import LoadingDots from "./LoadingDots/LoadingDots.js";
import LoadingStatus from "./LoadingStatus/LoadingStatus.js";
import LoadingBar from "./LoadingBar/LoadingBar.js";
import "./LoadingScreen.css";

function LoadingScreen({ duration }) {
	/* ---- Page content ---------------------------- */
	return (
		<div className="loading-screen">
			<div className="loading-screen-content">
				<h2>Chargement<LoadingDots duration={duration / 2}/></h2>
				<LoadingStatus duration={duration}/>
				<LoadingBar duration={duration}/>
			</div>
		</div>
	);
}
LoadingScreen.propTypes = {
	duration: PropTypes.number
};
LoadingScreen.defaultProps = { duration: 3000 };
LoadingScreen.defaultProps = { duration: 3000 };

export default LoadingScreen;