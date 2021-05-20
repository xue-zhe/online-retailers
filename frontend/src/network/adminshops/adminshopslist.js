import {request} from "../request";
/**
 * 查找商品信息
 * */
export function getShopsListMultidata(curPage,pageSize,account){
    return request({
        url: 'admin/refer/goods',
        method:'post',
        data:{
            curPage,pageSize,account
        }
    })
}
/**
 * 根据id查询
 * */
export function getshopslistMultidata(curPage,pageSize,id) {
    return request({
        url: 'admin/refer/goods/id',
        method: 'post',
        data: {
            curPage, pageSize, id
        }
    })
}
/**
 *模糊查询商品信息
 **/
export function getShopslistMultidata(curPage,pageSize,index){
    return request({
        url: 'admin/dimrefer/goods',
        method:'post',
        data:{
            curPage,pageSize,index
        }
    })
}
/**
 *修改用户信息
 * */
export function getshopseditMultidata(
    goods,type,
    price,description,
    stock, img,
    id,imgslist){
    return request({
        url: 'admin/amend/goods',
        method:'post',
        data:{
            goods,type,
            price,description,
            stock,img,
            id,imgslist
        }
    })
}


/**
 * 删除用户
 **/
export function getshopsdeleteMultidata(id){
    return request({
        url: 'admin/delete/goods',
        method:'post',
        data:{
            id
        }
    })
}


/**
 * 添加商品
 **/

export function getshopsaddMultidata(
    account,
    goods,
    type,
    price,
    oldprice,
    description,
    stock,
    img,
    shops,
    imgslist){
    return request({
        url: 'admin/add/goods',
        method:'post',
        data:{
            account,
            goods,
            type,
            price,
            oldprice,
            description,
            stock,
            img,
            shops,
            imgslist,
        }
    })
}
