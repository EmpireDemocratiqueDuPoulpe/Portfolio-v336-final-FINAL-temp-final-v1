/**
 * @module AppNavigation
 * @category Components
 * @author Alexis L. <alexis.lecomte@supinfo.com>
 */

import { useState } from "react";
import PropTypes from "prop-types";
import useWindowSize from "../../hooks/windowSize/useWindowSize.js";
import useClassName from "../../hooks/className/useClassName.js";
import { eventOnElement } from "../../global/Functions.js";
import Logo from "../../assets/images/logo.png";
import "./AppNavigation.css";

function AppNavigation({ children }) {
	/* ---- States ---------------------------------- */
	const { width, height, isPortrait, isLandscape } = useWindowSize();
	const classes = useClassName(hook => {
		hook.set("navigation-links");
		hook.setIf((isPortrait && (width <= 480) || (isLandscape && (height <= 480))), "phone-mode");
	}, [isPortrait, width, isLandscape, height]);
	const [linksMenuOpen, setLinksMenuOpen] = useState(false);
	const linksMenuClasses = useClassName(hook => {
		hook.set("navigation-links-btn");
		hook.setIfElse(linksMenuOpen, "open", "close");
	}, [linksMenuOpen]);

	/* ---- Functions ------------------------------- */
	const openLinksMenu = () => { setLinksMenuOpen(true); };
	const closeLinksMenu = () => { setLinksMenuOpen(false); };

	/* ---- Page content ---------------------------- */
	return (
		<nav className="App-navigation">
			<div className="App-logo">
				<img src={Logo} alt="Logo"/>
			</div>

			<div className={classes}>
				<div className="navigation-links-content">
					{children}
				</div>

				<div className={linksMenuClasses} {...eventOnElement(() => linksMenuOpen ? null : openLinksMenu())} aria-label="Fermer le menu de navigation">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
						<path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/>
					</svg>

					<div className="nl-btn-content" data-is-menu="true">
						<button
							className="nl-btn-close-btn"
							type="button"
							aria-label="Fermer le menu de navigation"
							title="Fermer le menu de navigation"
							onClick={closeLinksMenu}
							disabled={!linksMenuOpen}>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
								<path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"/>
							</svg>
						</button>

						{children}
					</div>
				</div>
			</div>
		</nav>
	);
}
AppNavigation.propTypes = {
	children: PropTypes.node
};

export default AppNavigation;
export { default as NavigationLink } from "./NavigationLink/NavigationLink.js";
