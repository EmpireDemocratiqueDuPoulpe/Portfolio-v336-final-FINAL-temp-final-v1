import AppNavigation, { NavigationLink } from "../../components/AppNavigation/AppNavigation.js";
import SocialNetwork from "../../components/SocialNetwork/SocialNetwork.js";
import { Content } from "../../config/config.js";
import ProfilePicture from "../../assets/images/me.png";
import "./App.css";

function getSituation() {
	return Content.fakeSituations.list[Math.floor(Math.random() * Content.fakeSituations.list.length)];
}
const fakeSituation = Content.fakeSituations.enable ? getSituation() : null;

function App() {
	/* ---- Page content ---------------------------- */
	return (
		<div className="App">
			<AppNavigation>
				<NavigationLink href="#about-section">Pr&eacute;sentation</NavigationLink>
				<NavigationLink href="#experiences-section">Exp&eacute;rience</NavigationLink>
				<NavigationLink href="#projects-section">Projets</NavigationLink>
				<NavigationLink href="#contact-section">Contact</NavigationLink>
			</AppNavigation>

			<section id="about-section" className="portfolio-section">
				<div className="about-content">
					<div className="welcome-msg">
						<span className="hello">Bonjour</span>
						<h1 className="my-name">Je suis Alexis &lt;NOM FAMILLE?&gt;</h1>

						<div className="my-situation">
							<span className="fake-situation">{fakeSituation}</span>
							<span className="real-situation">&Eacute;tudiant en &eacute;cole d&apos;informatique.</span>
						</div>

						<button>Consulter mon CV &rarr;</button>
					</div>

					<div className="profile-picture">
						<img src={ProfilePicture} alt="Une photographie de moi"/>
					</div>
				</div>
			</section>

			<section id="experiences-section" className="portfolio-section">
			</section>

			<section id="projects-section" className="portfolio-section">
			</section>

			<section id="contact-section" className="portfolio-section">
				<h2>Contact</h2>

				<h3>Envie d&apos;en savoir plus ?</h3>
				<p>Contactez-moi par mail ou LinkedIn. Bon par contre il faut rallonger ce texte.</p>

				<SocialNetwork.LinkedIn/>

				<a href="mailto:alexis.lecomte@supinfo.com">Envoyer un mail</a>
			</section>

			<span>https://icones8.fr</span>
		</div>
	);
}

export default App;
