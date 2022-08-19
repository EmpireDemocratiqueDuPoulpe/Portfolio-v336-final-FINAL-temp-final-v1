import useExperiences from "../../../context/Experiences/ExperiencesContext.js";
import "./ExpInfos.css";

function ExpInfos() {
	/* ---- States ---------------------------------- */
	const experiences = useExperiences();

	/* ---- Page content ---------------------------- */
	return !experiences.current ? null : (
		<div className="experience">
			<h3 className="experience-name">
				<span>{experiences.current.title}</span>

				<span className="experience-company">
					<span className="exp-company-sep">&#47;&#47;&#47;</span>
					<span className="exp-company-name">{experiences.current.company}</span>
				</span>
			</h3>
			<span className="experience-date">Du {experiences.current.startDate} au {experiences.current.endDate}</span>

			<div className="experience-details">
				{experiences.current.description.intro && <p className="experience-desc-intro">{experiences.current.description.intro}</p>}

				{experiences.current.description.bulletedList && (
					<ul className="experience-desc-bulleted-list">
						{experiences.current.description.bulletedList.map((item, index) => (
							<li key={`experience-${experiences.id}-list_item-${index}`}>{item}</li>
						))}
					</ul>
				)}

				{experiences.current.description.outro && <p className="experience-desc-outro">{experiences.current.description.outro}</p>}
			</div>

			{experiences.current.feedback && (
				<div className="experience-feedback">
					<h4 className="ef-title">{experiences.current.feedback.title}</h4>
					<p className="ef-content">{experiences.current.feedback.content}</p>
				</div>
			)}
		</div>
	);
}

export default ExpInfos;