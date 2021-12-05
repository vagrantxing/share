/*
 * @Author: xingtao
 * @Date: 2021-12-05 13:15:28
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-12-05 15:16:46
 * @Descripttion: 
 * @FilePath: \share\share\VueCliExample\src\router\index.js
 */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'DataList',
        component: () =>
            import ("@/components/DataList"),
        meta: {
            title: '人员列表'
        }
    }]
})