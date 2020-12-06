import Router from 'koa-router';
import authCtrl from './controllers/auth-controller';
import testCtrl from './controllers/test-controller'

const router = new Router()

router
  .post('/auth/signup', authCtrl.signUp)
  .post('/auth/signin', authCtrl.signIn)
  .get('/auth/me', authCtrl.me)
  
  .get('/test/all', testCtrl.testAll)
  .get('/test/:id?', testCtrl.testById)
  .post('/test/create', testCtrl.create)

export default router.routes();