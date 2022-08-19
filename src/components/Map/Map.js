import { useState, useRef, useEffect } from "react";
// import PropTypes from "prop-types";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-unresolved
import MapboxLanguage from "@mapbox/mapbox-gl-language";
import { Map as MapConfig } from "../../config/config.js";
import "mapbox-gl/dist/mapbox-gl.css";
import "./Map.css";

mapboxgl.accessToken = MapConfig.apiKey;

function Map() {
	/* ---- States ---------------------------------- */
	const mapWrapper = useRef(null);
	const map = useRef(null);
	const [longitude] = useState(-70.9);
	const [latitude] = useState(42.35);
	const [zoom] = useState(9);

	/* ---- Effects --------------------------------- */
	useEffect(() => {
		if (map.current) return;

		map.current = new mapboxgl.Map({
			container: mapWrapper.current,
			style: "mapbox://styles/mapbox/streets-v11",
			center: [longitude, latitude],
			zoom,
			language: "auto"
		});
		map.current.addControl(new MapboxLanguage({}));

		// This hook must run once at page loading
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	/* ---- Page content ---------------------------- */
	return (
		<div className="map">
			<div className="map-box" ref={mapWrapper}/>
			{/*<Map
					initialViewState={{ longitude: -122.4, latitude: 37.8, zoom: 14 }}
					style={{ width: 600, height: 400 }}
					mapStyle="mapbox://styles/mapbox/streets-v9"
				/>*/}
		</div>
	);
}
Map.propTypes = {

};

export default Map;