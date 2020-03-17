import jwtService from '../services/jwt-service'
import db from '../helpers/db'

export default () => async (ctx, next) => {
  const { authorization } = ctx.headers;

  if(authorization){
    try{
      const client = await db.pool.connect()
      if(!client){
        ctx.throw(401, { message: 'Отсутствует клиент подключения к бд' })
      }
      const { login } = await jwtService.verify(authorization);

      const {rows} = await client.query('select * from test_store')

      const user = rows.find(user => user.login === login)

      ctx.user = user
      client.release()
    } catch(e) {
      ctx.throw(401, {message: 'Unauthorized. Invalid Token'})
    } 
  }

  await next();
}