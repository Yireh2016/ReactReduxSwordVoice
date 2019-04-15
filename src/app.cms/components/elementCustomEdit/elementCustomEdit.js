import React from "react";
//css
import "./elementCustomEdit.css";
//assets
import plus from "../../assets/dashboard/plus.svg";
import subs from "../../assets/createPost/subs.svg";

const ElementCustomEdit = props => {
  const atributes = props.HTMLAtributesArr.map((atribute, i) => {
    return (
      <li key={i}>
        <span>{atribute}</span>
        <img
          onClick={() => {
            props.HTMLAtributesArrRemove(i);
          }}
          src={subs}
          alt="add atribute"
        />
      </li>
    );
  });

  const styles = props.HTMLStylesArr.map((style, i) => {
    return (
      <li key={i}>
        <span>{style}</span>
        <img
          onClick={() => {
            props.HTMLStylesArrRemove(i);
          }}
          src={subs}
          alt="add style"
        />
      </li>
    );
  });
  const classes = props.HTMLClassesArr.map((clase, i) => {
    return (
      <li key={i}>
        <span>{clase}</span>
        <img
          onClick={() => {
            props.HTMLClassesArrRemove(i);
          }}
          src={subs}
          alt="remove class"
        />
      </li>
    );
  });
  return (
    <React.Fragment>
      <div className="elementAtributes">
        Atributes
        <div className="elementAtributesInputCont">
          <div className="elementAtributesInput">
            <input
              type="text"
              name="HTMLAtributes"
              value={props.HTMLAtributes}
              onChange={e => props.atributesHTMLHandler(e)}
            />
            <img
              src={plus}
              onClick={e => {
                props.atributesHTMLHandler(e, true);
              }}
              alt="add atribute"
            />
          </div>

          <ul>{atributes}</ul>
        </div>
      </div>
      <div className="elementStyles">
        Styles
        <div className="elementAtributesInputCont">
          <div className="elementAtributesInput">
            <input
              type="text"
              name="HTMLStyles"
              value={props.HTMLStyles}
              onChange={e => props.stylesHTMLHandler(e)}
            />
            <img
              onClick={e => {
                props.stylesHTMLHandler(e, true);
              }}
              src={plus}
              alt="add style"
            />
          </div>
          <ul>{styles}</ul>
        </div>
      </div>
      <div className="elementClasses">
        Classes
        <div className="elementAtributesInputCont">
          <div className="elementAtributesInput">
            <input
              type="text"
              name="HTMLClasses"
              value={props.HTMLClasses}
              onChange={e => props.classesHTMLHandler(e)}
            />
            <img
              onClick={e => {
                props.classesHTMLHandler(e, true);
              }}
              src={plus}
              alt="add classes"
            />
          </div>
          <ul>{classes}</ul>
        </div>
      </div>

      {props.imageElement && (
        <React.Fragment>
          <div className="elementAltAttr">
            Alt
            <div>
              <input
                type="text"
                name="imgAlt"
                value={props.imgAlt}
                onChange={e => props.atrImgHTMLHandler(e)}
              />
            </div>
          </div>
          <div className="elementFigCaption">
            FigCaption
            <div>
              <input
                type="text"
                name="imgFigcaption"
                value={props.imgFigcaption}
                onChange={e => props.atrImgHTMLHandler(e)}
              />
            </div>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default ElementCustomEdit;
