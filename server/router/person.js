const Router = require('koa-router');
const person = new Router();
const bodyparser = require('koa-bodyparser'); 
const db = require('../utils/db');

person.use(bodyparser())  //调用这个中间件之后，就可以拿到前端post过来的数据

person.post('/refer', async(ctx)=>{   //根据账号获取信息
    let myaccount = ctx.request.body.accont;  //获取前端传来的账号

    //判断数据库里到底有没有这个账号，有就调出相关信息
    let serachsql = `select * from t_users where account = '${myaccount}'`;

    let result = await new Promise((resolve,reject)=>{
        return db.query(serachsql,(err,data)=>{
            if(err) throw err;
            let obj = {
                msg: '查询成功！',
                status:'200',
                data
            }
            resolve(obj)
        })
    })
    ctx.body = result
})

person.post('/amend', async(ctx)=>{    //完善和修改个人信息
    let myaccount = ctx.request.body.account;  //获取前端传来的账号
    let myname = ctx.request.body.name; //获取前端传来的用户姓名
    let myphone = ctx.request.body.phone;  //获取前端传来的手机号码
    let myaddress = ctx.request.body.address; //获取前端传来的地址
    
    //判断数据库里到底有没有这个账号，有这个账号则进行信息修改
    let updateaql = `update t_users set 
    phone='${myphone}',
    username='${myname}',
    address='${myaddress}'
    where account = '${myaccount}'`;

    let result = await new Promise((resolve,reject)=>{
        return db.query(updateaql,(err,data)=>{
            if(err) throw err;
            let obj = {
                msg: '修改成功！',
                status:'200',
                data
            }
            resolve(obj)
        })
    })
    ctx.body = result
})

person.post('/amend/shops', async(ctx)=>{    //注册商铺
    let myaccount = ctx.request.body.account; //获取前端传来的账号.
    let myshopsname = ctx.request.body.shopsname; //获取前端传来的账号
    //判断数据库里到底有没有这个账号，有这个账号则进行信息修改
    let updateaql = `update t_users set 
    shop = '${myshopsname}'
    where account = '${myaccount}'`;

    let result = await new Promise((resolve,reject)=>{
        return db.query(updateaql,(err,data)=>{
            if(err) throw err;
            let obj = {
                msg: '修改成功！',
                status:'200',
                data
            }
            resolve(obj)
        })
    })
    ctx.body = result
})

module.exports = person 