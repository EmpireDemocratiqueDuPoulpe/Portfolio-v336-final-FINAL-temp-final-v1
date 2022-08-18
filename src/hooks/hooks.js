/**
 * @module Hooks
 * @category Hooks
 * @author Alexis L. <alexis.lecomte@supinfo.com>
 */

/*****************************************************
 * Common functions
 *****************************************************/

/**
 * Check if the data object is usable (not loading and not null).
 * @callback isUsableFunction
 *
 * @return {boolean} - True if the data is usable, false otherwise
 */

/**
 * Invalidate current data to re-fetch it.
 * @callback invalidateAllFunction
 *
 * @return {void}
 */

/**
 * Retry to fetch the data. This function only works when the query has errors. Use invalidateAll() to re-fetch anytime().
 * @callback retryFunction
 *
 * @return {void}
 */

/*****************************************************
 * Common export
 *****************************************************/

/**
 * @typedef queryExport
 * @type {Object}
 *
 * @param {null|Array<*>} data
 * @param {boolean} isLoading
 * @param {isUsableFunction} isUsable
 * @param {invalidateAllFunction} invalidateAll
 * @param {retryFunction} retry
 */