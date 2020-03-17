import db from '../../../helpers/db'
import jwtService from '../../../services/jwt-service'

export default {
  async signUp(ctx){
    const client = await db.pool.connect()
    if(!client){
      throw Error('Отсутствует клиент подключения к бд')
    }
    try{
      const {pass, email} = ctx.request.body
      const {rows} = await client.query('select * from test_store')
      const sameUser = rows.find(user => user.login === email)
      if(sameUser){
        ctx.throw(400, {message: 'Такой пользователь уже есть'})
        throw Error('Такой пользователь уже есть');
      }else{
        const qweryStr='INSERT INTO test_store(email,password) values($1,$2)';
        await client.query(qweryStr,[email, pass])
        console.log('NEW USER HAS BEN CREATED')
        const {rows} = await client.query('SELECT * from test_store where email = ($1)', [email])

        return ctx.body = {data: rows}
      }
    }
    finally{
      client.release()
    }
  },
  async signIn(ctx){
    const { email, pass, user_role } = ctx.request.body
    if(!email || !pass){
      ctx.throw(400, {message: 'Invalid data'})
    }
    const client = await db.pool.connect()

    if(!client){
      ctx.throw(400, {message: 'Not connection to db'})
      throw Error('Not connection to db')
    }

    try{
    const user = await client.query('SELECT * from users where email = ($1) and password = $2', [email, pass]).then(res=>res.rows[0]);
    
    console.log(user.all_roles);

    user.all_roles.includes(user_role) 
    ? (await client.query('update profiles set p_role = $1 where user_id = $2', [user_role, user.id_user]))
    : (await client.query('update profiles set p_role = $1 where user_id = $2', [user.default_role, user.id_user]));

    if(!user || user.length===0){
      ctx.throw(400, {message: 'User not found'})
    }

    const token = await jwtService.genToken({email})
    
    // console.log(email, pass, user_role);
        
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
        const { email } = jwtService.verify(authorization);

        const user = await client.query('select * from users where email = $1 limit 1', [email]).then(res => (res.rows[0]))
        delete user.password
        
        const profile = await client.query('select * from profiles where user_id = $1',[user.id_user]).then(res => (res.rows[0]))

        ctx.body = {user, ...profile } 

        client.release()
      } catch(e) {
        ctx.throw(401, {message: 'Error in work with database'})
      }
    }
  }
}