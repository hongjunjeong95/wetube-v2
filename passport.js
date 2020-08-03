import GithubStrategy from 'passport-github';
import passport from 'passport';
import User from './models/User';
import routes from './routes';
import { githubStrategy } from './controller/userController';

passport.use(User.createStrategy());

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: `http://localhost:${process.env.PORT}${routes.githubCallback}`,
    },
    githubStrategy
  )
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
