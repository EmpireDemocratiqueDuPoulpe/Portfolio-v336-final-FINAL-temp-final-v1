const CENTER = { lat: 50.449061, lng: 3.428135 };

export default {
	// Yes I know. It is BAD. I'm too broke to take a real server and hide this with a proper solution.
	// Please don't steal :(
	apiKey: "pk.eyJ1Ijoibm91bm91cnM3MDAwIiwiYSI6ImNsaTRzczE0eDBpbDczbHBjZnpqc2w0eG4ifQ.4XCVITG34ZkX5dj26LH_NA",
	//    ᴵ ᵏⁿᵒʷ ʸᵒᵘʳ ˡᵒᶜᵃᵗⁱᵒⁿ
	center: CENTER,
	markers: {
		type: "FeatureCollection",
		features: [
			{
				type: "Feature",
				geometry: {
					type: "Point",
					coordinates: [CENTER.lat, CENTER.lng]
				},
				properties: {
					title: null,
					description: "J'habite ici"
				}
			}
		],
	},
};
