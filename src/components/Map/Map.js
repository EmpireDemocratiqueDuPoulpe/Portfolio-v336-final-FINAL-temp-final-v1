import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-unresolved
import MapboxLanguage from "@mapbox/mapbox-gl-language";
import Marker from "./Marker/Marker.js";
import { Map as MapConfig } from "../../config/config.js";
import "mapbox-gl/dist/mapbox-gl.css";
import "./Map.css";

mapboxgl.accessToken = MapConfig.apiKey;

function Map({ lat, lng, zoom: zoomLevel, markers }) {
	/* ---- States ---------------------------------- */
	const mapWrapper = useRef(null);
	const map = useRef(null);
	const [latitude, setLatitude] = useState(lat);
	const [longitude, setLongitude] = useState(lng);
	const [zoom, setZoom] = useState(zoomLevel);

	/* ---- Effects --------------------------------- */
	useEffect(() => {
		if (!map.current) {
			// Map initialization
			map.current = new mapboxgl.Map({
				container: mapWrapper.current,
				style: "mapbox://styles/mapbox/streets-v11",
				center: [longitude, latitude],
				zoom,
				language: "auto"
			});
			map.current.addControl(new MapboxLanguage({}));

			// Events
			map.current.on("move", () => {
				const center = map.current.getCenter();

				setLongitude(center.lng.toFixed(4));
				setLatitude(center.lat.toFixed(4));
				setZoom(map.current.getZoom().toFixed(2));
			});
		}

		return () => {
			map.current.remove();
			map.current = null;
		};
		// This hook must run once at page loading
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	/* ---- Page content ---------------------------- */
	return (
		<div className="map">
			<div className="map-box" ref={mapWrapper}/>

			{(map.current && markers) && (
				<div className="markers">
					{markers.features.map(feature => (
						<Marker
							key={`map-marker-${feature.geometry.coordinates[0]}-${feature.geometry.coordinates[1]}`}
							map={map.current}
							feature={feature}
						/>
					))}
				</div>
			)}
		</div>
	);
}
Map.propTypes = {
	lat: PropTypes.number,
	lng: PropTypes.number,
	zoom: (props, propName, componentName) => {
		if ((0 > props[propName]) || (props[propName] > 24)) {
			return new Error(`Invalid prop "${propName}" supplied to "${componentName}". The zoom level must be a integer in the range [0-24].`);
		}
	},
	markers: PropTypes.shape({
		type: PropTypes.oneOf(["FeatureCollection"]).isRequired,
		features: PropTypes.arrayOf(
			PropTypes.shape({
				type: PropTypes.oneOf(["Feature"]).isRequired,
				geometry: PropTypes.shape({
					type: PropTypes.oneOf(["Point"]).isRequired,
					coordinates: PropTypes.arrayOf(PropTypes.number).isRequired
				}).isRequired,
				properties: PropTypes.object
			})
		).isRequired
	})
};
Map.defaultProps = { lat: 0, lng: 0, zoom: 9 };

export default Map;
