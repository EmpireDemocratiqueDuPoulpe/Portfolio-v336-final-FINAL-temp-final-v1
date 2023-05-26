/**
 * @module SectionArt
 * @category Components
 * @author Alexis L. <alexis.lecomte@supinfo.com>
 */

import PropTypes from "prop-types";
import useClassName from "../../hooks/className/useClassName.js";
import "./SectionArt.css";

function SectionArt({ scale, translateX, translateY, mobile, tablet, printer, children }) {
	/* ---- States ---------------------------------- */
	const classes = useClassName(hook => {
		hook.set("section-art");
		hook.setIf(!mobile, "no-mobile");
		hook.setIf(!tablet, "no-tablet");
		hook.setIf(!printer, "no-printer");
	}, [mobile, tablet, printer]);

	/* ---- Page content ---------------------------- */
	return (
		<div className="section-art-anchor">
			<div className={classes} style={{ scale: scale, transform: `translate(${translateX}, ${translateY})` }}>
				{children}
			</div>
		</div>
	);
}
SectionArt.propTypes = {
	scale: PropTypes.string,
	translateX: PropTypes.string,
	translateY: PropTypes.string,
	mobile: PropTypes.bool,
	tablet: PropTypes.bool,
	printer: PropTypes.bool,
	children: PropTypes.node
};
SectionArt.defaultProps = {
	translateX: "-50%",
	translateY: "-50%",
	mobile: true,
	tablet: true
};

export default SectionArt;