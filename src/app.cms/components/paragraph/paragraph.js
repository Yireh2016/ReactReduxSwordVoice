import React from 'react'
import ElementCustomEdit from '../elementCustomEdit/elementCustomEdit'

//react map
/*

DashBoard
  CreatePost
    PostElement
     Paragraph


*/

const Paragraph = props => {
  return (
    <div className='elementContentLayout'>
      <div className='elementInput'>
        <textarea
          value={props.HTMLElementContent}
          name='HTMLElementContent'
          onChange={e => {
            props.inputTextHTMLHandler(e)
          }}
        >
          {props.HTMLElementContent}
        </textarea>
      </div>
      <ElementCustomEdit
        HTMLAtributes={props.HTMLAtributes}
        HTMLAtributesArr={props.HTMLAtributesArr}
        HTMLAtributesArrRemove={props.HTMLAtributesArrRemove}
        HTMLStyles={props.HTMLStyles}
        HTMLStylesArr={props.HTMLStylesArr}
        HTMLStylesArrRemove={props.HTMLStylesArrRemove}
        HTMLClasses={props.HTMLClasses}
        HTMLClassesArr={props.HTMLClassesArr}
        HTMLClassesArrRemove={props.HTMLClassesArrRemove}
        stylesHTMLHandler={props.stylesHTMLHandler}
        atributesHTMLHandler={props.atributesHTMLHandler}
        classesHTMLHandler={props.classesHTMLHandler}
      />
    </div>
  )
}

export default Paragraph
