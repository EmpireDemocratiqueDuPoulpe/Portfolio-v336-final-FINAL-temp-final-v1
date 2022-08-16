import { useEffect } from "react";
import AppNavigation, { NavigationLink } from "../../components/AppNavigation/AppNavigation.js";
import Experiences from "../../components/Experiences/Experiences.js";
import Project from "../../components/Project/Project.js";
import SocialNetwork from "../../components/SocialNetwork/SocialNetwork.js";
import { Content } from "../../config/config.js";
import ProfilePicture from "../../assets/images/me.png";
import "./App.css";

/*****************************************************
 * Constants
 *****************************************************/

const fakeSituation = Content.fakeSituations.getRandom();
const experiences = [
	{
		id: 1,
		title: "Titre du job", company: "Entreprise",
		startDate: "01/01/1970", endDate: "31/12/9999",
		illustrations: [ ProfilePicture ],
		description: "Phlébotome hors-la-loi frère de la côte, moujik pyrophore, terroriste sauvage rocambole gangster trafiquant de chair humaine topinambour. Frère de la côte mégacycle, cloporte satrape brontosaure. Mitrailleur à bavette va-nu-pieds malotru aérolithe. Mitrailleur à bavette vermine polichinelle, canaque cornemuse brontosaure. Gangster dynamiteur paltoquet voleur, rocambole iconoclaste cataplasme sauvage. Ku-Klux-Klan protozoaire cro-magnon, épouvantail jus de réglisse ostrogoth cachalot. Marchand de guano serpent cataplasme ectoplasme. Patate kroumir emplâtre, cataplasme saltimbanque, aztèque phylactère phlébotome traîne-potence vivisectionniste. Jus de réglisse catachrèse vermicelle, terroriste arlequin, pacte à quatre scélérats coquin polygraphe misérable va-nu-pieds.",
		feedback: {
			title: "Avis de l'entreprise/<NOM EMPLOYÉ>",
			content: "Mamelouk vercingétorix de carnaval, mamelouk scélérat phlébotome. Chauffard rocambole schizophrène, catachrèse cyclone misérable. Gargarisme forban renégat mouchard. Ophicléide lâche, zèbre sinapisme frère de la côte. Cornemuse scolopendre, crétin des alpes apprenti dictateur à la noix de coco polichinelle. Pirate protozoaire va-nu-pieds vivisectionniste, mitrailleur à bavette amphitryon phylactère ectoplasme. Brigand polichinelle, ostrogoth emplâtre polygraphe. Soulographe sacripant rhizopode accapareur, ivrogne anacoluthe choléra soulographe."
		}
	},
	{
		id: 2,
		title: "Titre du job", company: "Entreprise",
		startDate: "01/01/1970", endDate: "31/12/9999",
		illustrations: [ ProfilePicture ],
		description: "Phlébotome hors-la-loi frère de la côte, moujik pyrophore, terroriste sauvage rocambole gangster trafiquant de chair humaine topinambour. Frère de la côte mégacycle, cloporte satrape brontosaure. Mitrailleur à bavette va-nu-pieds malotru aérolithe. Mitrailleur à bavette vermine polichinelle, canaque cornemuse brontosaure. Gangster dynamiteur paltoquet voleur, rocambole iconoclaste cataplasme sauvage. Ku-Klux-Klan protozoaire cro-magnon, épouvantail jus de réglisse ostrogoth cachalot. Marchand de guano serpent cataplasme ectoplasme. Patate kroumir emplâtre, cataplasme saltimbanque, aztèque phylactère phlébotome traîne-potence vivisectionniste. Jus de réglisse catachrèse vermicelle, terroriste arlequin, pacte à quatre scélérats coquin polygraphe misérable va-nu-pieds.",
		feedback: {
			title: "Avis de l'entreprise/<NOM EMPLOYÉ>",
			content: "Mamelouk vercingétorix de carnaval, mamelouk scélérat phlébotome. Chauffard rocambole schizophrène, catachrèse cyclone misérable. Gargarisme forban renégat mouchard. Ophicléide lâche, zèbre sinapisme frère de la côte. Cornemuse scolopendre, crétin des alpes apprenti dictateur à la noix de coco polichinelle. Pirate protozoaire va-nu-pieds vivisectionniste, mitrailleur à bavette amphitryon phylactère ectoplasme. Brigand polichinelle, ostrogoth emplâtre polygraphe. Soulographe sacripant rhizopode accapareur, ivrogne anacoluthe choléra soulographe."
		}
	},
	{
		id: 3,
		title: "Titre du job", company: "Entreprise",
		startDate: "01/01/1970", endDate: "31/12/9999",
		illustrations: [ ProfilePicture ],
		description: "Phlébotome hors-la-loi frère de la côte, moujik pyrophore, terroriste sauvage rocambole gangster trafiquant de chair humaine topinambour. Frère de la côte mégacycle, cloporte satrape brontosaure. Mitrailleur à bavette va-nu-pieds malotru aérolithe. Mitrailleur à bavette vermine polichinelle, canaque cornemuse brontosaure. Gangster dynamiteur paltoquet voleur, rocambole iconoclaste cataplasme sauvage. Ku-Klux-Klan protozoaire cro-magnon, épouvantail jus de réglisse ostrogoth cachalot. Marchand de guano serpent cataplasme ectoplasme. Patate kroumir emplâtre, cataplasme saltimbanque, aztèque phylactère phlébotome traîne-potence vivisectionniste. Jus de réglisse catachrèse vermicelle, terroriste arlequin, pacte à quatre scélérats coquin polygraphe misérable va-nu-pieds.",
		feedback: {
			title: "Avis de l'entreprise/<NOM EMPLOYÉ>",
			content: "Mamelouk vercingétorix de carnaval, mamelouk scélérat phlébotome. Chauffard rocambole schizophrène, catachrèse cyclone misérable. Gargarisme forban renégat mouchard. Ophicléide lâche, zèbre sinapisme frère de la côte. Cornemuse scolopendre, crétin des alpes apprenti dictateur à la noix de coco polichinelle. Pirate protozoaire va-nu-pieds vivisectionniste, mitrailleur à bavette amphitryon phylactère ectoplasme. Brigand polichinelle, ostrogoth emplâtre polygraphe. Soulographe sacripant rhizopode accapareur, ivrogne anacoluthe choléra soulographe."
		}
	}
];

/*****************************************************
 * App
 *****************************************************/

function App() {
	/* ---- Effects --------------------------------- */
	useEffect(() => {
		const interval = setInterval(() => {
			document.title = Math.floor(Math.random() * 1000).toString();
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	/* ---- Page content ---------------------------- */
	return (
		<div className="App">
			<AppNavigation>
				<NavigationLink href="#presentation">Pr&eacute;sentation</NavigationLink>
				<NavigationLink href="#experiences">Exp&eacute;rience</NavigationLink>
				<NavigationLink href="#projets">Projets</NavigationLink>
				<NavigationLink href="#contact">Contact</NavigationLink>
			</AppNavigation>

			<section id="presentation" className="portfolio-section">
				<div className="about-content">
					<div className="welcome-msg">
						<span className="hello">Bonjour</span>
						<h1 className="my-name">Je suis Alexis &lt;NOM FAMILLE?&gt;</h1>

						<div className="my-situation">
							<img className="fake-situation-img" src={fakeSituation.illustration} alt=""/>
							<span className="fake-situation">{fakeSituation.name}</span>
							<span className="real-situation">&Eacute;tudiant en &eacute;cole d&apos;informatique.</span>
						</div>

						<button>Consulter mon CV &rarr;</button>
					</div>

					<div className="profile-picture">
						<img src={ProfilePicture} alt="Une photographie de moi"/>
					</div>
				</div>
			</section>

			<section id="experiences" className="portfolio-section">
				<h2>Exp&eacute;riences</h2>

				<Experiences experiences={experiences}/>
			</section>

			<section id="projets" className="portfolio-section">
				<h2>Projets</h2>

				<div className="projects-grid">
					<Project name="Pond Simulator 2020" href="#" techs={["Java"]}>
						Pond Simulator 2020 is a JAVA project I did during my second year of study at SupInfo. This program is designed to simulate, in a simplified way, a lake and the life of the ducks inside.
					</Project>

					<Project name="Instabus" href="#" techs={["Kotlin"]}>
						Instabus is an Android application created using Kotlin for a school project. It’s a social network like Instagram where users can search for bus stations in Barcelona and take pictures of them. Taken pictures can be seen by all users.
					</Project>

					<Project name="Mr. Driller clone" href="#" techs={["Python"]}>
						Y&apos;a pas de description
					</Project>

					<Project name="Melodie" href="#" techs={["C#", "HTML", "CSS", "JavaScript"]}>
						Melodie is a website where a logged-in user can create playlists and add musics to them using a file or a link. The songs are played by the Wavesurfer API, so JavaScript is required.
					</Project>
				</div>
			</section>

			<section id="contact" className="portfolio-section">
				<h2>Contact</h2>

				<h3>Envie d&apos;en savoir plus ?</h3>
				<p>Contactez-moi par mail ou LinkedIn. Bon par contre il faut rallonger ce texte.</p>

				<SocialNetwork.LinkedIn/>

				<a className="link" href="mailto:alexis.lecomte@supinfo.com">Envoyer un mail</a>
			</section>

			<span>https://icones8.fr</span>


			<div className="temp">
				<h1>yo</h1>

				<p>Un logo ici pour faire joli</p>

				<h2>&Agrave; propos de moi</h2>
				<p>coucou c&apos;est moi. ahaha c&apos;est rigolo. non.</p>
				<p>Ah et je suis &eacute;tudiant en informatique. &ccedil;a peut servir.</p>
				<p>Photo?</p>
				<p>Lien vers le CV</p>

				<h2>Exp&eacute;riences</h2>
				<h3>Intitul&eacute; n&deg;1</h3>
				<p>&Agrave; : &lt;NOM ENTREPRISE&gt;</p>
				<p>Du &lt;DATE D&Eacute;BUT&gt; au &lt;DATE FIN&gt;</p>
				<p>Description descriptive et concise du projet.</p>
				<p>Lien vers GitHub</p>
				<p>Capture d&apos;&eacute;cran</p>
				<em>Avis de l&apos;entreprise</em>

				<h2>Projets</h2>
				<h3>Projet pertinent n&deg;1</h3>
				<p>Ça fait des trucs et des bidules.</p>
				<em>Je suis le projet et je confirme que je fais des trucs et des bidules.</em>

				<h2>Contact</h2>
				<p>alexis.lecomte@supinfo.com</p>
				<p>Lien vers LinkedIn</p>
			</div>
		</div>
	);
}

export default App;
