import GithubStrategy from 'passport-github';
import GoogleStrategy from 'passport-google-oauth20';
import passport from 'passport';
import User from './models/User';
import routes from './routes';
import { githubStrategy, googleStrategy } from './controller/userController';

passport.use(User.createStrategy());

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.PRODUCTION
        ? `https://wetube-v2.herokuapp.com${routes.githubCallback}`
        : `http://localhost:${process.env.PORT}${routes.githubCallback}`,
    },
    githubStrategy
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.PRODUCTION
        ? `https://wetube-v2.herokuapp.com${routes.googleCallback}`
        : `http://localhost:${process.env.PORT}${routes.googleCallback}`,
    },
    googleStrategy
  )
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
