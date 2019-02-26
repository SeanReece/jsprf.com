import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import './FileList.css'
import { IoMdClose, IoMdAdd } from 'react-icons/io'
import jsIcon from '../../images/js.svg'
import depIcon from '../../images/dependancy.svg'
import loadingIcon from '../../images/loading.svg'

function FileList({
  setup, scripts, dependancies, onAddScript, onRemoveScript, onUpdateScript, onAddSetup, onAddDependancy, onRemoveDependancy,
}) {
  const depInput = useRef()

  const handleDepSubmit = (e) => {
    e.preventDefault();
    onAddDependancy(depInput.current.value)
    depInput.current.value = ""
  }

  return (
    <React.Fragment>
      <ul className="filelist">
        <li key="setup-header" className="filelist__item__header">
          <span className="filelist__item__header__title">setup</span>
          {!setup && <IoMdAdd className="filelist__item__close" onClick={() => onAddSetup()} />}
        </li>
        {setup && (
          <li key="setup" className="filelist__item">
            <img src={jsIcon} className="filelist__item__icon" alt="js icon" />
            <span className="filelist__item__title">{setup.name}</span>
            <IoMdClose className="filelist__item__close" onClick={() => onRemoveScript(setup.id)} />
          </li>
        )}

        <li key="scripts-header" className="filelist__item__header">
          <span className="filelist__item__header__title">scripts</span>
          <IoMdAdd className="filelist__item__close" onClick={() => onAddScript('new')} />
        </li>
        {Object.values(scripts).map(script => (
          <li key={script.id} className="filelist__item">
            <img src={jsIcon} className="filelist__item__icon" alt="js icon" />
            <input type="text" className="filelist__item__title" value={script.name} onChange={(e) => onUpdateScript(script.id, { name: e.target.value })}></input>
            <IoMdClose className="filelist__item__close" onClick={() => onRemoveScript(script.id)} />
          </li>
        ))}
        <li key="dependancies-header" className="filelist__item__header">
          <span className="filelist__item__header__title">dependancies</span>
        </li>
        {Object.values(dependancies).map(dep => (
          <li key={dep.name} className="filelist__item">
            <img src={depIcon} className="filelist__item__icon" alt="js icon" />
            <span className="filelist__item__title">{dep.name}</span>
            <span className="filelist__item__version">{dep.version}</span>
            {dep.error && <span className="filelist__item__error">Not Found</span>}
            {dep.isLoading && <img src={loadingIcon} className="filelist__item__loading" alt="Loading icon" />}
            {!dep.isLoading && <IoMdClose className="filelist__item__close" onClick={() => onRemoveDependancy(dep.name)} />}
          </li>
        ))}
        <form onSubmit={handleDepSubmit}>
          <input type="text" className="filelist__dependancy__input" ref={depInput} placeholder="Search dependancies" />
        </form>
      </ul>
    </React.Fragment>
  )
}

FileList.propTypes = {
  setup: PropTypes.shape({}),
  scripts: PropTypes.arrayOf(PropTypes.object).isRequired,
  dependancies: PropTypes.arrayOf(PropTypes.object).isRequired,
  onAddScript: PropTypes.func.isRequired,
  onRemoveScript: PropTypes.func.isRequired,
  onAddDependancy: PropTypes.func.isRequired,
  onRemoveDependancy: PropTypes.func.isRequired,
}

FileList.defaultProps = {
  setup: undefined,
}

export default FileList
