import axios from "axios";

const getMoreResponses = (id, index, responsesCount) => {
  return axios
    .get(
      `api/getMoreResponses?id=${id}&index=${index}&responsesCount=${responsesCount}`
    )
    .then(res => {
      console.log("getMoreResponses res", res);
      return { status: res.statusText, responses: res.data.responses };
    })
    .catch(err => {
      console.log("err on getMoreResponses", err);

      return { status: err };
    });
};

export default getMoreResponses;
