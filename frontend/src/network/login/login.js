import {request} from "../request";
export function getLoginMultidata(account,password){
    return request({
        url: 'login',
        method:'post',
        data:{
            account,
            password
        }
    })
}
export function getForgetPasswordMultidata(account,newpassword,password){
    return request({
        url: 'login/forget',
        method:'post',
        data:{
            account,
            newpassword,
            password
        }
    })
}