import useExperiences from "../../../context/Experiences/ExperiencesContext.js";
import "./ExpInfos.css";

function ExpInfos() {
	/* ---- States ---------------------------------- */
	const experiences = useExperiences();

	/* ---- Page content ---------------------------- */
	return !experiences.current ? null : (
		<div className="experience">
			<h3 className="experience-name">{experiences.current.title} <span className="experience-company">{experiences.current.company}</span></h3>
			<span className="experience-date">Du {experiences.current.startDate} au {experiences.current.endDate}</span>

			<div className="experience-details">
				<img className="experience-illustration" src={experiences.current.illustrations[0]} alt="Illustration du projet"/>
				<p className="experience-description">{experiences.current.description}</p>
			</div>

			<div className="experience-feedback">
				<h4 className="ef-title">{experiences.current.feedback.title}</h4>
				<p className="ef-content">{experiences.current.feedback.content}</p>
			</div>
		</div>
	);
}

export default ExpInfos;