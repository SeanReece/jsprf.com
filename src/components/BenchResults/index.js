import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Prism from 'prismjs'
import domtoimage from 'dom-to-image'

import { isBenchmarkingInProgress, getAllBenchmarks, getFastestBenchmarks, getSlowestBenchmarks } from '../../selectors/bench.selector'
import { formatOPS } from '../../util'
import 'prismjs/themes/prism-tomorrow.css'
import './BenchResults.css'

class BenchResults extends React.Component {
  myRef = React.createRef();
  componentDidUpdate(){
    Prism.highlightAll()
    domtoimage.toPng(this.myRef.current)
    .then(function (dataUrl) {
        var img = new Image();
        img.src = dataUrl;
        document.body.appendChild(img);
    })
    .catch(function (error) {
        console.error('oops, something went wrong!', error);
    });
  }

  renderItem = (bench, fastest, slowest) => {
    const fast = fastest.some(f => f.id === bench.id)
    const slow = slowest.some(f => f.id === bench.id)

    return (
      <div className="wrap-collabsible">
        <input id={`collapsible-${bench.id}`} className="toggle" type="checkbox"/>
        <label htmlFor={`collapsible-${bench.id}`} className={`lbl-toggle ${fast && 'lbl-toggle--fast'} ${slow && 'lbl-toggle--slow'}`}>
          <span className="results">
            <span className="results__name">{bench.data.name}</span>
            <span className="results__ops">{formatOPS(bench.data)}</span>
            {bench.inProgress && <div className="loader results__loading"></div> }
          </span>
        </label>
        <div className="collapsible-content">
          <div className="content-inner">
            <pre><code className="language-javascript">{bench.data.fn}</code></pre>
          </div>
        </div>
      </div>
    )
  }

  render() {

    const { benchmarks, fastestBenchmarks, slowestBenchmarks } = this.props
    return (
      <div ref={this.myRef}>
        {Object.keys(benchmarks).length > 1 &&
          <ul>
            {Object.values(benchmarks).map(bench => (
              <li key={bench.id}>
                {this.renderItem(bench, fastestBenchmarks, slowestBenchmarks)}
              </li>
            ))}
          </ul>
        }
      </div>
    )
  }
}

BenchResults.propTypes = {
  benchmarks: PropTypes.arrayOf(PropTypes.object).isRequired
}

const mapStateToProps = (state) => {
  return {
    dependancies: state.dependancies,
    inProgress: isBenchmarkingInProgress(state),
    benchmarks: getAllBenchmarks(state),
    fastestBenchmarks: getFastestBenchmarks(state),
    slowestBenchmarks: getSlowestBenchmarks(state)
  }
}

export default connect(
  mapStateToProps,
  {}
)(BenchResults)

