import passport from 'passport';
import User from '../models/User';
import routes from '../routes';

// Join
export const getJoin = (req, res) => {
  try {
    res.render('join', { pageTitle: 'Join' });
  } catch (error) {
    req.flash('error', "Can't access the join");
    console.log(error);
    res.redirect(routes.home);
  }
};

export const postJoin = async (req, res, next) => {
  const {
    body: { name, email, password1, password2 },
    file,
  } = req;
  if (password1 !== password2) {
    req.flash('error', "Passwords don't match");
    res.status(400);
    res.render('join', { pageTitle: 'Join' });
  } else {
    try {
      const user = await User({
        name,
        email,
        avatarUrl: file
          ? file.location
          : 'https://wetube-v2.s3.amazonaws.com/avatar/06ec794a14dee6374e4e176f470ce90b',
      });

      await User.register(user, password1);
      req.flash('success', 'Join success');
      next();
    } catch (error) {
      console.log(error);
      res.redirect(routes.home);
      req.flash('error', 'Join fail');
    }
  }
};

// Login
export const getLogin = (req, res) => {
  try {
    res.render('login', { pageTitle: 'login' });
  } catch (error) {
    req.flash('error', "Can't access the login");
    console.log(error);
    res.redirect(routes.home);
  }
};

export const postLogin = passport.authenticate('local', {
  failureRedirect: routes.login,
  successRedirect: routes.home,
  failureFlash: 'Login fail',
  successFlash: 'Welcom!',
});

// Github login
export const githubLogin = passport.authenticate('github', {
  failureFlash: 'Login fail',
  successFlash: 'Welcom!',
});

export const githubLoginCallback = (req, res) => {
  res.redirect(routes.home);
};

export const githubStrategy = async (_, __, profile, cb) => {
  const {
    _json: { name, email, avatar_url: avatarUrl, id },
  } = profile;
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.githubId = id;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      email,
      name,
      githubId: id,
      avatarUrl,
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};

// Google Login
export const googleLogin = passport.authenticate('google', {
  scope: ['email'],
  failureFlash: 'Login fail',
  successFlash: 'Welcom!',
});

export const googleLoginCallback = (req, res) => {
  res.redirect(routes.home);
};

export const googleStrategy = async (_, __, profile, cb) => {
  const {
    _json: { name, email, avatar_url: avatarUrl, id },
  } = profile;
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.googleId = id;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      email,
      name,
      googleId: id,
      avatarUrl,
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};

// logout
export const logout = (req, res) => {
  req.flash('info', 'Log out!!');
  req.logout();
  res.redirect(routes.home);
};

// getMe
export const getMe = async (req, res) => {
  const {
    user: { id },
  } = req;

  try {
    const user = await User.findById(id).populate({
      path: 'videos',
      populate: {
        path: 'creator',
      },
    });
    res.render('userDetail', { pageTitle: 'Me', user });
  } catch (error) {
    req.flash('error', "Can't find your profile");
    console.log(error);
    res.redirect(routes.home);
  }
};

export const userDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const user = await User.findById(id).populate({
      path: 'videos',
      populate: {
        path: 'creator',
      },
    });
    res.render('userDetail', { pageTitle: 'userDetail', user });
  } catch (error) {
    req.flash('error', "Can't find the user profile");
    console.log(error);
    res.redirect(routes.home);
  }
};

export const getEditProfile = async (req, res) => {
  const {
    user: { id },
  } = req;
  try {
    const user = await User.findById(id);
    res.render('editProfile', { pageTitle: 'editProfile', user });
  } catch (error) {
    req.flash('error', "Can't find your profile");
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
      avatarUrl: file ? file.location : req.user.avatarUrl,
    });
    res.redirect(routes.me);
    req.flash('success', 'Edit success');
  } catch (error) {
    req.flash('error', 'Edit fail');
    console.log(error);
    res.redirect(routes.editProfile);
  }
};

export const getChangePassword = (req, res) => {
  try {
    res.render('changePassword', { pageTitle: 'changePassword' });
  } catch (error) {
    req.flash('error', "Can't access the change-password page");
    console.log(error);
    res.redirect(routes.home);
  }
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
    req.flash('success', 'Change password success');
  } catch (error) {
    req.flash('error', 'Change password fail');
    console.log(error);
    res.redirect(`/users${routes.changePassword}`);
  }
};
