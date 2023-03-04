/**
 * @module Button
 * @category Components
 * @author Alexis L. <alexis.lecomte@supinfo.com>
 */

import { useMemo } from "react";
import PropTypes from "prop-types";
import "./Button.css";

function Button({ className, href, onClick, decoration, children }) {
	/* ---- States ---------------------------------- */
	const classes = useMemo(
		/** @type {function(): string} */ () => `button${className ? ` ${className}` : ""}`,
		[className]
	);

	/* ---- Functions ------------------------------- */
	/**
	 * Selects the button container according to the props.
	 * @constructor
	 * @private
	 *
	 * @param {*} children - Container children
	 *
	 * @return {JSX.Element}
	 */
	const Wrapper = ({ children }) => href
		? <a className={classes} href={href} target="_blank" rel="noreferrer">{children}</a>
		: <button className={classes} type="button" onClick={onClick}>{children}</button>;

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
