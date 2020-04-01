import Sequelize from 'sequelize'
import db from '../helpers/db/index'
import User from './User'

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
  },
  department_id:{
    type: Sequelize.INTEGER
  },
  user_id:{
    type: Sequelize.INTEGER
  }
});

User.hasOne(Profile);
Profile.belongsTo(User, {
  foreignKey: 'user_id'
});

User.hasOne(Department);
Department.belongsTo(User, {
  foreignKey: 'department_id'
});

module.exports = Profile;