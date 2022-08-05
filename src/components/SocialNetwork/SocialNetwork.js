import PropTypes from "prop-types";
import LinkedInLogo from "../../assets/images/icons/linked-in/logo-stroke.svg";
import "./SocialNetwork.css";

function SocialNetwork({ href, children }) {
	/* ---- Page content ---------------------------- */
	return (
		<a className="social-network" href={href}>
			{children}
		</a>
	);
}
SocialNetwork.propTypes = {
	href: PropTypes.string,
	children: PropTypes.node.isRequired
};

function LinkedIn() {
	/* ---- Page content ---------------------------- */
	return (
		<SocialNetwork>
			<object type="image/svg+xml" data={LinkedInLogo}>
				Logo de Linked-In
			</object>
		</SocialNetwork>
	);
}

export default { LinkedIn };
