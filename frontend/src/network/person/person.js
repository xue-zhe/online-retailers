import {request} from "../request";
export function getPersonReferMultidata(accont){
    return request({
        url: 'person/refer',
        method:'post',
        data:{
            accont
        }
    })
}

export function getPersonAmendMultidata(phone,name, account, address){
    return request({
        url: 'person/amend',
        method:'post',
        data:{
            phone,name, account, address
        }
    })
}

export function getPersonPasswordMultidata(account,oldpassword,newpassword,password){
    console.log(account)
    return request({
        url: 'login/amends',
        method:'post',
        data:{
            account,
            oldpassword,
            newpassword,
            password
        }
    })
}

export function getregistershopsMultidata(account,shopsname){
    return request({
        url: 'person/amend/shops',
        method:'post',
        data:{
            account,
            shopsname
        }
    })
}