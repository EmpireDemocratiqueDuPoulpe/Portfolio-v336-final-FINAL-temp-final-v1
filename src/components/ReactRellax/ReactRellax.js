import { useRef, useEffect, memo } from "react";
import PropTypes from "prop-types";
import Rellax from "rellax";

function ReactRellax({ className, wrapper, horizontal, vertical, speed, percentage, zIndex, onMove, ...rest }) {
	/* ---- States ---------------------------------- */
	const parallaxRef = useRef();
	const containerRef = useRef();

	/* ---- Effects --------------------------------- */
	useEffect(() => {
		if (!parallaxRef.current && containerRef.current) {
			const config = { horizontal, vertical };

			if (wrapper) config.wrapper = wrapper;
			if (onMove && (typeof onMove === "function")) config.callback = onMove;

			parallaxRef.current = new Rellax(containerRef.current, config);
		}

		return () => {
			if (parallaxRef.current) {
				parallaxRef.current.destroy();
				parallaxRef.current = null;
			}
		};
	}, [wrapper, horizontal, vertical, onMove]);

	/* ---- Page content ---------------------------- */
	return <div
		{...rest}
		className={className}
		ref={containerRef}
		data-rellax-speed={speed}
		data-rellax-percentage={percentage}
		data-rellax-zindex={zIndex}
	/>;
}
ReactRellax.propTypes = {
	className: PropTypes.string,
	wrapper: PropTypes.string,
	horizontal: PropTypes.bool,
	vertical: PropTypes.bool,
	speed: PropTypes.number,
	percentage: PropTypes.number,
	zIndex: PropTypes.number,
	onMove: PropTypes.func
};
ReactRellax.defaultProps = {
	horizontal: false,
	vertical: true,
	speed: 0,
	zIndex: 0,
};

export default memo(ReactRellax);