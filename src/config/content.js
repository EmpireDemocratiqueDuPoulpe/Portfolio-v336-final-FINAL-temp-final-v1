import WeightlessPainter from "../assets/images/situations/peintre_en_apesanteur.png";

export default {
	title: "Alexis Lecomte",
	loadingStatus: [
		"Chargement de l'interface",
		"Suppression des artéfacts",
		"Polissage des textures",
		"Activation de la matrice de sécurité",
		"Amorçage des étoiles",
		"Graissage de la barre de défilement",
	],
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
	},
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
				intro: "Phlébotome hors-la-loi frère de la côte, moujik pyrophore, terroriste sauvage rocambole gangster trafiquant de chair humaine topinambour. Frère de la côte mégacycle, cloporte satrape brontosaure. ",
				bulletedList: [
					"Mitrailleur à bavette va-nu-pieds malotru aérolithe. Mitrailleur à bavette vermine polichinelle, canaque cornemuse brontosaure. ",
					"Gangster dynamiteur paltoquet voleur, rocambole iconoclaste cataplasme sauvage. Ku-Klux-Klan protozoaire cro-magnon, épouvantail jus de réglisse ostrogoth cachalot. ",
					"Marchand de guano serpent cataplasme ectoplasme. Patate kroumir emplâtre, cataplasme saltimbanque, aztèque phylactère phlébotome traîne-potence vivisectionniste. "
				],
				outro: "Jus de réglisse catachrèse vermicelle, terroriste arlequin, pacte à quatre scélérats coquin polygraphe misérable va-nu-pieds."
			},
			feedback: {
				title: "Avis de l'entreprise/<NOM EMPLOYÉ>",
				content: "Mamelouk vercingétorix de carnaval, mamelouk scélérat phlébotome. Chauffard rocambole schizophrène, catachrèse cyclone misérable. Gargarisme forban renégat mouchard. Ophicléide lâche, zèbre sinapisme frère de la côte. Cornemuse scolopendre, crétin des alpes apprenti dictateur à la noix de coco polichinelle. Pirate protozoaire va-nu-pieds vivisectionniste, mitrailleur à bavette amphitryon phylactère ectoplasme. Brigand polichinelle, ostrogoth emplâtre polygraphe. Soulographe sacripant rhizopode accapareur, ivrogne anacoluthe choléra soulographe."
			}
		}
	]
};
