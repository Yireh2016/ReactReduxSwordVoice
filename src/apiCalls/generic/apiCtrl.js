import { apiGet, apiPost, apiPut } from "./apiCalls";

const apiCtrl = async ({ url, data, method, config }, success, error) => {
  let response;

  const isOnline = navigator.onLine;
  if (!isOnline) {
    error({ response: { data: { message: "NetworK Error" } } });
    return;
  }

  try {
    switch (method) {
      case "get": {
        response = await apiGet(url, config);
        break;
      }

      case "post": {
        response = await apiPost(url, data, config);
        break;
      }

      case "put": {
        response = await apiPut(url, data, config);
        break;
      }
    }
  } catch (err) {
    error(err);
    return;
  }

  if (response.data.status === "OK") {
    success(response);

    return;
  }
};

export default apiCtrl;

/*

import axios from "axios";

const apiLogout = () => {
  return axios(`api/logout`)
    .then(() => {
      return { status: "OK" };
    })
    .catch(err => {
      console.log("err on logout", err);

      return { status: err };
    });
};

export default apiLogout;

*/
