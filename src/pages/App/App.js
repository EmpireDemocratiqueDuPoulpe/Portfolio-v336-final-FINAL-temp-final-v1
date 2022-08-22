import { useRef, useEffect } from "react";
import useCV from "../../context/CV/CVContext.js";
import Button from "../../components/Button/Button.js";
import AppNavigation, { NavigationLink } from "../../components/AppNavigation/AppNavigation.js";
import CVModal from "../../components/CVModal/CVModal.js";
import Experiences from "../../components/Experiences/Experiences.js";
import Project from "../../components/Project/Project.js";
import SocialNetwork from "../../components/SocialNetwork/SocialNetwork.js";
import Map from "../../components/Map/Map.js";
import { Content, Map as MapConfig } from "../../config/config.js";
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

			<div className="App-content">
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
					<Map lat={MapConfig.center.lat} lng={MapConfig.center.lng} markers={MapConfig.markers}/>
				</section>
			</div>

			<footer>
				<figure className="stylish-quote">
					<blockquote>
						&#x201C;Le voyageur est arrivé au bout du chemin. Il peut désormais <span className="emphasis">&laquo;&nbsp;swipe-up&nbsp;&raquo;</span> pour retrouver les informations de contact.&#x201D;
					</blockquote>

					<figcaption>
						&mdash; Gandalf le cric, <cite>Le senior des zigotos</cite>
					</figcaption>
				</figure>

				<div className="licensing">
					<p className="copyright my-copyright">Copyright &copy; Alexis Lecomte - 2022</p>

					<p className="copyright fontawesome-copyright">
						Font Awesome Pro 6.1.2 by <a className="link" href="https://fontawesome.com">@fontawesome</a>
						&nbsp;- <a className="link" href="https://fontawesome.com/license">License</a> (Commercial License)
						- Copyright 2022 Fonticons, Inc.
					</p>
				</div>
			</footer>
		</div>
	);
}

export default App;
