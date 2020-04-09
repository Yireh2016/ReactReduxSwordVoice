import React from 'react'
//components
import EditIcon from '../editableIcons/edit'
import DeleteIcon from '../editableIcons/deleteIcon'

const ClassEditor = ({classesName, classesStyles, classesInputHandler}) => {
  return (
    <div className='padding--small '>
      {/* classname Input */}
      <div className='flexColumnLayout padding--small'>
        <span className='bold'>Class Name:</span>
        <input
          style={{border: 'none'}}
          type='text'
          name='classesName'
          value={classesName}
          onChange={classesInputHandler}
          className='halfWidth borderRadius--small padding--small'
        />
      </div>
      {/* classname Input */}

      {/* styles Input */}
      <div className='flexColumnLayout padding--small'>
        <span className='bold'>Styles:</span>
        <textarea
          className='classesInputText borderRadius--small '
          name='classesStyles'
          value={classesStyles}
          onChange={classesInputHandler}
        />
      </div>
      {/* styles Input */}
      <div className='flexRowLayout right-flex'>
        <button className='btn transparent margin--small'>
          <EditIcon className='icon--small' color='white' />
        </button>
        <button className='btn transparent margin--small'>
          <DeleteIcon className='icon--small' color='white' />
        </button>
      </div>
    </div>
  )
}

export default ClassEditor
