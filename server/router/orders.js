const Router = require('koa-router');
const orders = new Router();
const bodyparser = require('koa-bodyparser'); 
const db = require('../utils/db');

orders.use(bodyparser())  //调用这个中间件之后，就可以拿到前端post过来的数据

//订单
orders.post('/add/orders', async(ctx)=>{    //创建订单
    let myaccount = ctx.request.body.account;  //获取前端传来购买的账号
    let myshops = ctx.request.body.shops;  //获取前端传来的购买商铺
    let mygoods = ctx.request.body.goods; //获取前端传来商品名称
    let myprice = ctx.request.body.price; //获取前端传来的购买价格
    let myimgs = ctx.request.body.imgs; //获取前端传来的商品图片
    let mypurchases = ctx.request.body.purchases; //获取前端传来的购买数量
    let myaddressee = ctx.request.body.addressee; //获取前端传来的收获人
    let myaddress = ctx.request.body.address; //获取前端传来的收获地址
    let myphone = ctx.request.body.phone; //获取前端传来货电话
    let mystate = ctx.request.body.state; //获取前端传来订单状态
    let mydate = ctx.request.body.date; //获取前端传来的时间
    let myshopsaccount = ctx.request.body.shopsaccount //前端传来商家的账号

    let insertsql = `insert into t_orders (account,shops, goods, price, imgs, purchases, addressee, address, phone, state,date,shopsaccount)values 
    ('${myaccount}', '${myshops}',  '${mygoods}', '${myprice}', '${myimgs}', 
    '${mypurchases}', '${myaddressee}', '${myaddress}', '${myphone}', '${mystate}', '${mydate}','${myshopsaccount}')`;
    let result = await new Promise((resolve, reject)=>{
        return db.query(insertsql, (err, data)=>{
            if(err) throw err;
            let obj = {
                status:'200',
                msg:'支付成功！',
                data
            }
            resolve(obj)
            })
        })
    ctx.body = result;
})

orders.post('/refer/orders', async(ctx)=>{   //查看订单
    let myaccount = ctx.request.body.account
    let selectsql = `select * from  t_orders where account = '${myaccount}'`;
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
    ctx.body={
        result,
    }
})

orders.post('/amend/confirm', async(ctx)=>{    //修改订单状态(确定收货)
    let myid = ctx.request.body.id    //获取前端传来id值
    let mystate = '已收货'
    let updatesql = `update t_orders set state = '${mystate}' where id = '${myid}'`;
 
    let result = await new Promise((resolve,reject)=>{
        return db.query(updatesql,(err,data)=>{
            if(err) throw err;
            let obj = {
                msg:'成功发货！',
                status:'200',
                data 
            }
            resolve(obj);
        })
    })
    ctx.body= result
})

orders.post('/amend/shipments', async(ctx)=>{    //修改订单状态(申请退货)
    let myid = ctx.request.body.id    //获取前端传来id值
    let myvalue = ctx.request.body.value    //获取前端传来id值
    let mystate = '申请退货中'   

    let updatesql = `update t_orders set state = '${mystate}',reason = '${myvalue}' where id = '${myid}'`;

    let result = await new Promise((resolve,reject)=>{
        return db.query(updatesql,(err,data)=>{
            if(err) throw err;
            let obj = {
                msg:'成功发货！',
                status:'200',
                data 
            }
            resolve(obj);
        })
    })
    ctx.body= result
})

orders.post('/delete/orders', async(ctx)=>{    //删除订单
    let myid = ctx.request.body.id;  //获取前端传来的id 
    let deletesql = `delete from t_orders where id = '${myid}'`
    let result = await new Promise((resolve,reject)=>{
        return db.query(deletesql, (err,data)=>{
            if(err) throw err;
            let obj ={
                msg: '删除成功！',
                status:'200',
                data 
            }
            resolve(obj);
        })
    })
    ctx.body = result
})

orders.post('/amend/rate', async(ctx)=>{    //评分
    let myid = ctx.request.body.id    //获取前端传来id值
    let myratevalue = ctx.request.body.ratevalue //获取前端传来的评分
    let updatesql = `update t_orders set ratevalue = '${myratevalue}' where id = '${myid}'`;
 
    let result = await new Promise((resolve,reject)=>{
        return db.query(updatesql,(err,data)=>{
            if(err) throw err;
            let obj = {
                msg:'成功发货！',
                status:'200',
                data 
            }
            resolve(obj);
        })
    })
    ctx.body= result
})


module.exports = orders 