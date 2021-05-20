import {request} from "../request";

export function getShopslistMultidata(id){
    return request({
        url: 'shops/refer/goods/id',
        method:'post',
        data:{
            id
        }
    })
}

/**
 * 根据id修改库存量
 * */
export function getstockMultidata(id,stock) {
    return request({
        url: 'shops/refer/goods/stock',
        method: 'post',
        data: {
            id,
            stock
        }
    })
}