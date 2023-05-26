/**
 * @module RevealScroll
 * @category Components
 * @author Alexis L. <alexis.lecomte@supinfo.com>
 */

import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import useScrollContext from "../../context/Scroll/ScrollContext.jsx";
import useClassName from "../../hooks/className/useClassName.js";
import "./RevealScroll.css";

function RevealScroll({ children }) {
	/* ---- State ----------------------------------- */
	const containerRef = useRef(/** @type {HTMLElement|null} */ null);
	const [visible, setVisible] = useState(/** @type {boolean} */ false);
	const scroll = useScrollContext();
	const classes = useClassName(hook => {
		hook.set("reveal-scroll");
		hook.setIfElse(visible, "visible", "hidden");
	}, [visible]);

	/* ---- Effects --------------------------------- */
	useEffect(() => {
		const showElement = scrollBox => {
			if (containerRef.current) {
				if ((containerRef.current.offsetTop - (containerRef.current.offsetHeight / 1.25)) <= scrollBox.scrollTop) {
					setVisible(true);
				}
			}
		};

		scroll.addListener(showElement);
		return () => { scroll.removeListener(showElement); };
	}, [scroll]);

	/* ---- Page content ---------------------------- */
	return (
		<div ref={containerRef} className={classes}>
			{children}
		</div>
	);
}
RevealScroll.propTypes = {
	children: PropTypes.node
};

export default RevealScroll;