import Router from 'koa-router';
import authCtrl from './controllers/auth-controller';
import checkUser from '../../handlers/checkUser'
import jwt from '../../handlers/jwt'

const router = new Router({prefix: '/auth'})

router
  .post('/signup', authCtrl.signUp)
  .options('/signin', async(ctx)=> ctx.status=200)
  .post('/signin', authCtrl.signIn)
  .post('/private', jwt(), checkUser(), ctx => {ctx.body = ctx.user})
  .options('/me', async(ctx)=> ctx.status=200)
  .get('/me', authCtrl.me)

export default router.routes();