/**
 * @module NavigationLink
 * @category Components
 * @subcategory AppNavigation
 * @author Alexis L. <alexis.lecomte@supinfo.com>
 */

import { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import useNavigationContext from "../../../context/Navigation/NavigationContext.jsx";
import "./NavigationLink.css";

/*****************************************************
 * NavigationLink
 *****************************************************/

function NavigationLink({ href, sectionRef, children }) {
	/* ---- States ---------------------------------- */
	const navigation = useNavigationContext();
	const linkRef = useRef();

	/* ---- Effects --------------------------------- */
	useEffect(() => {
		navigation.addLink(linkRef, sectionRef);
		return () => { navigation.removeLink(linkRef); };
	}, [navigation, sectionRef]);

	/* ---- Page content ---------------------------- */
	return (
		<a ref={linkRef} className="link navigation-link title-font" href={href}>
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
