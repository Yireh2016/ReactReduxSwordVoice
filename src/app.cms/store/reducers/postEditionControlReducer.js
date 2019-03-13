const initialState = {
  elements: [],
  seo: {
    keywords: "",
    keywordsList: [],
    description: "",
    title: ""
  },
  summary: "",
  project: { name: "", url: "", hasChanged: false },
  files: [],
  classes: []
};
//estado inicial viene del CONFIG REDUCER.JS
const postEditCtlreducer = (state = initialState, action) => {
  let newState = state;

  switch (action.type) {
    case "ADD_CLASSES": {
      newState.classes = action.payload;
      break;
    }
    case "CREATE_ELEMENT": {
      const newElement = [
        {
          HTMLElementType: "<h1 style={styles} class={classes}> {content}</h1>",
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
        }
      ];
      newState.elements = newElement;
      newState.project.hasChanged = true;
      break;
    }
    case "ADD_ELEMENT": {
      newState.elements = action.payload;
      newState.project.hasChanged = true;
      break;
    }

    case "MOVE_ELEMENT": {
      newState.project.hasChanged = true;
      newState.elements = action.payload;
      break;
    }
    case "EDIT_ELEMENT": {
      newState.elements[action.payload.HTMLid - 1] = action.payload;
      newState.project.hasChanged = true;
      break;
    }

    case "DEL_ELEMENT": {
      newState.elements = action.payload;
      newState.project.hasChanged = true;
      break;
    }
    case "CHANGE_PROJECT": {
      newState.project.hasChanged = true;
      break;
    }
    case "SEO_EDITION": {
      newState.seo = action.payload;
      newState.project.hasChanged = true;
      break;
    }
    case "SUMMARY_EDITION": {
      newState.summary = action.payload;
      newState.project.hasChanged = true;
      break;
    }
    case "PROJECT_NAME_EDITION": {
      newState.project.name = action.payload;
      newState.project.hasChanged = true;
      break;
    }
    case "PROJECT_URL_EDITION": {
      newState.project.url = action.payload;
      newState.project.hasChanged = true;
      break;
    }
    case "ADD_DELETE_FILE": {
      newState.files = action.payload;
      newState.project.hasChanged = true;
      break;
    }
    case "FETCH_POST": {
      newState = action.payload;
      newState.project.hasChanged = false;
      break;
    }
    case "DATE_EDITION": {
      newState.date = action.payload;
      newState.project.hasChanged = true;
      break;
    }

    case "SAVE_POST": {
      newState.project.hasChanged = false;
      break;
    }

    case "RESET_EDIT": {
      newState = {
        elements: [],
        seo: {
          keywords: "",
          keywordsList: [],
          description: "",
          title: ""
        },
        summary: "",
        project: { name: "", url: "", hasChanged: false },
        files: []
      };
      break;
    }
  }

  return newState;
};

export default postEditCtlreducer;
