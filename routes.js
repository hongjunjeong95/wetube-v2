// home
const HOME = '/';
const SEARCH = '/search';
const JOIN = '/join';
const LOGIN = '/login';
const LOGOUT = '/logout';
const ME = '/me';

// users
const USERS = '/users';
const EDIT_PROFILE = '/edit-profile';
const CHANGE_PASSWORD = '/change-password';
const USER_DETAIL = '/:id';

// Github
const GITHUB = '/auth/github';
const GITHUB_CALLBACK = '/auth/github/callback';

// Google
const GOOGLE = '/auth/google';
const GOOGLE_CALLBACK = '/auth/google/callback';

// videos
const VIDEOS = '/videos';
const VIDEO_DETAIL = '/:id';
const UPLOAD = '/upload';
const EDIT_VIDEO = '/:id/edit-video';
const DELETE_VIDEO = '/:id/delete-video';

const API = '/api';
const REGISTER_VIEW = '/:id/view';

const router = {
  home: HOME,
  search: SEARCH,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
  me: ME,

  // Github Login
  github: GITHUB,
  githubCallback: GITHUB_CALLBACK,

  // Google Login
  google: GOOGLE,
  googleCallback: GOOGLE_CALLBACK,

  users: USERS,
  userDetail: (id) => {
    if (id) {
      return `/users/${id}`;
    }
    return USER_DETAIL;
  },
  editProfile: EDIT_PROFILE,
  changePassword: CHANGE_PASSWORD,

  videos: VIDEOS,
  videoDetail: (id) => {
    if (id) return `/videos/${id}`;
    return VIDEO_DETAIL;
  },
  upload: UPLOAD,
  editVideo: (id) => {
    if (id) return `/videos/${id}/edit-video`;
    return EDIT_VIDEO;
  },
  deleteVideo: (id) => {
    if (id) return `/videos/${id}/delete-video`;
    return DELETE_VIDEO;
  },

  // api
  api: API,
  // registerView: REGISTER_VIEW,
  registerView: (id) => {
    if (id) return `/api/${id}/view`;
    return REGISTER_VIEW;
  },
  // api: API,
  // registerView: REGISTER_VIEW,
};

export default router;
