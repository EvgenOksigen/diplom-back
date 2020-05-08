import jwtService from '../services/jwt.service'
import User from '../models/User'

export default () => async (ctx, next) => {
  const { authorization } = ctx.headers;

  if(authorization){
    try{
      const {email, password} =  jwtService.verify(authorization);
      const user = await User.findOne({
        where:{
          email:email,
          password:password
        },
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        }
      })
      
      ctx.user = user
    } catch(e) {
      ctx.throw(401, {message: 'Unauthorized. Invalid Token'})
    } 
  }

  await next();
}