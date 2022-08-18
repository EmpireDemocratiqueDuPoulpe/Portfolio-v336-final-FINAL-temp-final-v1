import { useMemo } from "react";
import PropTypes from "prop-types";
import "./Button.css";

function Button({ className, href, onClick, decoration, children }) {
	/* ---- States ---------------------------------- */
	const classes = useMemo(() => `button${className ? ` ${className}` : ""}`, [className]);

	/* ---- Functions ------------------------------- */
	const Wrapper = ({ children }) => href
		? <a className={classes} href={href} target="_blank" rel="noreferrer">{children}</a>
		: <button className={classes} onClick={onClick}>{children}</button>;
	
	/* ---- Page content ---------------------------- */
	return (
		<Wrapper>
			<div className="button-borders"/>
			<div className="button-background"/>

			{children}

			{decoration && (
				<span className="decoration">
					{decoration}
				</span>
			)}
		</Wrapper>
	);
}
Button.propTypes = {
	className: PropTypes.string,
	href: PropTypes.string,
	onClick: PropTypes.func,
	decoration: PropTypes.string,
	children: PropTypes.node
};

export default Button;