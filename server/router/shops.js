const Router = require('koa-router');
const shops = new Router();
const bodyparser = require('koa-bodyparser'); 
const db = require('../utils/db');

shops.use(bodyparser())  //调用这个中间件之后，就可以拿到前端post过来的数据

//查看商品
shops.post('/refer/goods', async(ctx)=>{   //查看商品信息
    let mycurPage = ctx.request.body.curPage
    let mypageSize = ctx.request.body.pageSize
    let selectsql = `select * from t_goods limit ${(mycurPage-1)*mypageSize},${mypageSize};`;
    let totalsql = `select count(*) as total from t_goods `;
    let result = await new Promise((resolve,reject)=>{
        return db.query(selectsql,(err,data)=>{
            if(err) throw err;
            let obj = {
                msg:'成功查询！',
                status:'200',
                data 
            }
            resolve(obj);
        })
    })
    let total =  await new Promise((resolve,reject)=>{
        return db.query(totalsql,(err,data)=>{
            if(err) throw err;
            resolve(data);
        })
    })
    ctx.body={
        result,
        total
    }
})

shops.post('/dimrefer/goods', async(ctx)=>{   //模糊查询商品
    let myindex = ctx.request.body.index
    let mycurPage = ctx.request.body.curPage
    let mypageSize = ctx.request.body.pageSize
    let serachsql = `select * from t_goods where goods  like '%${myindex}%' or type  like '%${myindex}%' or description like '%${myindex}%'  limit ${(mycurPage-1)*mypageSize},${mypageSize}`;
    let totalsql = `select count(*) as total from t_goods  where goods  like '%${myindex}%' or type  like '%${myindex}%' or description like '%${myindex}%'  `;
    let result = await new Promise((resolve,reject)=>{
        return db.query(serachsql,(err,data)=>{
            if(err) throw err;
            let obj = {
                msg:'成功查询！',
                status:'200',
                data 
            }
            resolve(obj);
        })
    })
    let total =  await new Promise((resolve,reject)=>{
        return db.query(totalsql,(err,data)=>{
            if(err) throw err;
            resolve(data);
        })
    })
    ctx.body={
        result,
        total
    }
})

shops.post('/refer/goods/id', async(ctx)=>{   //根据商品id查看商品的信息
    let myid = ctx.request.body.id
    let selectsql = `select * from t_goods where id ='${myid}'`;
    let result = await new Promise((resolve,reject)=>{
        return db.query(selectsql,(err,data)=>{
            if(err) throw err;
            let obj = {
                msg:'成功查询！',
                status:'200',
                data 
            }
            resolve(obj);
        })
    })
    let imglist = []
    imglist[0] = result.data[0].imgs1
    imglist[1] = result.data[0].imgs2
    imglist[2] = result.data[0].imgs3
    imglist[3] = result.data[0].imgs4
    ctx.body={
        result,
        imglist
    }
})

shops.post('/refer/goods/stock', async(ctx)=>{   //根据商品id修改商品库存
    let myid = ctx.request.body.id
    let mystock = ctx.request.body.stock

    let updatesql = `update t_goods set stock = '${mystock}' where id = '${myid}'`;
    let result = await new Promise((resolve,reject)=>{
        return db.query(updatesql,(err,data)=>{
            if(err) throw err;
            let obj = {
                msg:'成功查询！',
                status:'200',
                data 
            }
            resolve(obj);
        })
    })
    ctx.body = result
})

module.exports = shops 