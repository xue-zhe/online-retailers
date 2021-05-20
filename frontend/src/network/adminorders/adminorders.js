import {request} from "../request";
/**
 * 查看订单情况
 * */
export function getOrdersListMultidata(curPage,pageSize,shopsaccount){
    return request({
        url: 'admin/refer/orders',
        method:'post',
        data:{
            curPage,pageSize,shopsaccount
        }
    })
}

/**
 * 查看订单状态
 * */
export function getOrdersListidMultidata(id){
    return request({
        url: 'admin/refer/orders/id',
        method:'post',
        data:{
            id
        }
    })
}
/**
*模糊查询订单信息
**/
export function getOrderslistMultidata(curPage,pageSize,index){
    return request({
        url: 'admin/dimrefer/orders',
        method:'post',
        data:{
            curPage,pageSize,index
        }
    })
}
/**
 * 发货
 **/
export function getShipmentsMultidata(id,state){
    return request({
        url: 'admin/amend/shipments',
        method:'post',
        data:{
            id,
            state
        }
    })
}

/**
* 退货
**/
export function getreturnMultidata(id,state){
    return request({
        url: 'admin/amend/return',
        method:'post',
        data:{
            id,
            state
        }
    })
}

/**
 * 删除商品
 **/
export function getdeleteMultidata(id){
    return request({
        url: 'admin/delete/orders',
        method:'post',
        data:{
            id,
        }
    })
}
