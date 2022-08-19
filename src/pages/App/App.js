import { useRef, useEffect } from "react";
import useCV from "../../context/CV/CVContext.js";
import Button from "../../components/Button/Button.js";
import AppNavigation, { NavigationLink } from "../../components/AppNavigation/AppNavigation.js";
import CVModal from "../../components/CVModal/CVModal.js";
import Experiences from "../../components/Experiences/Experiences.js";
import Project from "../../components/Project/Project.js";
import SocialNetwork from "../../components/SocialNetwork/SocialNetwork.js";
import { Content } from "../../config/config.js";
import ProfilePicture from "../../assets/images/me.png";
import PondSimulator2020 from "../../assets/images/projects/pond_simulator_2020.png";
import Instabus from "../../assets/images/projects/instabus.png";
import MrDriller from "../../assets/images/projects/mr_driller.png";
import "./App.css";

/*****************************************************
 * Constants
 *****************************************************/

const fakeSituation = Content.fakeSituations.getRandom();

/*****************************************************
 * App
 *****************************************************/

function App() {
	/* ---- States ---------------------------------- */
	const cv = useCV();
	const presentationRef = useRef();
	const experiencesRef = useRef();
	const projetsRef = useRef();
	const contactRef = useRef();

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
				<NavigationLink href="#presentation" sectionRef={presentationRef}>Pr&eacute;sentation</NavigationLink>
				<NavigationLink href="#experiences" sectionRef={experiencesRef}>Exp&eacute;rience</NavigationLink>
				<NavigationLink href="#projets" sectionRef={projetsRef}>Projets</NavigationLink>
				<NavigationLink href="#contact" sectionRef={contactRef}>Contact</NavigationLink>
			</AppNavigation>

			<CVModal/>

			<section id="presentation" className="portfolio-section" ref={presentationRef}>
				<div className="about-content">
					<div className="welcome-msg">
						<span className="hello">Bonjour, je m&apos;appelle</span>
						<h1 className="my-name">Alexis Lecomte</h1>

						<div className="my-situation">
							<img className="fake-situation-img" src={fakeSituation.illustration} alt=""/>
							<span className="fake-situation animated-strikethrough always-on">{fakeSituation.name}</span>
							<span className="real-situation">&Eacute;tudiant en &eacute;cole d&apos;informatique</span>
						</div>

						<Button className="cv-btn" onClick={cv.show} decoration="❯">Consulter mon CV</Button>
					</div>

					<div className="profile-picture">
						<img src={ProfilePicture} alt="Une photographie de moi"/>
					</div>
				</div>
			</section>

			<section id="experiences" className="portfolio-section" ref={experiencesRef}>
				<h2>Exp&eacute;riences</h2>

				<Experiences experiences={Content.experiences}/>
			</section>

			<section id="projets" className="portfolio-section" ref={projetsRef}>
				<h2>Projets</h2>

				<div className="projects-grid">
					<Project name="Pond Simulator 2020" href="#" techs={["Java"]} img={PondSimulator2020}>
						Pond Simulator 2020 est un projet Java r&eacute;alis&eacute; au cours de ma seconde ann&eacute;e d&apos;&eacute;tude à SupInfo. Le programme simule, de manière simplifi&eacute;e et cartoonesque, la vie dans un lac, les canards qui y vivent, les n&eacute;nuphars qui y poussent et les r&eacute;gimes dictatorials qui &eacute;mergent du peuple ans&eacute;riforme.
					</Project>

					<Project name="Melodie" href="#" techs={["C#", "HTML", "CSS", "JavaScript"]}>
						Melodie est un site web permettant &grave; un utilisateur authentifi&eacute; d&apos;&eacute;couter des morceaux de musique depuis ses listes de lecture. Les musiques y sont ajout&eacute;es en entrant un lien ou un fichier audio.
					</Project>

					<Project name="Instabus" href="#" techs={["Kotlin"]} img={Instabus}>
						Instabus est une application Android produite &agrave; l&apos;issue d&apos;un projet scolaire. C&apos;est un r&eacute;seau social similaire &agrave; Instagram, mais avec un concept de niche. Les utilisateurs peuvent chercher des arr&ecirc;ts de bus dans Barcelone, s&apos;y prendre en photo et le partager au monde. Je l&apos;avais dit, concept de niche.
					</Project>

					<Project name="Mr. Driller clone" href="#" techs={["Python"]} img={MrDriller}>
						Y&apos;a pas de description
					</Project>
				</div>
			</section>

			<section id="contact" className="portfolio-section" ref={contactRef}>
				<h2>Contact</h2>

				<h3>Envie d&apos;en savoir plus ?</h3>
				<p>Contactez-moi par mail ou LinkedIn. Bon par contre il faut rallonger ce texte.</p>

				<SocialNetwork.LinkedIn/>

				<a className="link" href="mailto:alexis.lecomte@supinfo.com">Envoyer un mail</a>
			</section>

			<span>https://icones8.fr</span>
			<span>Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc.</span>


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
