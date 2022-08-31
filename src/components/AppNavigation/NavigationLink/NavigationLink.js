/**
 * @module NavigationLink
 * @category Components
 * @subcategory AppNavigation
 * @author Alexis L. <alexis.lecomte@supinfo.com>
 */

import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import useDocumentTitleContext from "../../../context/DocumentTitle/DocumentTitleContext.js";
import useScrollContext from "../../../context/Scroll/ScrollContext.js";
import useClassName from "../../../hooks/className/useClassName.js";
import "./NavigationLink.css";

/*****************************************************
 * Functions of NavigationLink
 *****************************************************/

/**
 * Updates the `inSection` state when the user scroll.
 * @callback handleScrollFunction
 * @private
 *
 * @param {{ scrollTop: number }} scrollBox - Current scroll status.
 *
 * @return {void}
 */

/*****************************************************
 * Functions
 *****************************************************/

/**
 * Checks if the section element in currently on the user screen.
 * @function
 * @private
 *
 * @param {number} scrollY - Scroll current position on the `y` axis.
 * @param {HTMLElement|*} section - The section to check.
 *
 * @return {boolean} - True if the section is currently on the user's screen.
 */
function isInSection(scrollY, section) {
	const sectionHeight = section.offsetHeight;
	const sectionTop = section.offsetTop - (sectionHeight / 2);

	return (scrollY >= sectionTop) && (scrollY < (sectionTop + sectionHeight));
}

/*****************************************************
 * NavigationLink
 *****************************************************/

function NavigationLink({ href, sectionRef, children }) {
	/* ---- States ---------------------------------- */
	const docTitle = useDocumentTitleContext();
	const scroll = useScrollContext();
	const [inSection, setInSection] = useState(/** @type {boolean} */ false);
	const classes = useClassName(hook => {
		hook.set("link");
		hook.set("navigation-link");
		hook.set("title-font");
		hook.setIf(inSection, "current");
	}, [inSection]);

	/* ---- Functions ------------------------------- */
	/** @type {handleScrollFunction} */
	const handleScroll = useCallback(scrollBox => {
		const newValue = isInSection(scrollBox.scrollTop, sectionRef.current);

		if (inSection !== newValue) {
			setInSection(newValue);

			if (newValue && (typeof children === "string")) {
				docTitle.setPrefix(children);
			}
		}
	}, [sectionRef, inSection, docTitle, children]);

	/* ---- Effects --------------------------------- */
	useEffect(() => {
		// Run this function once before the scroll event to update navigation links on DOM load.
		if (scroll.getAPI()) {
			handleScroll({ scrollTop: scroll.getAPI().getScrollTop() });
		}

		scroll.addListener(handleScroll);
		return () => scroll.removeListener(handleScroll);
	}, [scroll, handleScroll, href]);

	/* ---- Page content ---------------------------- */
	return (
		<a className={classes} href={href}>
			{children}
		</a>
	);
}
NavigationLink.propTypes = {
	href: PropTypes.string,
	sectionRef: PropTypes.shape({
		current: PropTypes.object
	}),
	children: PropTypes.node
};
NavigationLink.defaultProps = { href: "#" };

export default NavigationLink;
