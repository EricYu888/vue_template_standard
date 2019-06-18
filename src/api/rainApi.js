import {httpClient} from './base.js'
import {DOMAIN} from './../shared/const.js';

export const getAllRain=params=>{
    return httpClient.post(DOMAIN+`services/app/wmtRain/GetWmtRainDetail`,params)
}