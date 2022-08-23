import { useState, useRef, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-unresolved
import MapboxLanguage from "@mapbox/mapbox-gl-language";
import useScrollContext from "../../context/Scroll/ScrollContext.js";
import Marker from "./Marker/Marker.js";
import { eventOnElement } from "../../global/Functions.js";
import { Map as MapConfig } from "../../config/config.js";
import "mapbox-gl/dist/mapbox-gl.css";
import "./Map.css";

mapboxgl.accessToken = MapConfig.apiKey;

function Map({ lat, lng, zoom, markers }) {
	/* ---- States ---------------------------------- */
	const scroll = useScrollContext();
	const mapWrapper = useRef(null);
	const map = useRef(null);
	const [markersJSX, setMarkersJSX] = useState([]);
	const [isInteractive, setInteractive] = useState(false);

	/* ---- Functions ------------------------------- */
	const disableInteractiveState = () => { setInteractive(false); };
	const toggleInteractiveState = () => { setInteractive(!isInteractive); };

	const onScroll = useCallback(() => {
		if (isInteractive) {
			disableInteractiveState();
		}
	}, [isInteractive]);

	/* ---- Effects --------------------------------- */
	useEffect(() => {
		if (!map.current) {
			// Map initialization
			map.current = new mapboxgl.Map({
				container: mapWrapper.current,
				style: "mapbox://styles/mapbox/streets-v11",
				center: [lng, lat],
				zoom,
				language: "auto"
			});
			map.current.addControl(new MapboxLanguage({}));

			// Markers
			setMarkersJSX(markers.features.map(feature => (
				<Marker
					key={`map-marker-${feature.geometry.coordinates[0]}-${feature.geometry.coordinates[1]}`}
					map={map.current}
					feature={feature}
				/>
			)));
		}

		return () => {
			map.current.remove();
			map.current = null;

			setMarkersJSX([]);
		};
		// This hook must run once at page loading
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		scroll.addListener(onScroll);
		return () => { scroll.removeListener(onScroll); };
	}, [scroll, onScroll]);

	/* ---- Page content ---------------------------- */
	return (
		<div className="map">
			<div className={`map-interactive-status${isInteractive ? " interactive" : ""}`} {...eventOnElement(toggleInteractiveState)}>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
					<path d="M23.19 32C28.86 32 34.34 34.08 38.59 37.86L312.6 281.4C317.3 285.6 320 291.6 320 297.9C320 310.1 310.1 320 297.9 320H179.8L236.6 433.7C244.5 449.5 238.1 468.7 222.3 476.6C206.5 484.5 187.3 478.1 179.4 462.3L121.2 346L38.58 440.5C34.4 445.3 28.36 448 22.01 448C9.855 448 0 438.1 0 425.1V55.18C0 42.38 10.38 32 23.18 32H23.19z"/>
				</svg>
			</div>

			<div className="map-box" ref={mapWrapper}/>

			{(map.current && markersJSX) && (
				<div className="markers">
					{markersJSX}
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
