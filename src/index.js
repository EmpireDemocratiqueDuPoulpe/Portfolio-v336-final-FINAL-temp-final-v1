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

// Disable the console in production
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
