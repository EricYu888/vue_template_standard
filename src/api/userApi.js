import {httpClient} from './base.js'
import {DOMAIN} from './../shared/const.js';

export const getUsersAll=params=>{
    return httpClient.post(DOMAIN+`services/app/wmtRain/GetWmtRainDetail`,params)
}

export const getUserName=params=>{
    return httpClient.post(DOMAIN+`services/app/user/getUserDetail?id=`+params.id)
}