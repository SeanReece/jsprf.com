export const generateId = () => Math.random().toString(36).substr(2, 9)

export const formatOPS = (benchmark) => {
  if (benchmark.hz && benchmark.stats ) return window.Benchmark.formatNumber(benchmark.hz.toFixed(benchmark.hz < 100 ? 2 : 0)) + ' ops/sec (\xb1' + benchmark.stats.rme.toFixed(2) + '%)'
}
