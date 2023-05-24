/**
 * @module ExpInfos
 * @category Components
 * @subcategory Experiences
 * @author Alexis L. <alexis.lecomte@supinfo.com>
 */

import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import useExperiences from "../../../context/Experiences/ExperiencesContext.js";
import "./ExpInfos.css";

function ExpInfos({ manualExperience }) {
	/* ---- States ---------------------------------- */
	const experiences = useExperiences();
	const [selectedExperience, setSelectedExperience] = useState(null);

	/* ---- Effects --------------------------------- */
	useEffect(() => {
		if (experiences && experiences.current) {
			setSelectedExperience(experiences.current);
		} else if (manualExperience) {
			setSelectedExperience(manualExperience);
		}
	}, [experiences, manualExperience]);
	
	/* ---- Page content ---------------------------- */
	return !selectedExperience ? null : (
		<div className="experience">
			<h3 className="experience-name">
				<span>{selectedExperience.title}</span>

				<span className="experience-company">
					<span className="exp-company-sep">&#47;&#47;&#47;</span>
					<span className="exp-company-name">{selectedExperience.company}</span>
				</span>
			</h3>
			<span className="experience-date">Du {selectedExperience.startDate} {selectedExperience.endDate ? (<>au {selectedExperience.endDate}</>) : (<>&agrave; aujourd&apos;hui</>)}</span>

			<div className="experience-details">
				{selectedExperience.description.intro && <p className="experience-desc-intro">{selectedExperience.description.intro}</p>}

				{selectedExperience.description.bulletedList && (
					<ul className="experience-desc-bulleted-list">
						{selectedExperience.description.bulletedList.map((item, index) => (
							<li key={`experience-${selectedExperience.id}-list_item-${index}`}>{item}</li>
						))}
					</ul>
				)}

				{selectedExperience.description.outro && <p className="experience-desc-outro">{selectedExperience.description.outro}</p>}
			</div>

			{selectedExperience.feedback && (
				<div className="experience-feedback">
					<h4 className="ef-title">{selectedExperience.feedback.title}</h4>
					<p className="ef-content">{selectedExperience.feedback.content}</p>
				</div>
			)}
		</div>
	);
}
ExpInfos.propTypes = {
	manualExperience: PropTypes.shape({
		id: PropTypes.number.isRequired,
		title: PropTypes.string.isRequired,
		company: PropTypes.string.isRequired,
		startDate: PropTypes.string.isRequired,
		endDate: PropTypes.string,
		description: PropTypes.shape({
			intro: PropTypes.string,
			bulletedList: PropTypes.arrayOf(PropTypes.string),
			outro: PropTypes.string,
		}).isRequired,
		feedback: PropTypes.string
	})
};

export default ExpInfos;