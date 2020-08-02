import passport from 'passport';
import User from '../models/User';
import routes from '../routes';

export const getJoin = (req, res) => {
  res.render('join', { pageTitle: 'Join' });
};

export const postJoin = async (req, res, next) => {
  const {
    body: { name, email, password1, password2, avatarUrl },
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
        avatarUrl, // : avatarUrl ? avatarUrl : null,
      });
      await User.register(user, password1);
      console.log('register success');
      next();
    } catch (error) {
      console.log(error);
      res.redirect(routes.home);
    }
  }
};

export const getLogin = (req, res) => {
  res.render('login', { pageTitle: 'login' });
};

export const postLogin = passport.authenticate('local', {
  failureRedirect: routes.login,
  successRedirect: routes.home,
});

export const logout = (req, res) => {
  res.render('logout');
};

export const userDetail = (req, res) => {
  res.render('userDetail');
};

export const editProfile = (req, res) => {
  res.render('editProfile');
};

export const changePassword = (req, res) => {
  res.render('changePassword');
};
