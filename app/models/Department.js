import Sequelize from 'sequelize'
import db from '../helpers/db/index'

const Department = db.define('department', {
  //atributes
  id_department : {
    type : Sequelize.INTEGER,
    autoIncrement : true,
    primaryKey : true
  }, 
  code:{
    type: Sequelize.INTEGER
  },
  title:{
    type: Sequelize.STRING    
  }
});

module.exports = Department;