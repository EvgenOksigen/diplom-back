import server from '../server'

import db from '../helpers/db/index'

const connectorsInit = async () => {
  try{
    await db.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    db.close()
    server.close()
    console.error('Unable to connect to the database:', error);
  }
  try{
    await db.sync()
    // await db.sync({ alter: true })
    // await db.sync({ force: true })
    console.log("All models were synchronized successfully.");
  }catch(e){
    console.error('Unable to sync database:', error);
  }
}

export default connectorsInit;