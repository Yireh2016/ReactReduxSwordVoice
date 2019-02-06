// const initialState = {
//   elements: [
//     {
//       HTMLElementType: "",
//       HTMLElementContent: "",
//       HTMLAtributes: "",
//       HTMLAtributesArr: [],
//       HTMLAtributesStr: "",
//       finalJSXElement: "",
//       HTMLStyles: "",
//       HTMLStylesStr: "",
//       HTMLStylesArr: [],
//       HTMLClasses: "",
//       HTMLClassesArr: [],
//       HTMLClassesStr: "",
//       isEditionMode: false,
//       HTMLid: 1
//     }
//   ]
// };

const initialState = {
  elements: [],
  seo: {
    keywords: "",
    description: "",
    title: ""
  },
  summary: "",
  project: { name: "", url: "" },
  files: []
};
//estado inicial viene del CONFIG REDUCER.JS
const postEditCtlreducer = (state = initialState, action) => {
  let newState = state;

  switch (action.type) {
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
      break;
    }
    case "ADD_ELEMENT": {
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
        HTMLid: action.payload
      };
      newState.elements.push(newElement);
      break;
    }
    case "EDIT_ELEMENT": {
      newState.elements[action.payload.HTMLid - 1] = action.payload;
      break;
    }

    case "DEL_ELEMENT": {
      newState.elements = action.payload;
      break;
    }
    case "SEO_EDITION": {
      newState.seo = action.payload;
      break;
    }
    case "SUMMARY_EDITION": {
      newState.summary = action.payload;
      break;
    }
    case "PROJECT_NAME_EDITION": {
      newState.project.name = action.payload;
      break;
    }
    case "PROJECT_URL_EDITION": {
      newState.project.url = action.payload;
      break;
    }
    case "ADD_DELETE_FILE": {
      newState.files = action.payload;
      break;
    }
    case "FETCH_POST": {
      newState = action.payload;
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
