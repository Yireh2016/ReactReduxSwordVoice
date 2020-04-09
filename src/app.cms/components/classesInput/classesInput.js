import React, {Component} from 'react'
import {connect} from 'react-redux'
//components
import ClassEditor from '../classEditor/classEditor'

//assets
import plus from '../../assets/dashboard/plus.svg'
//css
import './classesInput.css'
class ClassesInput extends Component {
  constructor(props) {
    super(props)

    this.state = {
      classes: this.props.classes
        ? this.props.classes
        : [{name: '', styles: ''}]
    }
  }
  updateReduxClasses = classObjArr => {
    this.props.onAddClasses(classObjArr)
  }
  classesInputHandler = (e, i) => {
    const {
      target: {name, value}
    } = e

    if (!this.props.project.hasChanged) {
      this.props.onProjectChange()
    }
    this.setState(prevState => {
      let classObjArr = prevState.classes
      if (name === 'classesName') {
        classObjArr[i].name = value
      } else {
        classObjArr[i].styles = value
      }
      this.updateReduxClasses(classObjArr)
      return {classes: classObjArr}
    })
  }
  newClassHandler = () => {
    this.setState(prevState => {
      return {classes: [...prevState.classes, {name: '', styles: ''}]}
    })
  }
  render() {
    const arrClassesObj = this.state.classes
    const classesNumber = arrClassesObj.map((classObj, i) => {
      const {name, styles} = classObj
      return (
        <ClassEditor
          key={i}
          classesName={name}
          classesStyles={styles}
          classesInputHandler={e => {
            this.classesInputHandler(e, i)
          }}
        />
      )
    })
    return (
      <div className='flexColumnLayout'>
        {/* new class btn */}
        <div>
          <span className='right-float '>
            <button
              type='button'
              className='btn btn-info transparent flexRowLayout centerAlign'
            >
              <span className='btn-text'>New</span>
              <img
                className='btn-icon btn-icon--small'
                src={plus}
                alt='add new class'
                onClick={this.newClassHandler}
              />
            </button>
          </span>
        </div>
        {/* new class btn */}
        <div className='scrollY style-7 classesInputLayout'>
          {classesNumber}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    classes: state.postCreation.classes,
    project: state.postCreation.project
  }
}

const mapDispachToProps = dispach => {
  return {
    //acciones

    onAddClasses: payload => dispach({type: 'ADD_CLASSES', payload: payload}),
    onProjectChange: payload =>
      dispach({type: 'CHANGE_PROJECT', payload: payload})
  }
}

export default connect(mapStateToProps, mapDispachToProps)(ClassesInput)
