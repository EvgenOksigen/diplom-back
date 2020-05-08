import Koa from 'koa'
import connectorsInit from './connectors'
import initHandlers from './handlers'
import modules from './modules'
import cors from 'koa-cors'

connectorsInit();

const app = new Koa()

initHandlers(app)

app.use(cors())

app.use(modules);

export default app