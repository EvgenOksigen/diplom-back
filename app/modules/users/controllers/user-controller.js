import User from '../../../models/User'

export default {
  async getall(ctx){
    try{
      const all = await User.findAll({attributes: ['id', 'email', 'first_name', 'last_name',"default_role", "all_roles"]});
      return ctx.body = {data: all}
    }
    catch(e){
      console.log(e);
      ctx.throw(400, {message: 'User not found'})
    }
  }
}