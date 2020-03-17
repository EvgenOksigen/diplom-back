import Koa from 'koa'
import connectorsInit from './connectors'
import initHandlers from './handlers'
import modules from './modules'

connectorsInit();

const app = new Koa()

initHandlers(app)

app.use(async(ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", "http://localhost:4000"); // update to match the domain you will make the request from
  ctx.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  await next()
});

app.use(modules);

app.use(async ctx => {
  ctx.body = '<h1>Hi</h1>'
})

export default app