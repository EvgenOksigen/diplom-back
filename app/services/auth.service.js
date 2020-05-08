import User from '../models/User'
import Profile from '../models/Profile'
import jwtService from './jwt.service'


class AuthService {
  constructor(){}

  async signIn(email, pass, user_role){
      
  let usr

  try{
    await User.findOne({
    where:{
      email:email,
      password:pass
    },
      attributes: {
      exclude: ['createdAt', 'updatedAt']
      }
    }).then(user=>{
        user.all_roles.includes(user_role) 
        ? Profile.update({p_role : user_role}, {where:{userId : user.id}})
        : Profile.update({p_role : user.default_role},{where:{userId : user.id}});
        return usr = user
        }
    )
    if(!usr || usr.length===0){
        throw(400, {message: 'User not found'})
        }
    const token = jwtService.genToken({
      email:email,
      password:pass
    })

    return {data: {token} }
    }catch(e){
      throw {status:400, message: "Can't find user, was been input invalid data"}
    }
  }
  async me(authorization){
    if(authorization){
        try{
          const {email, password}  = jwtService.verify(authorization);
          const user = await User.findOne({
            where:{
              email:email,
              password:password
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
          return {user}
        } catch(e) {
          throw(400, {message: 'Error in work with database'})
        }
      }
  }
}

module.exports = new AuthService;