import { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-unresolved
import "./Marker.css";

function Marker({ map, feature, onClick, children }) {
	/* ---- States ---------------------------------- */
	const markerRef = useRef(null);
	const markerInstance = useRef(null);

	/* ---- Effects --------------------------------- */
	useEffect(() => {
		if (!markerInstance.current) {
			markerInstance.current = new mapboxgl.Marker(markerRef.current)
				.setLngLat(feature.geometry.coordinates)
				.setPopup(
					new mapboxgl.Popup({ offset: 25 })
						.setHTML(`<h3>${feature.properties.title}</h3><p>${feature.properties.description}</p>`)
				)
				.addTo(map)
				.togglePopup();
		}

		return () => {
			markerInstance.current.remove();
			markerInstance.current = null;
		};
		// This hook must run once at page loading
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	/* ---- Functions ------------------------------- */
	const handleClick = () => {
		if (onClick) {
			onClick(feature);
		}
	};

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
