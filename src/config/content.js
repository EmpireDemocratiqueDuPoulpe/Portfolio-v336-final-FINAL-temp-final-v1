import WeightlessPainter from "../assets/images/situations/peintre_en_apesanteur.png";

export default {
	fakeSituations: {
		enable: true,
		list: [
			{ name: "Inventeur de chaussettes", illustration: WeightlessPainter },
			{ name: "Dompteur de plancton", illustration: WeightlessPainter },
			{ name: "Peintre en apesanteur", illustration: WeightlessPainter },
			{ name: "Marin d'eau douce", illustration: WeightlessPainter },
			{ name: "Astronaute sous-terrain", illustration: WeightlessPainter },
			{ name: "Chasseur de moquette", illustration: WeightlessPainter },
			{ name: "Pilote d'éolienne", illustration: WeightlessPainter },
			{ name: "Soudeur de glace", illustration: WeightlessPainter },
			{ name: "Traqueur de gluon", illustration: WeightlessPainter },
			{ name: "Cartographe de cumulonimbus", illustration: WeightlessPainter },
			{ name: "Percussionniste de mousse", illustration: WeightlessPainter },
			{ name: "Bodybuilder animalier", illustration: WeightlessPainter },
		],
		getRandom() {
			return this.enable ? (this.list[Math.floor(Math.random() * this.list.length)]) : null;
		}
	}
};
