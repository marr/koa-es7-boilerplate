import env from 'lib/env';
import passport from 'koa-passport';
import OAuth2Strategy from 'passport-oauth2';

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

function createStrategy (callback) {
  return new OAuth2Strategy({
    authorizationURL: env.AUTHORIZATION_URL,
    tokenURL: env.TOKEN_URL,
    clientID: env.CLIENT_ID,
    clientSecret: env.CLIENT_SECRET,
    callbackURL: env.CALLBACK_URL
  }, callback);
}

export default function createAuth(router, { userService }) {
  const verifyCallback = (accessToken, refreshToken, profile, done) => {
    userService.findOrCreate({ accessToken }).then(user => done(null, user))
  }

  passport.use(createStrategy(verifyCallback));

  router.get('/auth', passport.authenticate('oauth2'));
  router.get('/auth/callback', passport.authenticate('oauth2', {
    successRedirect: '/api/user',
    failureRedirect: '/unauthorized'
  }));
}
