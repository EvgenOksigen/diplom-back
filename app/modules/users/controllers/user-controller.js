import db from '../../../helpers/db'
import jwtService from '../../../services/jwt-service'

export default {
  async getall(ctx){
    const client = await db.pool.connect()
    if(!client){
      throw Error('Отсутствует клиент подключения к бд')
    }
    try{
      const user = ctx.user
      const {rows} = await client.query('select * from users')      
      console.log(rows);
      return ctx.body = {data: rows}
    }
    finally{
      client.release()
    }
  },
  async signIn(ctx){
    const {pass, login} = ctx.request.body
    if( !pass || !login){
      ctx.throw(400, {message: 'Invalid data'})
    }
    const client = await db.pool.connect()

    if(!client){
      throw Error('Отсутствует клиент подключения к бд')
    }

    try{
    const {rows} = await client.query('SELECT * from test_store where login = ($1)', [login])

    const user = [...rows]
      
    if(!user || user.length===0){
      ctx.throw(400, {message: 'User not found'})
    }

    const token = await jwtService.genToken({login})
    
    
    ctx.body={
      data:{
        token:token
      }
    }

    }catch (e){
      throw e
    }
    finally{
      client.release()
    }
  },
  
  async me(ctx){
    const { authorization } = ctx.headers;

  if(authorization){
    try{
      const client = await db.pool.connect()
      if(!client){
        ctx.throw(401, { message: 'Отсутствует клиент подключения к бд' })
      }
      const { login } = jwtService.verify(authorization);

      const {rows} = await client.query('select * from test_store')

      const user = rows.find(user => user.login === login)

      ctx.body = user
      client.release()
    } catch(e) {
      ctx.throw(401, {message: 'Unauthorized. Invalid Token'})
    }

   }
  }
}