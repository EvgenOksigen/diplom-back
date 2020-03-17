import config from 'config'
import dotenv from 'dotenv'
import envs from './constants/envs'
import env from './utils/env'

dotenv.config()

if(!envs[env]){
  throw Error(`Unknown environment ${env}`);
}

const PORT = process.env.PORT || config.get('port');

const PSQL_URI = process.env.PSQL_URI || config.get('psql.uri')

const JWT_SECRET = config.get('jwt.secret')

if(!JWT_SECRET){
  throw Error ('You mast pass jwt secret string')
}


export {
  PORT,
  PSQL_URI,
  JWT_SECRET
} 