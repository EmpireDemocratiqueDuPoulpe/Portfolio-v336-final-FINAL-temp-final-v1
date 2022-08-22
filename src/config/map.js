const CENTER = { lat: 50.449061, lng: 3.428135 };

export default {
	apiKey: "pk.eyJ1Ijoibm91bm91cnM3MDAwIiwiYSI6ImNsNzBqNTg5NjA3NDMzcG1lYXV3MGJ1Z2sifQ.TWdaNU11eXSZh31OVa1h6g",
	center: CENTER,
	markers: {
		type: "FeatureCollection",
		features: [
			{
				type: "Feature",
				geometry: {
					type: "Point",
					coordinates: [CENTER.lng, CENTER.lat]
				},
				properties: {
					title: "Saint-Amand-les-Eaux",
					description: "J'habite ici"
				}
			}
		],
	},
};
