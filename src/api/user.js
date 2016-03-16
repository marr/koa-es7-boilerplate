import env from 'lib/env'

export function getUser({ userService }, ctx) {
  if (ctx.isAuthenticated()) {
    const { user } = ctx.passport
    ctx.ok(user)
  } else {
    ctx.unauthorized()
  }
}

export function getUsers({ userService }, ctx) {
  if (ctx.isAuthenticated()) {
    return userService.getUsers().then(ctx.ok)
  } else {
    ctx.unauthorized()
  }
}

export default function(router, { bind }) {
  router
    .get('/api/',
      bind(getUsers))
    .get('/api/user',
      bind(getUser))
}
