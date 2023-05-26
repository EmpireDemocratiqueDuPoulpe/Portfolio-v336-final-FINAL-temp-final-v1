/**
 * @module App
 * @category Pages
 * @author Alexis L. <alexis.lecomte@supinfo.com>
 */

import { useRef, useEffect, lazy, Suspense } from "react";
import { NavigationProvider } from "../../context/Navigation/NavigationContext.js";
import useScrollContext from "../../context/Scroll/ScrollContext.js";
import useCV from "../../context/CV/CVContext.js";
import useWindowSize from "../../hooks/windowSize/useWindowSize.js";
import { Scrollbars } from "react-custom-scrollbars-2";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen.js";
import Loader from "../../components/Loader/Loader.js";
import StarSky from "../../components/StarSky/StarSky.js";
import RevealScroll from "../../components/RevealScroll/RevealScroll.js";
import SectionArt from "../../components/SectionArt/SectionArt.js";
import WebP from "../../components/WebP/WebP.js";
import Button from "../../components/Button/Button.js";
import AppNavigation, { NavigationLink } from "../../components/AppNavigation/AppNavigation.js";
import CVModal from "../../components/CVModal/CVModal.js";
import Experiences from "../../components/Experiences/Experiences.js";
import Project from "../../components/Project/Project.js";
import SocialNetwork from "../../components/SocialNetwork/SocialNetwork.js";
const Map = lazy(() => import("../../components/Map/Map.js"));
import { Content, Map as MapConfig } from "../../config/config.js";
import "./App.css";

/*****************************************************
 * Constants
 *****************************************************/

/**
 * A fake situation, because it's funny. ඞ
 * @const
 * @readonly
 * @type {{ name: string, image: { src: string, fallback: string } }}
 */
const fakeSituation = Content.fakeSituations.getRandom();

/*****************************************************
 * App
 *****************************************************/

function App() {
	/* ---- States ---------------------------------- */
	const scroll = useScrollContext();
	const cv = useCV();
	const { width: windowWidth } = useWindowSize();
	const scrollbar = useRef(/** @type {Object|null} */ null);
	const clipPathPropName = useRef(/** @type {string|-1|null} */ null);
	const AppContentRef = useRef(/** @type {HTMLElement|null} */ null);
	const presentationRef = useRef(/** @type {Element|null} */ null);
	const experiencesRef = useRef(/** @type {Element|null} */ null);
	const projetsRef = useRef(/** @type {Element|null} */ null);
	const contactRef = useRef(/** @type {Element|null} */ null);

	/* ---- Effects --------------------------------- */
	useEffect(() => {
		const handleScroll = scrollBox => {
			if (AppContentRef.current) {
				// Get the property name
				if (!clipPathPropName.current) {
					// Un-prefixed
					if (AppContentRef.current.style.clipPath !== null) {
						clipPathPropName.current = "clipPath";
					} else {
						// Prefixed
						for (const vendor in ["Webkit", "webkit", "Moz"]) {
							const fullName = `${vendor}ClipPath`;

							if (AppContentRef.current.style[fullName] !== null) {
								clipPathPropName.current = fullName;
								break;
							}
						}

						// Unknown
						if (!clipPathPropName.current) {
							clipPathPropName.current = -1;
						}
					}
				}

				if (clipPathPropName.current && (clipPathPropName.current !== -1)) {
					AppContentRef.current.style[clipPathPropName.current] = `inset(${scrollBox.scrollTop + 60}px 0 0 0)`;
				}
			}
		};

		scroll.addListener(handleScroll);
		return () => scroll.removeListener(handleScroll);
	}, [scroll]);

	useEffect(() => {
		scroll.setAPI(scrollbar.current);
		// We simply want to update the API.
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [scrollbar.current]);

	/* ---- Page content ---------------------------- */
	return (
		<>
			{/* eslint-disable react/prop-types */}
			<Scrollbars
				className="App-scrollbar"
				ref={scrollbar}
				renderView={props => <div {...props} className="scrollbar-view" style={{ ...props?.style, overflowX: "hidden" }}/>}
				renderTrackVertical={({ style, ...props }) => <div {...props} style={{ top: "2px", right: "2px", bottom: "2px", ...style }} className="scrollbar-vertical-track"/>}
				renderThumbVertical={props => <div {...props} className="scrollbar-vertical-thumb"/>}
				autoHeight={true} autoHeightMin="100%" autoHeightMax="100vh"
				autoHide={false}
				onScrollFrame={scroll.handleScroll}>
				<div className="App">
					{/* eslint-enable react/prop-types */}
					<LoadingScreen enabled/>

					<NavigationProvider>
						<AppNavigation>
							<NavigationLink href="#presentation" sectionRef={presentationRef}>Pr&eacute;sentation</NavigationLink>
							<NavigationLink href="#experiences" sectionRef={experiencesRef}>Exp&eacute;rience</NavigationLink>
							<NavigationLink href="#projets" sectionRef={projetsRef}>Projets</NavigationLink>
							<NavigationLink href="#contact" sectionRef={contactRef}>Contact</NavigationLink>
						</AppNavigation>
					</NavigationProvider>

					<CVModal/>

					<div className="App-content" ref={AppContentRef}>
						<div className="App-padded-content">
							<section id="presentation" className="portfolio-section" ref={presentationRef}>
								<StarSky/>
								{fakeSituation.image && (
									<WebP className="fake-situation-img" src={fakeSituation.image.src} fallback={fakeSituation.image.fallback} alt=""/>
								)}

								<div className="about-content">
									<div className="welcome-msg">
										<h1 className="my-name title-font">Alexis Lecomte</h1>

										<div className="my-situation">
											<span className="real-situation title-font">{Content.realSituation}</span>
											<span className="fake-situation animated-strikethrough always-on">{fakeSituation.name}</span>
										</div>

										<Button className="cv-btn" onClick={cv.show} decoration="❯">Consulter mon CV</Button>
									</div>

									<div className="profile-picture">
										<WebP className="profile-picture-img" src="me.webp" fallback="me.png" alt="Une photographie de moi"/>
									</div>
								</div>
							</section>

							<RevealScroll>
								<section id="experiences" className="portfolio-section" ref={experiencesRef}>
									<h2 className="title-font">Exp&eacute;riences</h2>

									<Experiences experiences={Content.experiences}/>
								</section>
							</RevealScroll>

							<RevealScroll>
								<section id="projets" className="portfolio-section" ref={projetsRef}>
									<h2 className="title-font">Projets</h2>

									<div className="projects-grid">
										{Content.projects.map((project, index) => (
											<Project key={`project-${project.name}-${index}`} name={project.name} techs={project.techs} img={project.image} href={project.link.href} windowTitle={project.windowTitle} schoolProject={project.schoolProject}>
												{project.description}
											</Project>
										))}

										{windowWidth >= 1100 && <div className="dummy-element"/>}

										<div className="see-more-projects">
											<a className="link see-more" href={`${Content.contact.gitHubURI}?tab=repositories&type=source`}>Voir plus de projets ❯</a>
										</div>
									</div>


								</section>
							</RevealScroll>

							<SectionArt translateY="-125%" mobile={false} tablet={false} printer={false}>
								<WebP className="rocket" src="misc/rocket.webp" fallback="misc/rocket.gif" alt=""/>
							</SectionArt>

							<RevealScroll>
								<section id="contact" className="portfolio-section" ref={contactRef}>
									<h2 className="title-font">Contact</h2>

									<div className="contact-content">
										<h3>Envie d&apos;en savoir plus ?</h3>

										<p className="contact-explanation">
											{Content.contact.hired ? (
												<>
													<span className="emphasis">Je suis déjà en contrat dans une entreprise.</span>
													&nbsp;Cependant, je reste ouvert aux propositions d&apos;embauche.
													Si vous &ecirc;tes int&eacute;ress&eacute;, vous pouvez me contacter
													par LinkedIn ou m&apos;envoyer directement un e-mail.
													Vous pouvez &eacute;galement consulter mon profil GitHub sur lequel
													s&apos;y trouve la plupart de mes projets personnels.
												</>
											) : (
												<>
													Je suis ouvert aux propositions d&apos;embauche !
													Si vous &ecirc;tes int&eacute;ress&eacute;, vous pouvez me contacter
													par LinkedIn ou m&apos;envoyer directement un e-mail.
													Vous pouvez &eacute;galement consulter mon profil GitHub sur lequel
													s&apos;y trouve la plupart de mes projets personnels.
												</>
											)}
										</p>

										<div className="contact-links">
											<div className="contact-networks">
												<SocialNetwork.LinkedIn href={Content.contact.linkedInURI}/>
												<SocialNetwork.GitHub href={Content.contact.gitHubURI}/>
											</div>

											<div className="contact-sep"/>

											<div className="contact-mail">
												<Button href={`mailto:${Content.contact.mailAddress}`} decoration="✉">
													Envoyer un mail
												</Button>
											</div>
										</div>

										<Suspense fallback={<Loader size="medium"/>}>
											<Map lat={MapConfig.center.lat} lng={MapConfig.center.lng} markers={MapConfig.markers}/>
										</Suspense>
									</div>
								</section>
							</RevealScroll>
						</div>

						<footer>
							<figure className="stylish-quote">
								<blockquote>
									&#x201C;Le voyageur est arrivé au bout du chemin. Il peut désormais <span className="emphasis">&laquo;&nbsp;swipe-up&nbsp;&raquo;</span> pour retrouver les informations de contact.&#x201D;
								</blockquote>

								<figcaption>
									&mdash; Gandalf le gris, <cite>24 janvier 3019</cite>
								</figcaption>
							</figure>

							<div className="licensing">
								<p className="copyright my-copyright">Copyright &copy; Alexis Lecomte - {new Date().getFullYear()}</p>

								<p className="copyright fontawesome-copyright">
									Font Awesome Pro 6.1.2 by <a className="link" href="https://fontawesome.com" target="_blank" rel="noreferrer">@fontawesome</a>
									&nbsp;- <a className="link" href="https://fontawesome.com/license/free" target="_blank" rel="noreferrer">License</a>
									&nbsp;(Commercial License) - Copyright 2022 Fonticons, Inc.
								</p>
							</div>
						</footer>
					</div>
				</div>
			</Scrollbars>
		</>
	);
}

export default App;
