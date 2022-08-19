import PropTypes from "prop-types";
import { ExperiencesProvider } from "../../context/Experiences/ExperiencesContext.js";
import ExpButton from "./ExpButton/ExpButton.js";
import ExpInfos from "./ExpInfos/ExpInfos.js";
import "./Experiences.css";

function Experiences({ experiences }) {
	/* ---- Page content ---------------------------- */
	return (
		<div className="experiences-container">
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
		</div>
	);
}
Experiences.propTypes = {
	experiences: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Experiences;