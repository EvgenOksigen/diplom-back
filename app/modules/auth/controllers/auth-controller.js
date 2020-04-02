import db from '../../../helpers/db'
import jwtService from '../../../services/jwt-service'
import User from '../../../models/User'
import Profile from '../../../models/Profile'

export default {
  async signUp(ctx){
    let d = new Date()
    let user_G

      const {pass, email, first_name, last_name,father_name, birth_date, default_role, all_roles } = ctx.request.body
      await User.create({
          email:email,
          first_name:first_name,
          last_name:last_name,
          father_name:father_name,
          birth_date:birth_date,
          password: pass,
          default_role:default_role,
          all_roles:all_roles
      })
      .then(async user => {
        user_G = user
        await Profile.create({
          p_year: d.getFullYear(),
          p_role:default_role,
          user_id:user.id
        }).then(profile=>{
          user.setProfile(profile).catch(e=>console.log(e))
        })
      }).catch(e=>console.log(e))

      return ctx.body = {user_G}

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
    })/* .then(user=>{
      
    }) */
    
    // user.all_roles.includes(user_role) 
    // ? await Profile.update({p_role:user_role}, {where:{user_id : user.user_id}})
    // : await Profile.update({p_role:user.default_role},{where:{user_id : user.user_id}})

    if(!user || user.length===0){
      ctx.throw(400, {message: 'User not found'})
    }

    const token = jwtService.genToken(user.email)
    
    ctx.body = {data: {token} }

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
          },
          include: [{
            model: Profile,
            attributes: {
              exclude: ['createdAt', 'updatedAt']
            }
          }]
        })
        
        ctx.body = {user}

        // const profile = await client.query('select * from profiles where user_id = $1',[user.id_user]).then(res => (res.rows[0]))

        // ctx.body = {user, ...profile } 

      } catch(e) {
        ctx.throw(401, {message: 'Error in work with database'})
      }
    }
  },
  async test(ctx){
    await User.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      include: [{
        model: Profile,
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        }
      }]
    }).then(users=>{
      console.log(users);
      ctx.body = users
    })
    
  }
}