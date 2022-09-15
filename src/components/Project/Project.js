/**
 * @module Project
 * @category Components
 * @author Alexis L. <alexis.lecomte@supinfo.com>
 */

import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import "./Project.css";

function Project({ name, href, techs, img, windowTitle, children }) {
	/* ---- Page content ---------------------------- */
	return (
		<div className="project" data-window-title={windowTitle ?? name}>
			<div className="project-img">
				<img src={img} alt="Une capture d'écran du projet"/>
			</div>

			<div className="project-infos">
				<h3 className="project-name">{name}</h3>

				{href && (
					<a className="link project-link" href={href}>
						<span>Visiter le lien</span>
						<FontAwesomeIcon className="project-link-icon" icon={solid("arrow-up-right-from-square")}/>
					</a>
				)}

				<span className="project-desc">{children}</span>

				{techs && (
					<div className="project-techs">
						{techs.map((tech, index) => <span key={`${tech}-${index}`} className="tech">{tech}</span>)}
					</div>
				)}
			</div>
		</div>
	);
}
Project.propTypes = {
	name: PropTypes.string.isRequired,
	href: PropTypes.string,
	techs: PropTypes.arrayOf(PropTypes.string),
	img: PropTypes.string,
	windowTitle: PropTypes.string,
	children: PropTypes.node
};

export default Project;