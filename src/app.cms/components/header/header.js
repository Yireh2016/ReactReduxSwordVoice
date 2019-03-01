import React from "react";
//componets
import ElementCustomEdit from "../elementCustomEdit/elementCustomEdit";

//react map
/*

DashBoard
  CreatePost (container)
    PostElement (preview and control)
      Header (Header element)

*/

const Header = props => {
  // const atributes = props.HTMLAtributesArr.map((atribute, i) => {
  //   return <li key={i}>{atribute}</li>;
  // });

  // const styles = props.HTMLStylesArr.map((style, i) => {
  //   return <li key={i}>{style}</li>;
  // });
  // const classes = props.HTMLClassesArr.map((clase, i) => {
  //   return <li key={i}>{clase}</li>;
  // });
  return (
    <div className="elementContentLayout">
      <div className="elementInput">
        <label>
          Header
          <textarea
            style={{ display: "block" }}
            type="text"
            onChange={e => {
              props.inputTextHTMLHandler(e);
            }}
            name="HTMLElementContent"
            value={props.HTMLElementContent}
          />
        </label>
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
      {/* <div className="elementAtributes">
        Atributes
        <div>
          <input
            type="text"
            name="HTMLAtributes"
            value={props.HTMLAtributes}
            onChange={e => props.atributesHTMLHandler(e)}
          />
          <ul>{atributes}</ul>
        </div>
      </div>
      <div className="elementStyles">
        Styles
        <div>
          <input
            type="text"
            name="HTMLStyles"
            value={props.HTMLStyles}
            onChange={e => props.stylesHTMLHandler(e)}
          />
          <ul>{styles}</ul>
        </div>
      </div>
      <div className="elementClasses">
        Classes
        <div>
          <input
            type="text"
            name="HTMLClasses"
            value={props.HTMLClasses}
            onChange={e => props.classesHTMLHandler(e)}
          />
          <ul>{classes}</ul>
        </div>
      </div>
    */}
    </div>
  );
};

export default Header;
