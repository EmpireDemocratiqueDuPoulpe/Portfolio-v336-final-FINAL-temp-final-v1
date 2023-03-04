export default {
	/* --- Base content ----------------------------------------------------------------------------------------------- */
	title: "Alexis Lecomte",
	loadingStatus: [
		"Chargement de l'interface",
		"Suppression des artéfacts",
		"Polissage des textures",
		"Activation de la matrice de sécurité",
		"Amorçage des étoiles",
		"Graissage de la barre de défilement",
	],

	/* --- Fake situations -------------------------------------------------------------------------------------------- */
	fakeSituations: {
		enable: true,
		list: [
			/* { name: "Inventeur de chaussettes", image:    {src: "situations/peintre_en_apesanteur.webp", fallback: "situations/peintre_en_apesanteur.png"} }, */
			{ name: "Inventeur de chaussettes", image:    null },
			{ name: "Dompteur de plancton", image:        null },
			{ name: "Peintre en apesanteur", image:       null },
			{ name: "Marin d'eau douce", image:           null },
			{ name: "Astronaute sous-terrain", image:     null },
			{ name: "Chasseur de moquette", image:        null },
			{ name: "Pilote d'éolienne", image:           null },
			{ name: "Soudeur de glace", image:            null },
			{ name: "Traqueur de gluon", image:           null },
			{ name: "Cartographe de cumulonimbus", image: null },
			{ name: "Percussionniste de mousse", image:   null },
			{ name: "Bodybuilder animalier", image:       null },
		],
		getRandom() {
			return this.enable ? (this.list[Math.floor(Math.random() * this.list.length)]) : null;
		}
	},

	/* --- Experiences ------------------------------------------------------------------------------------------------ */
	experiences: [
		{
			id: 1,
			title: "Développeur Web", company: "Caisse nationale de l'assurance maladie",
			startDate: "01/07/2019", endDate: "31/10/2019",
			description: {
				intro: "Réalisation d’un outil web interne répertoriant la totalité des serveurs de l'organisme.",
				bulletedList: [
					"Consultation des propriétés propres au serveur tel que son adresse IPV4 et IPV6, son nom, ses ports ouverts, ...",
					"Énumération des applications installées sur le serveur (Base de données, outils de monitoring, ...).",
					"Affichage d'un schéma interactif comportant les connexions entre les serveurs."
				],
				outro: null
			},
			feedback: null
		},
		{
			id: 2,
			title: "Développeur Full-stack", company: "Evolis Formations",
			startDate: "01/07/2021", endDate: "31/10/2021",
			description: {
				intro: "Mise au point d'une application web visant à digitaliser les procédures de travail de l'entreprise.",
				bulletedList: [
					"Les formateurs ont accès à leur espace personnel dans lequel ils disposent de leur emploi du temps, de diverses ressources de cours et d'un fil d'actualités.",
					"Les participants signent la feuille d'émargement et répondent aux questionnaires depuis le site, grâce à un code que le formateur affiche. ",
					"Les documents de la formation, les feuilles d'émargement et les certificats de réussite sont générés depuis l'application afin d'éviter un travail redondant de la part des formateurs.",
				],
				outro: "L'intérêt d'un tel outil permet à l'entreprise d'évoluer et d'être mieux équipée pour faire face à la concurrence en proposant une solution simple et efficace, autant à ses formateurs qu'à ses clients."
			},
			feedback: null
		},
		{
			id: 3,
			title: "Développeur logiciel", company: "Railenium",
			startDate: "01/03/2022", endDate: "15/11/2022",
			description: {
				intro: "Développement d'une application chargée d'automatiser le traitement d'un enregistrement vidéo utilisé à des fins d'étude FOH.",
				bulletedList: [
					"Interface graphique pour faciliter l'utilisation.",
					"Détection automatique d'éléments sur la vidéo : rails, objets, ...",
					"Mise en corrélation des éléments détectés avec des données oculométriques."
				],
				outro: "Ce projet permettra d'automatiser un processus fastidieux à l'aide de l'intelligence artificielle."
			},
			feedback: null
		}
	],

	/* --- Projects --------------------------------------------------------------------------------------------------- */
	projects: [
		{
			name: "Pond Simulator 2020",
			description: "Pond Simulator 2020 simule, de manière simplifiée et cartoonesque, la vie dans un lac, les canards qui y vivent, les nénuphars qui y poussent et les régimes dictatorials qui émergent du peuple ansériforme.",
			techs: ["Java"],
			image: { src: "projects/pond_simulator_2020.webp", fallback: "projects/pond_simulator_2020.png" },
			link: { href: "https://github.com/EmpireDemocratiqueDuPoulpe/Pond-Simulator-2020" },
			windowTitle: "quack!"
		},
		{
			name: "Melodie",
			description: "Melodie est un site web permettant à un utilisateur authentifié d'écouter des morceaux de musique depuis ses listes de lecture. Les musiques y sont ajoutées en entrant un lien ou un fichier audio.",
			techs: ["C#", "HTML", "CSS", "JavaScript"],
			image: { src: "projects/melodie.webp", fallback: "projects/melodie.png" },
			link: { href: "https://github.com/EmpireDemocratiqueDuPoulpe/Melodie" },
			windowTitle: "♫ Playing Darude Sandstorm - Dubstep Edition"
		},
		{
			name: "Instabus",
			description: "Instabus est un réseau social similaire à Instagram, mais avec un concept de niche. Les utilisateurs peuvent chercher des arrêts de bus dans Barcelone, s'y prendre en photo et le partager au monde. Je l'avais dit, concept de niche.",
			techs: ["Kotlin"],
			image: { src: "projects/instabus.webp", fallback: "projects/instabus.png" },
			link: { href: "https://github.com/EmpireDemocratiqueDuPoulpe/Instabus" },
			windowTitle: "#bus #crazy #Setra_S_416_GT-HD/2"
		},
		{
			name: "Mr. Driller",
			description: "Un clone d'un jeu sorti en 1999 sur de multiples consoles.",
			techs: ["Python"],
			image: { src: "projects/mr_driller.webp", fallback: "projects/mr_driller.png" },
			link: { href: "#" },
			windowTitle: "Littéralement Minecraft"
		},
	]
};
