import {request} from "../request";

/**
 * 查找商品信息
 * */
export function getShopsListMultidata(curPage,pageSize){
    return request({
        url: 'shops/refer/goods',
        method:'post',
        data:{
            curPage,pageSize
        }
    })
}

export function getshopslistMultidata(curPage,pageSize,index){
    return request({
        url: 'shops/dimrefer/goods',
        method:'post',
        data:{
            curPage,pageSize,index
        }
    })
}