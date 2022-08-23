import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import useScrollContext from "../../../context/Scroll/ScrollContext.js";
import useClassName from "../../../hooks/className/useClassName.js";
import "./NavigationLink.css";

function isInSection(scrollY, section) {
	const sectionHeight = section.offsetHeight;
	const sectionTop = section.offsetTop - (sectionHeight / 2);

	return (scrollY >= sectionTop) && (scrollY < (sectionTop + sectionHeight));
}

function NavigationLink({ href, sectionRef, children }) {
	/* ---- States ---------------------------------- */
	const scroll = useScrollContext();
	const [inSection, setInSection] = useState(false);
	const classes = useClassName(hook => {
		hook.set("link");
		hook.set("navigation-link");
		hook.setIf(inSection, "current");
	}, [inSection]);

	/* ---- Functions ------------------------------- */
	const handleScroll = useCallback(scrollBox => {
		const newValue = isInSection(scrollBox.scrollTop, sectionRef.current);

		if (inSection !== newValue) {
			setInSection(newValue);
		}
	}, [sectionRef, inSection]);

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
