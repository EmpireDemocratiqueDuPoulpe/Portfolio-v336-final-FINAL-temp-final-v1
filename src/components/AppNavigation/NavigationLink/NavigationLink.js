import PropTypes from "prop-types";
import "./NavigationLink.css";

function NavigationLink({ href, children }) {
	/* ---- Page content ---------------------------- */
	return (
		<a className="navigation-link" href={href}>
			{children}
		</a>
	);
}
NavigationLink.propTypes = {
	href: PropTypes.string,
	children: PropTypes.node
};
NavigationLink.defaultProps = { href: "#" };

export default NavigationLink;
