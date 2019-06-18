import axios from 'axios'
import  JWT from 'jsonwebtoken'
import {MessageBox,Message} from 'element-ui';
import { stat } from 'fs';

const CryptoJS = require('crypto-js')

const base='http://localhost:6240/api/';
const sessionTimeout=false;
// if(process.env.NODE_ENV==='build')
// {
//     base='...'
// }

axios.defaults.withCredentials=true;

export const httpClient=axios.create({
    baseUrl:base,
    //导出excel数据量大时，1分钟下载不下来，暂时放开
    //timeout:60000
})
export const httpClient2=axios.create()

httpClient.interceptors.response.use(response=>{
    return response
},err=>{
    try{
        const result=err.response.data;
        const status=err.response.status;
        console.log('try',status);
        if(status===401)
        {
            if(!sessionTimeout)
            {
                sessionStorage=true;
                MessageBox.alert('登录超时,请重新登录。','提示信息',{
                    confirmButtonText:'确定',
                    callback:action=>{
                        window.open('/','_self')
                    }
                });
            }
            return;
        }
        else if(status===417)
        {
            Message.error({showClose:true,message:result.message});
            return;
        }
        return result
    }catch(e){
        return Promise.reject(err)
    }
})

// 配置post请求时，后台接口数据通过@ReqeustParam获取不到适配
export const postParamConfig = {
    transformRequest: [function (data) {
      // Do whatever you want to transform the data
      let ret = ''
      let isComplex = false
      for (let it in data) {
        if (typeof (data[it]) === 'object') {
          isComplex = true
          break
        }
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      if (isComplex) return data
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }