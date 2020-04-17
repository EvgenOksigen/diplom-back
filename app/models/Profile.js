import Sequelize from 'sequelize'
import db from '../helpers/db/index'
import User from './User'

const Profile = db.define('profile', {
  //atributes
  p_year:{
    type: Sequelize.STRING
  },
  p_role:{
    type: Sequelize.STRING    
  }
});

User.hasOne(Profile,{
  onDelete: "cascade",
});

module.exports = Profile;