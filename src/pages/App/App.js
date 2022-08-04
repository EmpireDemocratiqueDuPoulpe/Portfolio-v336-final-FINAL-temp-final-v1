import AppNavigation, { NavigationLink } from "../../components/AppNavigation/AppNavigation.js";
import "./App.css";

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
			</section>

			<section id="experiences-section" className="portfolio-section">
			</section>

			<section id="projects-section" className="portfolio-section">
			</section>

			<section id="contact-section" className="portfolio-section">
			</section>
		</div>
	);
}

export default App;
