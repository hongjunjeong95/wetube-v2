import passport from 'passport';
import User from '../models/User';
import routes from '../routes';

// Join
export const getJoin = (req, res) => {
  res.render('join', { pageTitle: 'Join' });
};

export const postJoin = async (req, res, next) => {
  const {
    body: { name, email, password1, password2 },
    file,
  } = req;
  if (password1 !== password2) {
    res.status(400);
    res.render('join', { pageTitle: 'Join' });
    console.log('Password wrong');
  } else {
    try {
      const user = await User({
        name,
        email,
        avatarUrl: file ? file.path : null,
      });
      await User.register(user, password1);
      console.log('Register');
      next();
    } catch (error) {
      console.log(error);
      res.redirect(routes.home);
    }
  }
  console.log('Join finished');
};

// Login
export const getLogin = (req, res) => {
  res.render('login', { pageTitle: 'login' });
};

export const postLogin = passport.authenticate('local', {
  failureRedirect: routes.login,
  successRedirect: routes.home,
});

// logout
export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};

// getMe
export const getMe = async (req, res) => {
  const {
    user: { id },
  } = req;
  try {
    const user = await User.findById(id);
    res.render('userDetail', { pageTitle: 'Me', user });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const userDetail = (req, res) => {
  res.render('userDetail', { pageTitle: 'userDetail' });
};

export const getEditProfile = async (req, res) => {
  const {
    user: { id },
  } = req;
  try {
    const user = await User.findById(id);
    res.render('editProfile', { pageTitle: 'editProfile', user });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const postEditProfile = async (req, res) => {
  const {
    body: { name, email },
    user: { id },
    file,
  } = req;
  try {
    await User.findByIdAndUpdate(id, {
      name,
      email,
      avatarUrl: file ? file.path : req.user.avatarUrl,
    });
    res.redirect(routes.me);
    console.log('Editing profile success');
  } catch (error) {
    console.log(error);
    res.redirect(routes.editProfile);
  }
};

export const getChangePassword = (req, res) => {
  res.render('changePassword', { pageTitle: 'changePassword' });
};

export const postChangePassword = async (req, res) => {
  const {
    body: { oldPassword, newPassword, verifyPassword },
  } = req;
  try {
    if (newPassword !== verifyPassword) {
      res.status(400);
      res.redirect(`/users${routes.changePassword}`);
      return;
    }
    await req.user.changePassword(oldPassword, newPassword);
    res.redirect(routes.me);
  } catch (error) {
    console.log(error);
    res.redirect(`/users${routes.changePassword}`);
  }
};
