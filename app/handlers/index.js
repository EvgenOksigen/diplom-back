import bp from 'koa-bodyparser'
import logger from 'koa-logger'
import error from './error'
import {IS_DEV} from '../utils/env'
import jwt from './jwt'


export default (app)=> {
  if(IS_DEV){
    app.use(logger())
  }

  app.use(error())
  app.use(bp())
  app.use(jwt())
}