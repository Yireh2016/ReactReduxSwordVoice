import { store } from "../cms.index";

const setTitle = title => {
  store.dispatch({ type: "SET_DIALOG_TITLE", payload: title });
};

const setBody = body => {
  store.dispatch({ type: "SET_DIALOG_BODY", payload: body });
};

const setStatus = status => {
  store.dispatch({ type: "SET_DIALOG_STATUS", payload: status });
};

const setShow = show => {
  store.dispatch({ type: "SET_DIALOG_SHOW", payload: show });
};

const triggerDialog = ({ title, body, status }) => {
  setTitle(title);
  setBody(body);
  setStatus(status);
  setShow(true);
};

export default triggerDialog;
