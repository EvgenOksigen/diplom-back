import {Pool} from 'pg'
import connectionString from 'pg-connection-string'
var parse = connectionString.parse

export default (psqlUri)=>{
  if(!psqlUri){
    throw Error ('PostgreSQL uri is underfined')
  }

  return new Promise((res, rej)=>{
    const pool = new Pool(parse(psqlUri))
      pool.connect()
      .then(client =>{
        res(client)
        console.log('PostgreSQL database connected : ', client.database);
        client.release()
        client.end()
      })
      .catch(err=>{
        rej(err)
      });
  });
}