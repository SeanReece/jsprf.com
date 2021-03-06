import _ from 'lodash'
import process from 'process'
import ReactGA from 'react-ga'
import { transform, createConfigItem } from "@babel/core"
import presetEnv from '@babel/preset-env'
import { getSetupScript, getScripts } from '../selectors/scripts.selector'
import { shouldTranspile } from '../selectors/settings.selector'

const Benchmark = require('benchmark').runInContext({ _, process })
window.Benchmark = Benchmark

export const BENCHMARK_START = 'BENCHMARK_START'
export const BENCHMARK_COMPLETE = 'BENCHMARK_COMPLETE'
export const SCRIPT_BENCHMARK_ADD = 'SCRIPT_BENCHMARK_ADD'
export const SCRIPT_BENCHMARK_START = 'SCRIPT_BENCHMARK_START'
export const SCRIPT_BENCHMARK_COMPLETE = 'SCRIPT_BENCHMARK_COMPLETE'
export const SCRIPT_BENCHMARK_ERROR = 'SCRIPT_BENCHMARK_ERROR'

export const startBenchmark = () => async (dispatch, getState) => {
  const suite = new Benchmark.Suite()
  const state = getState()
  const scripts = getScripts(state)
  const setup = getSetupScript(state)
  const shouldTranspileSetting = shouldTranspile(state)

  ReactGA.event({
    category: 'benchmark',
    action: 'start',
    value: scripts.length
  });

  dispatch({ type: BENCHMARK_START })

  scripts.forEach(script => {
    let transCode
    let setupTransCode
    if (shouldTranspileSetting) {
      try {
        transCode = transform(script.value, {presets: [createConfigItem(presetEnv)]})
        setupTransCode = transform(setup.value, {presets: [createConfigItem(presetEnv)]})
      } catch (error) {
        dispatch({ type: SCRIPT_BENCHMARK_ERROR, payload: { id: script.id, error } })
      }
    }
    const bench = suite.add(script.name, transCode ? transCode.code : script.value, {
      id: script.id,
      setup: setupTransCode ? setupTransCode.code: setup.value,
      onStart: () => {
        dispatch({ type: SCRIPT_BENCHMARK_START, payload: { id: script.id } })
      },
      onComplete: (result) => {
        dispatch({ type: SCRIPT_BENCHMARK_COMPLETE, payload: { id: script.id } })
      },
      onError: (error) => {
        dispatch({ type: SCRIPT_BENCHMARK_ERROR, payload: { id: script.id, error } })
      },
    })
    dispatch({ type: SCRIPT_BENCHMARK_ADD, payload: bench[bench.length-1] })
  });
  suite
    .on('complete', (data) => {
      dispatch({ type: BENCHMARK_COMPLETE })
    })
    // run async
    .run({ async: true })
}
