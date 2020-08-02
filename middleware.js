import routes from './routes';

export const localMiddleware = (req, res, next) => {
  res.locals.pagetitle = 'WeTube';
  res.locals.routes = routes;
  res.locals.loggedUser = req.user | null;
  console.log('local req.user:', req.user);
  next();
};
