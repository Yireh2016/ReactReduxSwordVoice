import React from "react";

//react map
/*

DashBoard
  CreatePost
    PostElement
     Paragraph


*/

const Paragraph = props => {
  const atributes = props.HTMLAtributesArr.map((atribute, i) => {
    return <li key={i}>{atribute}</li>;
  });

  const styles = props.HTMLStylesArr.map((style, i) => {
    return <li key={i}>{style}</li>;
  });
  const classes = props.HTMLClassesArr.map((clase, i) => {
    return <li key={i}>{clase}</li>;
  });
  return (
    <div>
      <div>
        <textarea
          value={props.HTMLElementContent}
          name="HTMLElementContent"
          onChange={e => {
            props.inputTextHTMLHandler(e);
          }}
        >
          {props.HTMLElementContent}
        </textarea>
      </div>
      <div className="elementAtributes">
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
    </div>
  );
};

export default Paragraph;
