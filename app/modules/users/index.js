import Router from 'koa-router';
import userController from './controllers/user-controller';

const router = new Router({prefix: '/users'})

router
  .get('/getall', userController.getall)

export default router.routes();