/**
 * @module usePrint
 * @category Hooks
 * @subcategory DOM
 * @author Alexis L. <alexis.lecomte@supinfo.com>
 */

import { useState, useEffect } from "react";

/*****************************************************
 * Hook
 *****************************************************/

/**
 * Returns true if the page is currently being processed for printing.
 * @function
 *
 * @example
 * function Component() {
 *   const isPrinting = usePrint();
 *
 *   return isPrinting ? <div/> : <div>...</div>;
 * }
 *
 * @return {boolean} - Is the page being printed?
 */
function usePrint() {
	/* ---- States ---------------------------------- */
	const [isPrinting, setIsPrinting] = useState(false);

	/* ---- Effects --------------------------------- */
	useEffect(() => {
		const handleBeforePrint = () => { setIsPrinting(true); };
		const handleAfterPrint = () => { setIsPrinting(false); };

		window.addEventListener("beforeprint", handleBeforePrint);
		window.addEventListener("afterprint", handleAfterPrint);

		return () => {
			window.removeEventListener("beforeprint", handleBeforePrint);
			window.removeEventListener("afterprint", handleAfterPrint);
		};
	}, []);

	/* ---- Expose hook ----------------------------- */
	return isPrinting;
}

export default usePrint;