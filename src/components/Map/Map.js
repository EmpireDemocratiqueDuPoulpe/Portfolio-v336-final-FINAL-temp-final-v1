/**
 * @module Map
 * @category Components
 * @author Alexis L. <alexis.lecomte@supinfo.com>
 */

import { useState, useEffect, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import useScrollContext from "../../context/Scroll/ScrollContext.js";
import ReactMap, { Marker, Popup } from "react-map-gl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { eventOnElement } from "../../global/Functions.js";
import { Map as MapConfig } from "../../config/config.js";
import MarkerIcon from "../../assets/images/icons/marker/marker.png";
import "mapbox-gl/dist/mapbox-gl.css";
import "./Map.css";

/*****************************************************
 * Functions of Map
 *****************************************************/

/**
 * Disables map interactions when the user scrolls the page.
 * @callback onScrollFunction
 * @private
 */

/*****************************************************
 * Map
 *****************************************************/

function Map({ lat, lng, zoom, markers }) {
	/* ---- States ---------------------------------- */
	const scroll = useScrollContext();
	const [isInteractive, setInteractive] = useState(/** @type {boolean} */ false);
	const [popup, setPopup] = useState(/** @type {null|Object} */ markers ? markers.features[0] : null);

	const mapMarkers = useMemo(() => !markers ? [] : markers.features.map(feature => (
		<Marker
			key={`map-marker-${feature.geometry.coordinates[0]}-${feature.geometry.coordinates[1]}`}
			latitude={feature.geometry.coordinates[0]}
			longitude={feature.geometry.coordinates[1]}
			anchor="top"
			onClick={event => {
				event.originalEvent.stopPropagation();
				setPopup(feature);
			}}>
			<img className="map-marker-icon" src={MarkerIcon} alt="Icône d'un pointeur sur une carte"/>
		</Marker>
	)), [markers]);

	/* ---- Functions ------------------------------- */
	/**
	 * Disables interactions with the map.
	 * @function
	 * @private
	 */
	const disableInteractiveState = () => { setInteractive(false); };

	/**
	 * Toggles interactions with the map.
	 * @function
	 * @private
	 */
	const toggleInteractiveState = () => { setInteractive(!isInteractive); };

	/** @type {onScrollFunction} */
	const onScroll = useCallback(() => {
		if (isInteractive) {
			disableInteractiveState();
		}
	}, [isInteractive]);

	/* ---- Effects --------------------------------- */
	useEffect(() => {
		scroll.addListener(onScroll);
		return () => { scroll.removeListener(onScroll); };
	}, [scroll, onScroll]);

	/* ---- Page content ---------------------------- */
	return (
		<div className="map">
			<div className={`map-interactive-status${isInteractive ? " interactive" : ""}`} {...eventOnElement(toggleInteractiveState)} aria-label="Cliquez sur la carte pour activer le déplacement">
				<FontAwesomeIcon className="map-interactive-status-icon" icon={solid("mouse-pointer")}/>
			</div>

			<ReactMap
				mapboxAccessToken={MapConfig.apiKey}
				mapStyle="mapbox://styles/mapbox/streets-v11"
				initialViewState={{ latitude: lat, longitude: lng, zoom }}>
				{mapMarkers}

				{popup && (
					<Popup
						latitude={popup.geometry.coordinates[0]}
						longitude={popup.geometry.coordinates[1]}
						anchor="bottom"
						onClose={() => setPopup(null)}
						closeButton={false}
						closeOnMove={true}>
						<div>
							{popup.properties.title && (<h3>{popup.properties.title}</h3>)}
							{popup.properties.description && (<p>{popup.properties.description}</p>)}
						</div>
					</Popup>
				)}
			</ReactMap>
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
