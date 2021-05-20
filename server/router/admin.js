const Router = require('koa-router');
const admin = new Router();
const bodyparser = require('koa-bodyparser'); 
const db = require('../utils/db');


admin.use(bodyparser())  //调用这个中间件之后，就可以拿到前端post过来的数据


//商品
admin.post('/refer/goods', async(ctx)=>{   //查看商品信息
    let mycurPage = ctx.request.body.curPage
    let mypageSize = ctx.request.body.pageSize
    let myaccount = ctx.request.body.account   
    let selectsql = `select * from t_goods where account = '${myaccount}' limit ${(mycurPage-1)*mypageSize},${mypageSize};`;
    let totalsql = `select count(*) as total from t_goods where account = '${myaccount}'`
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

admin.post('/refer/goods/id', async(ctx)=>{   //根据id查看商品信息
    let myid = ctx.request.body.id   
    let selectsql = `select * from t_goods where id = '${myid}'`;
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

admin.post('/dimrefer/goods', async(ctx)=>{   //模糊查询商品信息
    let myindex = ctx.request.body.index;  //获取前端传来的值
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

admin.post('/amend/goods', async(ctx)=>{    //修改商品信息
    let mygoods = ctx.request.body.goods; //获取前端传来商品名称
    let mytype = ctx.request.body.type; //获取前端传来的商品类型
    let myprice = ctx.request.body.price; //获取前端传来的商品价格
    let mydescription = ctx.request.body.description; //获取前端传来的商品描述  
    let myimgs = ctx.request.body.img; //获取前端传来的商品图片
    let mystock = ctx.request.body.stock; //获取前端传来的商品库存
    let myid = ctx.request.body.id;   //获取前端传来的商品id
    let myimgslist = ctx.request.body.imgslist; //获取前端传来的商品图片
    let myimgs1 = myimgslist[0]
    let myimgs2 = myimgslist[1]
    let myimgs3 = myimgslist[2]
    let myimgs4 = myimgslist[3]

    let updatesql = `update t_goods set 
    goods = '${mygoods}', 
    type = '${mytype}', 
    price ='${myprice}', 
    description ='${mydescription}',
    imgs = '${myimgs}',
    imgs1 = '${myimgs1}',
    imgs2 = '${myimgs2}',
    imgs3 = '${myimgs3}',
    imgs4 = '${myimgs4}',
    stock = '${mystock}'
    where id = '${myid}'`;

    let result = await new Promise((resolve,reject)=>{
        return db.query(updatesql,(err,data)=>{
            if(err) throw err;
            let obj = {
                msg:'成功修改！',
                status:'200',
                data 
            }
            resolve(obj);
        })
    })
    ctx.body= result
})

admin.post('/add/goods', async(ctx)=>{    //添加商品
    let myaccount = ctx.request.body.account;  //获取前端传来的账号
    let myshops = ctx.request.body.shops;  //获取前端传来的商铺
    let mygoods = ctx.request.body.goods; //获取前端传来商品名称
    let mytype = ctx.request.body.type; //获取前端传来的商品类型
    let myprice = ctx.request.body.price; //获取前端传来的商品价格
    let myoldprice = ctx.request.body.oldprice; //获取前端传来的商品价格
    let mydescription = ctx.request.body.description; //获取前端传来的商品描述  
    let myimg = ctx.request.body.img; //获取前端传来的商品图片
    let mystock = ctx.request.body.stock; //获取前端传来的商品库存
    let myimgslist = ctx.request.body.imgslist; //获取前端传来的商品详情图片
    let myimgs1 = myimgslist[0]
    let myimgs2 = myimgslist[1]
    let myimgs3 = myimgslist[2]
    let myimgs4 = myimgslist[3]
    let insertsql = `insert into t_goods (goods,type, price,oldprice, description, imgs, stock, account, shops, imgs1, imgs2, imgs3, imgs4 )values 
    ('${mygoods}', '${mytype}',  '${myprice}', '${myoldprice}', '${mydescription}', '${myimg}', '${mystock}', '${myaccount}', '${myshops}', '${myimgs1}', '${myimgs2}', '${myimgs3}', '${myimgs4}')`;
    let result = await new Promise((resolve, reject)=>{
        return db.query(insertsql, (err, data)=>{
            if(err) throw err;
            let obj = {
                status:'200',
                msg:'添加成功 ',
                data
            }
            resolve(obj)
        })
    }) 
    ctx.body = result
    
})

admin.post('/delete/goods', async(ctx)=>{    //删除商品
    let myid = ctx.request.body.id;  //获取前端传来的id 
    let deletesql = `delete from t_goods where id = '${myid}'`
    let result = await new Promise((resolve,reject)=>{
        return db.query(deletesql, (err,data)=>{
            if(err) throw err;
            let obj ={
                status:'200',
                msg:'删除成功！',
                data
            }
            resolve(obj);
        })
    })
    console.log(result)
    ctx.body = result
})


//订单
admin.post('/refer/orders', async(ctx)=>{   //查看订单信息
    let mycurPage = ctx.request.body.curPage
    let mypageSize = ctx.request.body.pageSize
    let myshopsaccount = ctx.request.body.shopsaccount
    let selectsql = `select * from t_orders where shopsaccount = '${myshopsaccount}' limit ${(mycurPage-1)*mypageSize},${mypageSize};`;
    let totalsql = `select count(*) as total from t_orders where shopsaccount = '${myshopsaccount}'`
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


admin.post('/refer/orders/id', async(ctx)=>{   //查看订单
    let myid = ctx.request.body.id
    let selectsql = `select state,ratevalue from t_orders where id = '${myid}'`;
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
    ctx.body = result
})

admin.post('/dimrefer/orders', async(ctx)=>{   //模糊查询商品信息
    let myindex = ctx.request.body.index;  //获取前端传来的值
    let mycurPage = ctx.request.body.curPage
    let mypageSize = ctx.request.body.pageSize
    let serachsql = `select * from t_orders where goods  like binary '%${myindex}%' or state  like binary '%${myindex}%' or date like binary '%${myindex}%' limit ${(mycurPage-1)*mypageSize},${mypageSize}`;
    let totalsql = `select count(*) as total from t_orders  where goods  like binary '%${myindex}%' or state  like binary '%${myindex}%' or date like binary '%${myindex}%' `;
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


admin.post('/amend/shipments', async(ctx)=>{    //修改订单状态(发货)
    let myid = ctx.request.body.id    //获取前端传来id值
    let mystate = ctx.request.body.state    //获取前端传来的状态
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

admin.post('/amend/return', async(ctx)=>{    //修改订单状态(退货)
    let myid = ctx.request.body.id    //获取前端传来id值
    let mystate = ctx.request.body.state    //获取前端传来的状态
    let updatesql = `update t_orders set state = '${mystate}' where id = '${myid}'`;

    let result = await new Promise((resolve,reject)=>{
        return db.query(updatesql,(err,data)=>{
            if(err) throw err;
            let obj = {
                msg:'退货发货！',
                status:'200',
                data 
            }
            resolve(obj);
        })
    })
    ctx.body= result
})


admin.post('/delete/orders', async(ctx)=>{    //删除订单
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


module.exports = admin 