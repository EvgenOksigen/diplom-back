import Router from 'koa-router';
import userController from './controllers/user-controller';
import checkUser from '../../handlers/checkUser'
import jwt from '../../handlers/jwt'


const router = new Router({prefix: '/users'})

router
  .get('/getall', userController.getall)
  // .post('/signin', authCtrl.signIn)
  // .post('/private', jwt(), checkUser(), ctx => {ctx.body = ctx.user})
  // .get('/test', authCtrl.me)insert into users(email, first_name, last_name, birth_date) values('e.dedenev@student.csn.khai.edu', 'Evgeniy', 'Dedenev', 1997.05.05)insert into users(email, first_name, last_name, birth_date) values('e.dedenev@student.csn.khai.edu', 'Evgeniy', 'Dedenev', 1997.05.05)insert into users(email, first_name, last_name, birth_date) values('e.dedenev@student.csn.khai.edu', 'Evgeniy', 'Dedenev', 1997.05.05)insert into users(email, first_name, last_name, birth_date) values('e.dedenev@student.csn.khai.edu', 'Evgeniy', 'Dedenev', 1997.05.05)insert into users(email, first_name, last_name, birth_date) values('e.dedenev@student.csn.khai.edu', 'Evgeniy', 'Dedenev', 1997.05.05)insert into users(email, first_name, last_name, birth_date) values('e.dedenev@student.csn.khai.edu', 'Evgeniy', 'Dedenev', 1997.05.05)insert into users(email, first_name, last_name, birth_date) values('e.dedenev@student.csn.khai.edu', 'Evgeniy', 'Dedenev', 1997.05.05)

export default router.routes();