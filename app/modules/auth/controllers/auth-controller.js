import db from '../../../helpers/db'
import jwtService from '../../../services/jwt.service'
import User from '../../../models/User'
import Profile from '../../../models/Profile'
import AuthService from '../../../services/auth.service'

export default {
  async signUp(ctx){
    let d = new Date()

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
        ctx.body = {user}
        await Profile.create({
          p_year: d.getFullYear(),
          p_role:default_role,
          user_id:user.id
        }).then(profile=>user.setProfile(profile))
          .catch(e=>console.log(e))
      }).catch(e=>console.log(e))

      return ctx.body

  },
  async signIn(ctx){
    const { email, pass, user_role } = ctx.request.body
    if(!email || !pass){
      ctx.throw(400, {message: 'Empty field mail or password'})
      }
    ctx.body = await AuthService.signIn(email, pass, user_role)
  },
  
  async me(ctx){
    const { authorization } = ctx.headers;
      ctx.body = await AuthService.me(authorization)
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