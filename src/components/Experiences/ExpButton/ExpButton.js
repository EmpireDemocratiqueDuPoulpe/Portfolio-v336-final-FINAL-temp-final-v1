import PropTypes from "prop-types";
import useExperiences from "../../../context/Experiences/ExperiencesContext.js";
import { eventOnElement } from "../../../global/Functions.js";
import "./ExpButton.css";

function ExpButton({ experience }) {
	/* ---- States ---------------------------------- */
	const experiences = useExperiences();

	/* ---- Functions ------------------------------- */
	const handleClick = () => {
		experiences.set(experience.id);
	};

	/* ---- Page content ---------------------------- */
	return (
		<div className={`experience-button${experiences.current.id === experience.id ? " selected" : ""}`} {...eventOnElement(handleClick)}>
			<h4 className="exp-btn-title">{experience.title}</h4>
			<span className="exp-btn-company">{experience.company}</span>
		</div>
	);
}
ExpButton.propTypes = {
	experience: PropTypes.shape({
		id: PropTypes.number.isRequired,
		title: PropTypes.string.isRequired,
		company: PropTypes.string.isRequired,
	}).isRequired
};

export default ExpButton;