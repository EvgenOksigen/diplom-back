import Router from 'koa-router'
import auth from './auth'
import users from './users'

const router = new Router({prefix: '/api'})

router.use(auth);
router.use(users)

export default router.routes();