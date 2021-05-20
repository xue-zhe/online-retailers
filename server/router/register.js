const Router = require('koa-router');
const register = new Router();
const bodyparser = require('koa-bodyparser'); 
const db = require('../utils/db');



register.use(bodyparser())  //调用这个中间件之后，就可以拿到前端post过来的数据

register.post('/', async(ctx)=>{
    let myaccount = ctx.request.body.account;  //获取前端传来的账号
    let mypassword = ctx.request.body.password; //获取前端传来的密码
    let serachsql = `select * from t_users where account = '${myaccount}'`;
    let myarr = await new Promise((resolve,reject)=>{
        return db.query(serachsql,(err,data)=>{
            if(err) throw err;
            resolve(data);
        })
    })

    //数组长度是否大于0
    if(myarr.length > 0){ 
        //证明有这个账号，验证密码
        ctx.body = {
            status:'200',
            msg:'该账号已经注册！',
        }
    }else{
         //没有账号，要注册（往t_users表中插入一条数据记录）
         let insertsql = `insert into t_users (account, password)values ('${myaccount}', '${mypassword}')`;
         let result = await new Promise((resolve, reject)=>{
             return db.query(insertsql, (err, data)=>{
                  if(err) throw err;
                  let obj = {
                      status:'200',
                      msg:'注册成功！',
                      data
                  }
                  resolve(obj)
                })
            })
            ctx.body = result
        }
    })

module.exports = register