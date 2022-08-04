import PropTypes from "prop-types";
import "./AppNavigation.css";

function AppNavigation({ children }) {
	/* ---- Page content ---------------------------- */
	return (
		<nav className="App-navigation">
			logo

			<div className="navigation-links">
				{children}
			</div>
		</nav>
	);
}
AppNavigation.propTypes = {
	children: PropTypes.node
};

export default AppNavigation;
export { default as NavigationLink } from "./NavigationLink/NavigationLink.js";
