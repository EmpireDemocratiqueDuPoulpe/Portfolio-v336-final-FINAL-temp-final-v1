/**
 * @module WebP
 * @category Components
 * @author Alexis L. <alexis.lecomte@supinfo.com>
 */

import PropTypes from "prop-types";
import mime from "mime";
import useClassName from "../../hooks/className/useClassName.js";
import useImage from "../../hooks/image/useImage.js";
import "./WebP.css";

function WebP({ className, src, fallback: fallbackSrc, alt, ...rest }) {
	/* ---- States ---------------------------------- */
	const classes = useClassName(hook => {
		hook.set("webp");
		hook.setIf(!!className, className);
	}, [className]);
	const image = useImage(src);
	const fallback = useImage(fallbackSrc);

	/* ---- Page content ---------------------------- */
	return (
		<picture className={classes} {...rest}>
			<source srcSet={image.isLoaded ? image.image : null} type="image/webp"/>
			<source srcSet={fallback.isLoaded ? fallback.image : null} type={mime.getType(fallbackSrc)}/>

			<img src={fallback.isLoaded ? fallback.image : null} alt={alt}/>
		</picture>
	);
}
WebP.propTypes = {
	className: PropTypes.string,
	src: PropTypes.string.isRequired,
	fallback: PropTypes.string.isRequired,
	alt: PropTypes.string.isRequired,
};

export default WebP;