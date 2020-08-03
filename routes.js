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
    if (id) {
      return `/videos/${id}`;
    }
    return VIDEO_DETAIL;
  },
  upload: UPLOAD,
  editVideo: EDIT_VIDEO,
  deleteVideo: DELETE_VIDEO,
};

export default router;
