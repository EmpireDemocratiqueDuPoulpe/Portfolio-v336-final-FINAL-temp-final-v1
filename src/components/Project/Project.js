import PropTypes from "prop-types";
import "./Project.css";

function Project({ name, href, techs, children }) {
	/* ---- Page content ---------------------------- */
	return (
		<div className="project">
			<h3 className="project-name">{name}</h3>
			{href && <a className="project-link" href={href}>Lien vers le projet</a>}

			<span className="project-desc">{children}</span>

			{techs && (
				<div className="project-techs">
					{techs.map((tech, index) => <span key={`${tech}-${index}`} className="tech">{tech}</span>)}
				</div>
			)}
		</div>
	);
}
Project.propTypes = {
	name: PropTypes.string.isRequired,
	href: PropTypes.string,
	techs: PropTypes.arrayOf(PropTypes.string),
	children: PropTypes.node
};

export default Project;