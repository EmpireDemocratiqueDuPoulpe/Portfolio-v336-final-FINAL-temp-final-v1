/**
 * Generate a fake situation. You wouldn't have guessed it without this description.
 */

let situationElement = null;
const fakeSituations = [
		"Inventeur de chaussettes",
		"Dompteur de plancton",
		"Peintre en apesanteur",
		"Marin d'eau douce",
		"Astronaute sous-terrain",
		"Chasseur de moquette",
		"Pilote d'éolienne",
		"Soudeur de glace",
		"Traqueur de gluon",
		"Cartographe de cumulonimbus",
		"Percussionniste de mousse",
];

function getSituation() {
	return fakeSituations[Math.floor(Math.random() * fakeSituations.length)];
}

function changeSituation() {
	if (!situationElement) {
		situationElement = document.querySelector(".fake-situation");
	}

	if (situationElement) {
		situationElement.innerText = getSituation();
	}
}

changeSituation();
