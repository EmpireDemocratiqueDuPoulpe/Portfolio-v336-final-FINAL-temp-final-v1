/**
 * @module useClassName
 * @category Hooks
 * @subcategory DOM
 * @author Alexis L. <alexis.lecomte@supinfo.com>
 */

import { useRef, useEffect, useMemo, useCallback, useState} from "react";
import { isArray } from "lodash-es";

/*****************************************************
 * Functions of useClassName
 *****************************************************/

/**
 * Get a key from an optional key and the classname.
 * @callback getKeyFunction
 * @private
 *
 * @param {string} className - Classnames to add
 * @param {string|null} [key] - The optional key
 *
 * @return {string} - The key to use
 */

/**
 * Checks if a key exist.
 * @callback hasKeyFunction
 * @private
 *
 * @param {string} key
 *
 * @return {boolean}
 */

/**
 * Get all classnames after being processed with their conditions.
 * @callback getClassesFunction
 * @private
 *
 * @return {string} - The string of classnames separated by a single space
 */

/**
 * Delete a class or a batch of classes from its key.
 * @callback deleteFunction
 *
 * @param {string} key - Key used for deletion
 *
 * @return {void}
 */

/**
 * Sets the new classes without condition.
 * @callback setFunction
 *
 * @param {string|Array<string>} classNames - Classnames to add
 * @param {string|null} [key] - Optional key used for further processing. Use the className if null
 *
 * @return {void}
 */

/**
 * Sets the new classes if the condition is met.
 * @callback setIfFunction
 *
 * @param {*} condition
 * @param {string|Array<string>} classNamesIf - Classnames to add if the condition is met
 * @param {string|null} [key] - Optional key used for further processing. Use the classNameIf if null
 *
 * @return {void}
 */

/**
 * Sets the new classes from the first batch if the condition is met, and from the second batch otherwise.
 * @callback setIfElseFunction
 *
 * @param {*} condition
 * @param {string|Array<string>} classNamesIf - First batch of classnames
 * @param {string|Array<string>} classNamesElse - Second batch of classnames
 * @param {string|null} [key] - Optional key used for further processing. Use `%classNamesIf%/%classNamesElse%` if null
 *
 * @return {void}
 */

/*****************************************************
 * Hook callback
 *****************************************************/

/**
 * Classnames builder.
 * @callback HookBuilder
 *
 * @param {Object} hook
 * @param {setFunction} hook.set
 * @param {setIfFunction} hook.setIf
 * @param {setIfElseFunction} hook.setIfElse
 * @param {deleteFunction} hook.delete
 */

/*****************************************************
 * Hook
 *****************************************************/

/**
 * Checks if the dependencies have changed since the last render.
 * @function
 * @private
 *
 * @param {Array<*>} currentDeps - Current dependencies
 * @param {Array<*>} newDeps - New dependencies in props
 * @return {boolean} - Has dependencies changed ?
 */
function hasDepsChanged(currentDeps, newDeps) {
	if (currentDeps.length !== newDeps.length) return true;

	for (let i = 0; i < currentDeps.length; i++) {
		if (currentDeps[i] !== newDeps[i]) return true;
	}

	return false;
}

/**
 * Build a `className` string from classes defined in the hook.
 * @function
 *
 * @example
 * function Component({ someProp }) {
 *   const classes = useClassName(hook => {
 *     hook.set("Component");
 *     hook.setIf((someProp === 1), "yes-it's-one");
 *   }, [someProp]);
 *
 *   return <div className={classes}/>;
 * }
 *
 * @param {HookBuilder} builder - The builder function
 * @param {Array<*>} dependencies - The dependencies array
 * @return {string} - The `className` string
 */
function useClassName(builder, dependencies) {
	/* ---- States - Part one ----------------------- */
	const [className, setClassName] = useState(/** @type {string} */ "");
	const classes = useRef(/** @type {Object<string, string>} */ Object.create(null));
	const deps = useRef(/** @type {Array<*>} */ dependencies);

	if (hasDepsChanged(deps.current, dependencies)) {
		deps.current = dependencies;
	}

	/* ---- Functions ------------------------------- */
	/** @type {getKeyFunction} */
	const getKey = (className, key) => key ?? className;

	/** @type {hasKeyFunction} */
	const hasKey = useCallback(key => Object.prototype.hasOwnProperty.call(classes.current, key), []);

	/** @type {getClassesFunction} */
	const getClasses = useCallback(() => Object.values(classes.current).join(" "), []);

	/** @type {deleteFunction} */
	const delKey = useCallback(key => {
		if (hasKey(key)) {
			// `omitted` is not used. Yes, this is normal.
			// eslint-disable-next-line no-unused-vars
			const { [key]: omitted, ...rest } = classes.current;
			classes.current = rest;
		}
	}, [hasKey]);

	/** @type {setFunction} */
	const set = useCallback((classNames, key = null) => {
		if (!classNames) return;

		const newClasses = isArray(classNames) ? (classNames.join(" ")) : classNames;
		const targetKey = getKey(newClasses, key);

		if (!hasKey(targetKey) || (classes.current[targetKey] !== newClasses)) {
			classes.current = { ...classes.current, [targetKey]: newClasses };
		}
	}, [hasKey]);

	/** @type {setIfFunction} */
	const setIf = useCallback((condition, classNamesIf, key = null) => {
		if (condition) {
			set(classNamesIf, key);
		} else {
			delKey(getKey(classNamesIf, key));
		}
	}, [set, delKey]);

	/** @type {setIfElseFunction} */
	const setIfElse = useCallback((condition, classNameIf, classNameElse, key = null) => {
		set((condition ? classNameIf : classNameElse), (key ?? `${classNameIf}/${classNameElse}`));
	}, [set]);

	/* ---- States - Part two ----------------------- */
	const memoizedHook = useMemo(() => ({ set, setIf, setIfElse, delete: delKey }), [set, setIf, setIfElse, delKey]);

	useEffect(() => {
		if (builder) {
			builder(memoizedHook);
			setClassName(getClasses());
		}
		// We only want to update classnames when the dependencies have changed. The builder function must be the same.
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [deps.current]);

	/* ---- Expose hook ----------------------------- */
	return className;
}

export default useClassName;