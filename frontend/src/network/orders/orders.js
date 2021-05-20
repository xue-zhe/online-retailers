import {request} from "../request";

/**
 * 创建订单
 **/
export function getaddordersMultidata(account,shops, goods, price, imgs, purchases, addressee, address, phone, state,date,shopsaccount){
    return request({
        url: 'orders/add/orders',
        method:'post',
        data:{
            account,shops, goods, price, imgs, purchases, addressee, address, phone, state, date,shopsaccount
        }
    })
}
/**
 * 请求订单数据
 **/
export function getorderslistMultidata(account){
    return request({
        url: 'orders/refer/orders',
        method:'post',
        data:{
            account
        }
    })
}
/**
 * 确定收货
 **/
export function getconfirmorderslistMultidata(id){
    return request({
        url: 'orders/amend/confirm',
        method:'post',
        data:{
            id
        }
    })
}
/**
 * 退货
 **/
export function getreturnorderslistMultidata(id,value){
    return request({
        url: 'orders/amend/shipments',
        method:'post',
        data:{
            id,
            value
        }
    })
}

/**
 *删除
 **/
export function getdeleteorderslistMultidata(id){
    return request({
        url: 'orders/delete/orders',
        method:'post',
        data:{
            id
        }
    })
}

/**
 * 评分
 **/
export function getrateMultidata(id,ratevalue){

    return request({
        url: 'orders/amend/rate',
        method:'post',
        data:{
            id,
            ratevalue
        }
    })
}