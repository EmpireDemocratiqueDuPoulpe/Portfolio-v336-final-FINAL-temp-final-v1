/**
 * @module Loader
 * @category Components
 * @author Alexis L. <alexis.lecomte@supinfo.com>
 */

import PropTypes from "prop-types";
import "./Loader.css";

const SIZES = { small: "4rem", medium: "6rem", big: "8rem" };

function Loader({ size }) {
	/* ---- Page content ---------------------------- */
	// noinspection JSValidateTypes
	return <div className="loader pulse" style={{ "--size": SIZES[size] }}/>;
}
Loader.propTypes = { size: PropTypes.oneOf(["small", "medium", "big"]) };
Loader.defaultProps = { size: "medium" };

export default Loader;