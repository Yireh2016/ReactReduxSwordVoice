const initialState = {
  elements: []
};
//estado inicial viene del CONFIG REDUCER.JS
const postEditCtlreducer = (state = initialState, action) => {
  let newState = state;

  switch (action.type) {
    case "CREATE_ELEMENT": {
      const newElement = {
        HTMLElementType: "",
        HTMLElementContent: "",
        HTMLAtributes: "",
        HTMLAtributesArr: [],
        HTMLAtributesStr: "",
        finalJSXElement: "",
        HTMLStyles: "",
        HTMLStylesStr: "",
        HTMLStylesArr: [],
        HTMLClasses: "",
        HTMLClassesArr: [],
        HTMLClassesStr: "",
        isEditionMode: true,
        HTMLid: action.id
      };
      newState.elements.push(newElement);
      break;
    }
    case "ADD_ELEMENT": {
      newState.elements.push(action.payload);
      break;
    }
    case "EDIT_ELEMENT": {
      newState.elements[action.payload.HTMLid - 1] = action.payload;
      break;
    }

    case "DEL_ELEMENT": {
      // const arr = newState.elements.filter(el => {
      //   return el.HTMLid !== action.payload.HTMLid;
      // });
      newState.elements = action.payload;
      break;
    }

    case "DEFAULT": {
      newState = state;
      break;
    }
  }

  return newState;
};

export default postEditCtlreducer;
