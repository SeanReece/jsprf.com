import { createSelector } from 'reselect'

import { SETUP_ID } from '../util/scriptDefaults'

const scriptsSelector = state => state.scripts

/**
 * Selector to query the store for the single setup script object
 * @returns {Object}
 */
export const getSetupScript = createSelector(
  scriptsSelector,
  scripts => scripts[SETUP_ID]
)

/**
 * Selector to retrieve all non setup scripts.
 * @returns {Array}
 */
export const getScripts = createSelector(
  scriptsSelector,
  scripts => Object.values(scripts).filter(script => script.id !== SETUP_ID)
)
