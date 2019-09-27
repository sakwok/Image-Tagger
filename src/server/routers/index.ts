const routes = require('next-routes')()
routes
  .add('index', '/', 'index')
  .add('overview', '/player/overview/:playerId', 'player')

export default routes
export const Link = routes.Link
export const Router = routes.Router
