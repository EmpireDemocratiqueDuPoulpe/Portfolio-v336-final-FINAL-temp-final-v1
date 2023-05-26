/**
 * @module LoadingStatus
 * @category Components
 * @subcategory LoadingScreen
 * @author Alexis L. <alexis.lecomte@supinfo.com>
 */

import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Content } from "../../../config/config.js";
import "./LoadingStatus.css";

function LoadingStatus({ duration, maxLines }) {
	/* ---- States ---------------------------------- */
	const [children, setChildren] = useState([]);

	/* ---- Effects --------------------------------- */
	useEffect(() => {
		const interval = setInterval(() => {
			setChildren(prevState => {
				const index = prevState.length;

				if (Content.loadingStatus.length > index) {
					return [...prevState, (
						<p key={`loading-status-line-${index}`} className="loading-status-line">{Content.loadingStatus[index]}</p>
					)];
				} else return prevState;
			});
		}, (duration / Content.loadingStatus.length));

		return () => { clearInterval(interval); };
	}, [duration]);

	/* ---- Page content ---------------------------- */
	return (
		<div className="loading-status" style={{ height: `${(Math.min(maxLines, Content.loadingStatus.length)) * 1.2}em` }}>
			{children}
		</div>
	);
}
LoadingStatus.propTypes = {
	duration: PropTypes.number.isRequired,
	maxLines: PropTypes.number
};
LoadingStatus.defaultProps = { maxLines: 4 };

export default LoadingStatus;