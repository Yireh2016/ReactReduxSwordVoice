import axios from "axios";

const sendUserProfile = userProfile => {
  const userName = userProfile.userName;
  return axios
    .put(`/api/updateUserProfile/${userName}`, userProfile)
    .then(res => {
      if (res.status === 200) {
        return res.data;
      }
    })
    .catch(err => {
      if (err) {
        if (JSON.stringify(err).match(/404/g)) {
          return { valid: true };
        }

        return {
          valid: false,
          message: `there was an error ${err}`
        };
      }
    });
};

export default sendUserProfile;
