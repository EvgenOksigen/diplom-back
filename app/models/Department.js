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


Department.create(
  {
  code: 501,
  title:'Кафедра аерокосмічних радіоелектронних систем (501)'
},{
  code: 502,
  title:'Кафедра радіоелектронних та біомедичних комп`ютеризованих засобів та технологій (502)'
},{
  code: 503,
  title:'Кафедра комп`ютерних систем, мереж і кібербезпеки (503)'
},{
  code: 504,
  title:'Кафедра інформаційно-комунікаційних технологій ім. О.О. Зеленського (504)'
},{
  code: 505,
  title:'Кафедра фізики (505)'
},
)
module.exports = Department;