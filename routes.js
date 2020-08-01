// home
const HOME = "/";
const SEARCH = "/search";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";

// users
const USERS = "/users";
const EDIT_PROFILE = "/edit-profile";
const CHANGE_PASSWORD = "/change-password";
const USER_DETAIL = "/:id";

// videos
const VIDEOS = "/videos";
const VIDEO_DETAIL = "/id";
const UPLOAD = "/upload";
const EDIT_VIDEO = "/:id/edit-video";
const DELETE_VIDEO = "/:id/delete-video";

const router = {
  home: HOME,
  search: SEARCH,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,

  users: USERS,
  userDetail: USER_DETAIL,
  editProfile: EDIT_PROFILE,
  changePassword: CHANGE_PASSWORD,

  videos: VIDEOS,
  videoDetail: VIDEO_DETAIL,
  upload: UPLOAD,
  editVideo: EDIT_VIDEO,
  deleteVideo: DELETE_VIDEO,
};

export default router;
