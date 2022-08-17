import PropTypes from "prop-types";
import "./Button.css";

function Button({ className, decoration, children }) {
	/* ---- Page content ---------------------------- */
	return (
		<div className={`button${className ? ` ${className}` : ""}`}>
			<button className="button-element">
				{children}

				{decoration && (
					<span className="decoration">
						{decoration}
					</span>
				)}
			</button>
		</div>
	);
}
Button.propTypes = {
	className: PropTypes.string,
	decoration: PropTypes.string,
	children: PropTypes.node
};

export default Button;