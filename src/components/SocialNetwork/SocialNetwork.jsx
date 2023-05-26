/**
 * @module SocialNetwork
 * @category Components
 * @author Alexis L. <alexis.lecomte@supinfo.com>
 */

import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { brands } from "@fortawesome/fontawesome-svg-core/import.macro";
import "./SocialNetwork.css";

/*****************************************************
 * Constants
 *****************************************************/

const commonPropTypes = { href: PropTypes.string };

/*****************************************************
 * Base element
 *****************************************************/

function SocialNetwork({ href, children }) {
	/* ---- Page content ---------------------------- */
	return (
		<a className="social-network" href={href} aria-label="Lien vers un réseau social externe">
			{children}
		</a>
	);
}
SocialNetwork.propTypes = {
	...commonPropTypes,
	children: PropTypes.node.isRequired
};

/*****************************************************
 * Social network icons
 *****************************************************/

function LinkedIn({ href }) {
	/* ---- Page content ---------------------------- */
	return (
		<SocialNetwork href={href}>
			<FontAwesomeIcon className="social-network-icon" icon={brands("linkedin")}/>
		</SocialNetwork>
	);
}
LinkedIn.propTypes = commonPropTypes;

function GitHub({ href }) {
	/* ---- Page content ---------------------------- */
	return (
		<SocialNetwork href={href}>
			<FontAwesomeIcon className="social-network-icon" icon={brands("github-square")}/>
		</SocialNetwork>
	);
}
GitHub.propTypes = commonPropTypes;

// These properties are used, really.
// noinspection JSUnusedGlobalSymbols
export default { LinkedIn, GitHub };
