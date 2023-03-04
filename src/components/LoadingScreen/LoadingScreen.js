/**
 * @module LoadingScreen
 * @category Components
 * @subcategory LoadingScreen
 * @author Alexis L. <alexis.lecomte@supinfo.com>
 */

import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import LoadingDots from "./LoadingDots/LoadingDots.js";
import LoadingStatus from "./LoadingStatus/LoadingStatus.js";
import LoadingBar from "./LoadingBar/LoadingBar.js";
import Logo from "../../assets/images/logo.png";
import "./LoadingScreen.css";

const LOADING_CLASS = "loading";

// TODO: Animate logo
function LoadingScreen({ duration, enabled }) {
	/* ---- States ---------------------------------- */
	const [state, setState] = useState(enabled);

	/* ---- Effects --------------------------------- */
	useEffect(() => {
		if (state) document.body.classList.add(LOADING_CLASS);
		else document.body.classList.remove(LOADING_CLASS);
	}, [state]);

	useEffect(() => {
		let timeout;

		if (state) {
			timeout = setTimeout(() => {
				setState(false);
			}, duration);
		}

		return () => { if (timeout) clearTimeout(timeout); };
		// We only want this useEffect to run once.
		// eslint-disable-next-line
	}, []);

	/* ---- Page content ---------------------------- */
	return (
		<div className="loading-screen">
			<div className="loading-logo">
				<img src={Logo} alt="Logo"/>
			</div>

			<div className="loading-screen-content">
				<h2>Chargement<LoadingDots duration={duration / 2}/></h2>
				<LoadingStatus duration={duration}/>
				<LoadingBar duration={duration}/>
			</div>
		</div>
	);
}
LoadingScreen.propTypes = {
	duration: PropTypes.number,
	enabled: PropTypes.bool,
};
LoadingScreen.defaultProps = { duration: 3000 };

export default LoadingScreen;
