const merge = require('webpack-merge');
import *  as userApi from './userApi';
import * as loginApi from './loginApi';
import * as rainApi from './loginApi';

const result=merge(userApi,loginApi,rainApi);

export default result