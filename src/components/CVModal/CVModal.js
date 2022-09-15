/**
 * @module CVModal
 * @category Components
 * @author Alexis L. <alexis.lecomte@supinfo.com>
 */

import useCV from "../../context/CV/CVContext.js";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack5.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { eventOnElement } from "../../global/Functions.js";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "./CVModal.css";

function CVModal() {
	/* ---- States ---------------------------------- */
	const cv = useCV();

	/* ---- Page content ---------------------------- */
	return (
		<div className={`cv-modal ${cv.state}`}>
			<div className="cv-modal-background" style={{ transitionDuration: cv.animation.getDurationStr() }} {...eventOnElement(cv.hide)}/>

			<div className="cv-modal-box" style={{ transitionDuration: cv.animation.getDurationStr() }}>
				<div className="close-btn" {...eventOnElement(cv.hide)}>
					<FontAwesomeIcon className="close-btn-icon" icon={solid("xmark")}/>
				</div>

				<div className="modal-content">
					<Document className="pdf-document" file={cv.file} onLoadSuccess={cv.events.onLoadSuccess}>
						<Page className="pdf-page" width={1000} pageNumber={cv.pages.current}/>
					</Document>
				</div>

				<span className="page-number">Page {cv.pages.current} sur {cv.pages.total}</span>

				{/* `process.env.PUBLIC_URL` is accessible, but ESLint thinks it is not. */}
				{/* eslint-disable-next-line no-undef */}
				<a className="cv-download" href={`${process.env.PUBLIC_URL}/documents/cv.pdf`} download="CV - Alexis Lecomte.pdf">
					<FontAwesomeIcon className="cv-download-icon" icon={solid("download")}/>
					<span>T&eacute;l&eacute;charger</span>
				</a>
			</div>
		</div>
	);
}

export default CVModal;