/**
 * @module Navigation
 * @category Contexts
 * @author Alexis L. <alexis.lecomte@supinfo.com>
 */

import { createContext, useContext, useRef, useEffect, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import useDocumentTitleContext from "../DocumentTitle/DocumentTitleContext.js";
import useScrollContext from "../Scroll/ScrollContext.js";

/*****************************************************
 * Typedefs
 *****************************************************/

/** @typedef {React.Context<null|Object>} NavigationCtx */

/**
 * @typedef {Object} Link
 *
 * @property {number} domIndex - Index of the element in its parent.
 * @property {HTMLElement} linkRef - Reference to the HTML element of the link.
 * @property {HTMLElement} sectionRef - Reference to the HTML element of the section associated with this link.
 */

/*****************************************************
 * Constants
 *****************************************************/

/**
 * @const
 * @private
 * @type {NavigationCtx}
 */
const NavigationContext = createContext(null);

const CURRENT_LINK_CLASS = "current";

/*****************************************************
 * NavigationProvider
 *****************************************************/
export function NavigationProvider({ children }) {
	/* ---- States ---------------------------------- */
	const docTitle = useDocumentTitleContext();
	const scroll = useScrollContext();
	const links = useRef(/** @type {Array<Link>} */ []);

	/* ---- Functions ------------------------------- */
	const getElementIndex = element => {
		let index = 0;
		while ((element = element.previousSibling) != null) {
			index++;
		}

		return index;
	};

	const getArrayIndex = useCallback(linkRef => links.current.findIndex(l => l.linkRef === linkRef), []);

	const createLink = (domIndex, linkRef, sectionRef) => ({ domIndex, linkRef, sectionRef });

	const addLink = useCallback((linkRef, sectionRef) => {
		if (!linkRef || !linkRef.current || !sectionRef || !sectionRef.current) return;

		// Skip the link if it is in the menu
		if (linkRef.current.parentNode.dataset.isMenu) return;

		const domIndex = getElementIndex(linkRef.current);
		const arrIndex = getArrayIndex(linkRef.current);

		// Only add the link if it doesn't exist already.
		if (arrIndex === -1) {
			links.current = sortLinks([...links.current, createLink(domIndex, linkRef.current, sectionRef.current)]);
		}
	}, [getArrayIndex]);

	const removeLink = useCallback(linkRef => {
		if (!linkRef || !linkRef.current) return;
		links.current = links.current.filter(l => l.linkRef !== linkRef.current);
	}, []);

	const selectLink = useCallback(link => {
		if (!link.linkRef.classList.contains(CURRENT_LINK_CLASS)) {
			// Deselect all links
			links.current.map(l => { if (l.domIndex !== link.domIndex) l.linkRef.classList.remove(CURRENT_LINK_CLASS); });

			// Select the good one
			link.linkRef.classList.add(CURRENT_LINK_CLASS);
			docTitle.setPrefix(link.linkRef.innerText);
		}
	}, [docTitle]);

	const sortLinks = arr => arr.sort((linkA, linkB) => linkA.domIndex - linkB.domIndex);
	const sortLinksBySection = arr => arr.sort((linkA, linkB) => linkA.sectionRef.offsetTop - linkB.sectionRef.offsetTop);

	/* ---- Effects --------------------------------- */
	useEffect(() => {
		const handleScroll = scrollBox => {
			const sortedLinks = sortLinksBySection(links.current);
			if (sortedLinks) {
				let selectedLink = sortedLinks[0];

				// We skip the first element since it's selected by default.
				for (const link of sortedLinks.slice(1)) {
					if ((link.sectionRef.offsetTop - (link.sectionRef.offsetHeight / 2)) <= scrollBox.scrollTop) {
						selectedLink = link;
					} else break;
				}

				selectLink(selectedLink);
			}
		};

		// Run this function once before the scroll event to update navigation links on DOM load.
		if (scroll.getAPI()) {
			handleScroll({ scrollTop: scroll.getAPI().getScrollTop() });
		}

		scroll.addListener(handleScroll);
		return () => scroll.removeListener(handleScroll);
	}, [scroll, selectLink]);

	/* ---- States - Part two ----------------------- */
	const memoizedContext = useMemo(() => ({ addLink, removeLink }), [addLink, removeLink]);

	/* ---- Page content ---------------------------- */
	return (
		<NavigationContext.Provider value={memoizedContext}>
			{children}
		</NavigationContext.Provider>
	);
}
NavigationProvider.propTypes = { children: PropTypes.node };

/*****************************************************
 * Hook
 *****************************************************/

/**
 * Returns the `NavigationContext`.
 * @function
 *
 * @return {NavigationCtx|Object}
 */
export default function useNavigationContext() {
	return useContext(NavigationContext);
}
