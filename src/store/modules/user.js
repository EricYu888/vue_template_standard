import Api from '../../api';
import * as types from '../mutation-type';

 
 

// const user={
//     state:{
//         userName:null,
//         userStatus:null
//     },
//     getters:{
//         getUserName:state=>state.userName,
//         getUserStatus:state=>state.userStatus
//     },
//     actions:{
//         getUserNameMethod({commit,state},params){
//             Api.getUserName(params).then(function(res){
//                 console.log(res)
//             })
//         }
//     },
//     mutations:{
//         [types.USER_INFO](state,{username}){
//             state.userName=username;
//         },
//         [types.USER_STATUS](state,{status}){
//             state.USER_STATUS=status;
//         }
//     }
   
// }

const state={
    userName:null,
    userStatus:null
}
const getters={
    // getUserName: state => state.userName,
    appendUser(state)
    {
        return state.userName+"3423344";
    },

    getUserStatus: state => state.userStatus
}
const actions={
    getUserName({commit,state},params){
        Api.getUserName(params).then(function(res){
             if(res.data.result.isSuccess)
             {
                 let name=res.data.result.data[0].username+"88888888";
                 commit(types.USER_INFO,name)
             }
        }).catch(function (error) {
            console.log(error)
        })
    }
}
const mutations={
    [types.USER_INFO](state,username){
        state.userName=username;
    },
    [types.USER_STATUS](state,{status}){
        state.USER_STATUS=status;
    }
}


export default {
    state,
    getters,
    actions,
    mutations
}

 
