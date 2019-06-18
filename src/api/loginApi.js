import {httpClient} from './base.js'
import {DOMAIN} from './../shared/const.js';

export const login=params=>{
    return httpClient.post(DOMAIN+`services/app/user/login`,{'username':params.username,'password':params.password} )
}