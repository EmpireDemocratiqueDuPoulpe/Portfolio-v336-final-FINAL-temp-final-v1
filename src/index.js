import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App/App.js";
import { DocumentTitleProvider } from "./context/DocumentTitle/DocumentTitleContext.js";
import { ScrollProvider } from "./context/Scroll/ScrollContext.js";
import { CVProvider } from "./context/CV/CVContext.js";
// import reportWebVitals from "./reportWebVitals";
import "normalize.css";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<DocumentTitleProvider>
		<ScrollProvider>
			<CVProvider>
				<React.StrictMode>
					<App/>
				</React.StrictMode>
			</CVProvider>
		</ScrollProvider>
	</DocumentTitleProvider>
);

// Print a custom message to the console
const commonCSS = "font-family: \"Noto sans\", \"Segoe UI\", sans-serif;";
const titleCSS = `${commonCSS} font-size: 2.5em; padding: 20px 0; color: #C91F37; font-weight: bold;`;
console.log("%c///   %cRestricted Area   %c///", `${titleCSS} padding-left: 30px;`, titleCSS, titleCSS);

console.log("%cCet endroit ne sert qu'aux développeurs. Écrire ou coller quelque chose ici pourrait compromettre vos données. Veuillez fermer cette fenêtre si vous n'êtes pas absolument certain de ce que vous faites.", commonCSS);

const secretCSS = `${commonCSS} font-size: 0.7em; color: rgba(255, 255, 255, 0.3)`;
console.log("%cSecret code: %c68 74 74 70 73 3a 2f 2f 77 77 77 2e 79 6f 75 74 75 62 65 2e 63 6f 6d 2f 77 61 74 63 68 3f 76 3d 64 51 77 34 77 39 57 67 58 63 51", `font-weight: bold; ${secretCSS}`, secretCSS);

console.log("%c//////////////////////////", `${titleCSS} padding-left: 30px;`);

// Disable the console in production
// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === "production") {
	/* eslint-disable no-unused-vars */
	console.log = (..._) => {};
	console.warn = (..._) => {};
	console.error = (..._) => {};
	console.debug = (..._) => {};
	/* eslint-enable no-unused-vars */
}

// TODO: If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
