export default ()=> async (ctx, next) =>{
  try{
    await next();
  } catch ({status = 500, message = 'Server Error', name, errors}){
    ctx.status = status;
    ctx.body = {status, message};
  }
}