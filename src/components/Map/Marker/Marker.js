/**
 * @module Marker
 * @category Components
 * @subcategory Map
 * @author Alexis L. <alexis.lecomte@supinfo.com>
 */

import { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-unresolved
import "./Marker.css";

function Marker({ map, feature, onClick, children }) {
	/* ---- States ---------------------------------- */
	const markerRef = useRef(/** @type {Element|null} */ null);
	const markerInstance = useRef(/** @type {mapboxgl.Marker|null} */ null);

	/* ---- Functions ------------------------------- */
	/**
	 * Propagates the `onClick` map event to a callback function used by the parent of this element.
	 * @function
	 * @private
	 */
	const handleClick = () => {
		if (onClick) {
			onClick(feature);
		}
	};

	/* ---- Effects --------------------------------- */
	useEffect(() => {
		if (!markerInstance.current) {
			// Marker initialization
			// noinspection JSUnresolvedFunction
			markerInstance.current = new mapboxgl.Marker(markerRef.current)
				.setLngLat(feature.geometry.coordinates)
				.setPopup(
					new mapboxgl.Popup({ offset: 25, closeButton: false, closeOnClick: true, cloneOnMove: false })
						.setHTML(`
							${feature.properties.title ? `<h3>${feature.properties.title}</h3>` : ""}
							${feature.properties.description ? `<p>${feature.properties.description}</p>` : ""}
						`)
				)
				.addTo(map)
				.togglePopup();
		}

		return () => {
			// noinspection JSUnresolvedFunction
			markerInstance.current.remove();
			markerInstance.current = null;
		};
		// This hook must run once at page loading
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	/* ---- Page content ---------------------------- */
	return (
		<button ref={markerRef} className="map-marker" onClick={handleClick}>
			{children}
		</button>
	);
}
Marker.propTypes = {
	map: PropTypes.instanceOf(mapboxgl.Map).isRequired,
	feature: PropTypes.object.isRequired,
	onClick: PropTypes.func,
	children: PropTypes.node
};

export default Marker;
