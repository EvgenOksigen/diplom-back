import Sequelize from 'sequelize'
import db from '../helpers/db/index'
import User from './User'
import Department from './Department'

const Profile = db.define('profile', {
  //atributes
  id_profile : {
    type : Sequelize.BIGINT,
    autoIncrement : true,
    primaryKey : true
  },
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