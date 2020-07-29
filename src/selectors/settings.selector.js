import { createSelector } from 'reselect'

const settingsSelector = state => state.settings

/**
 * Selector to query the store for the should transpile setting
 * @returns {boolean}
 */
export const shouldTranspile = createSelector(
  settingsSelector,
  settings => !!settings.shouldTranspile
)