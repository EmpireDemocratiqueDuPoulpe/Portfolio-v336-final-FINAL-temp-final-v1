/**
 * @module Experiences
 * @category Components
 * @author Alexis L. <alexis.lecomte@supinfo.com>
 */

import PropTypes from "prop-types";
import { ExperiencesProvider } from "../../context/Experiences/ExperiencesContext.jsx";
import usePrint from "../../hooks/print/usePrint.js";
import ExpButton from "./ExpButton/ExpButton.jsx";
import ExpInfos from "./ExpInfos/ExpInfos.jsx";
import "./Experiences.css";

function Experiences({ experiences }) {
	/* ---- States ---------------------------------- */
	const isPrinting = usePrint();

	/* ---- Page content ---------------------------- */
	return (
		<div className="experiences-container">
			{!isPrinting ? (
				<ExperiencesProvider experiences={experiences}>
					<div className="experience-selector">
						{experiences.sort((expA, expB) => expB.id - expA.id).map(experience => (
							<ExpButton key={`${experience.title}-${experience.id}`} experience={experience}/>
						))}
					</div>

					<div className="experience-infos">
						<ExpInfos/>
					</div>
				</ExperiencesProvider>
			) : (experiences.sort((expA, expB) => expB.id - expA.id).map(experience => (
				<ExpInfos key={`${experience.title}-${experience.id}`} manualExperience={experience}/>
			)))}
		</div>
	);
}
Experiences.propTypes = {
	experiences: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Experiences;