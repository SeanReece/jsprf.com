import { createSelector } from 'reselect'

const benchmarksSelector = state => state.benchmarks
const isInProgress = state => state.benchmarks.inProgress

/**
 * Selector to query the store for an array of all benchmarks
 * @returns {Array}
 */
export const getAllBenchmarks = createSelector(
  benchmarksSelector,
  benchmarks => {
    const { inProgress, ...benches } = benchmarks
    return Object.values(benches)
  }
)

export const isBenchmarkingInProgress = createSelector(
  isInProgress,
  inProgress => inProgress
)

export const getFastestBenchmarks = createSelector(
  [getAllBenchmarks, isInProgress],
  (benchmarks, inProgress) => {
    if (inProgress) return []
    const benchmarkInstances = benchmarks.map(bench => bench.data)
    return window.Benchmark.filter(benchmarkInstances, 'fastest')
  }
)

export const getSlowestBenchmarks = createSelector(
  [getAllBenchmarks, isInProgress],
  (benchmarks, inProgress) => {
    if (inProgress) return []
    const benchmarkInstances = benchmarks.map(bench => bench.data)
    return window.Benchmark.filter(benchmarkInstances, 'slowest')
  }
)
