import Sequelize from 'sequelize'
import db from '../helpers/db/index'

const User = db.define('user', {
  //atributes
  email:{
    type: Sequelize.STRING
  },
  first_name:{
    type: Sequelize.STRING    
  },
  last_name:{
    type: Sequelize.STRING
  },
  father_name:{
    type: Sequelize.STRING
  },
  birth_date:{
    type: Sequelize.DATE
  },
  password:{
    type: Sequelize.STRING
  },
  default_role:{
    type: Sequelize.STRING
  },
  all_roles:{
    type: Sequelize.ARRAY(Sequelize.STRING)
  }
});

module.exports = User;