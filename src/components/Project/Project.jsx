/**
 * @module Project
 * @category Components
 * @author Alexis L. <alexis.lecomte@supinfo.com>
 */

import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import WebP from "../WebP/WebP.jsx";
import "./Project.css";

function Project({ name, href, techs, img, windowTitle, schoolProject, children }) {
	/* ---- Page content ---------------------------- */
	return (
		<div className="project" data-window-title={windowTitle ?? name}>
			<div className="project-img">
				{img && <WebP src={img.src} fallback={img.fallback} alt={`Une capture d'écran du projet "${name}".`}/>}
			</div>

			<div className="project-infos">
				{href && (
					<a className="link project-link" href={href}>
						<span>Visiter le lien</span>
						<FontAwesomeIcon className="project-link-icon" icon={solid("arrow-up-right-from-square")}/>
					</a>
				)}

				<div className="project-infos-content">
					<h3 className="project-name">{name}</h3>
					<span className="project-source">{schoolProject && <>Projet scolaire</>}</span>

					<span className="project-desc">{children}</span>

					{techs && (
						<div className="project-techs">
							{techs.map((tech, index) => <span key={`${tech}-${index}`} className="tech">{tech}</span>)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
Project.propTypes = {
	name: PropTypes.string.isRequired,
	href: PropTypes.string,
	techs: PropTypes.arrayOf(PropTypes.string),
	img: PropTypes.shape({
		src: PropTypes.string.isRequired,
		fallback: PropTypes.string.isRequired,
	}),
	windowTitle: PropTypes.string,
	schoolProject: PropTypes.bool,
	children: PropTypes.node
};

export default Project;