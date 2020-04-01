import db from '../../../helpers/db'
import jwtService from '../../../services/jwt-service'
import User from '../../../models/User'

export default {
  async signUp(ctx){

  /* 
    const all = await User.findAll({attributes: ['id_user', 'email', 'first_name', "default_role"]});
    return ctx.body = {data: all} 
  */
    try{
      const {pass, email} = ctx.request.body
      await User.findOrCreate({
        where:{
          email:email,
          password: pass
        },
        default:{
          email:email,
          password: pass
        }
      })
      .then(res => console.log(res))
      
      // const {rows} = await client.query('select * from test_store')
      // const sameUser = rows.find(user => user.login === email)
      // if(sameUser){
      //   ctx.throw(400, {message: 'Такой пользователь уже есть'})
      //   throw Error('Такой пользователь уже есть');
      // }else{
      //   const qweryStr='INSERT INTO test_store(email,password) values($1,$2)';
      //   await client.query(qweryStr,[email, pass])
      //   console.log('NEW USER HAS BEN CREATED')
      //   const {rows} = await client.query('SELECT * from test_store where email = ($1)', [email])

      /* {
            "id_user": 3,
            "email": "admin",
            "first_name": "admin",
            "default_role": "teacher"
        } */
        return ctx.body = {data: rows}
      }catch(e){
        console.log(e);
        ctx.throw(400, {message: 'Такой пользователь уже есть'})
      }
  },
  async signIn(ctx){
    const { email, pass, user_role } = ctx.request.body
    if(!email || !pass){
      ctx.throw(400, {message: 'Invalid data'})
    }
    try{
    const user = await User.findOne({
      where:{
        email:email,
        password:pass
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    })
    
    // user.all_roles.includes(user_role) 
    // ? (await client.query('update profiles set p_role = $1 where user_id = $2', [user_role, user.id_user]))
    // : (await client.query('update profiles set p_role = $1 where user_id = $2', [user.default_role, user.id_user]));

    if(!user || user.length===0){
      ctx.throw(400, {message: 'User not found'})
    }

    const token = jwtService.genToken(user.email)
    
    ctx.body= {data: {token} }

    }catch (e){
      throw e
    }
  },
  
  async me(ctx){
    const { authorization } = ctx.headers;
    
    if(authorization){
      try{
        
        const email  = jwtService.verify(authorization);

        const user = await User.findOne({
          where:{
            email:email
          },
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'password']
          }
        }
      )
        
      ctx.body = {user}
        
        // const profile = await client.query('select * from profiles where user_id = $1',[user.id_user]).then(res => (res.rows[0]))

        // ctx.body = {user, ...profile } 

      } catch(e) {
        ctx.throw(401, {message: 'Error in work with database'})
      }
    }
  }
}