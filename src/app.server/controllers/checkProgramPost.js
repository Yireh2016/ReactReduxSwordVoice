import checkPostStatus from "../../app.api/controllers/server/checkPostsStatus";

const checkProgramPost = minutes => {
  setInterval(() => {
    checkPostStatus();
  }, minutes * 60 * 1000);
};

export default checkProgramPost;
