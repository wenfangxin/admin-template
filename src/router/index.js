import Vue from 'vue'
import VueRouter from 'vue-router';
import NProgress from 'nprogress' // 引入nprogress插件 页面跳转出现在浏览器顶部的进度条
import 'nprogress/nprogress.css'  // 这个nprogress样式必须引入
import cookie from 'js-cookie';
NProgress.configure({ easing: 'ease', speed: 100, showSpinner: false })
Vue.use(VueRouter)
import Layout from '@/layout'

const routes = [
    {
        path: '/',
        component: Layout,
        redirect: '/home',
        nesting:false,
        children:[
            {
                path: "home",
                name: "home",
                component: ()=>import('@/views/home/index'),
                meta: {
                    icon: "icon-shouye",
                    title: "首页"
                }
            }
        ]
    },
    {
        path: "/auth",
        name: "auth",
        component: Layout,
        redirect:'/auth/a',
        nesting:true,
        meta:{
            title: "权限管理",
            icon: "icon-quanxian"
        },
        children:[
            {
                path: "a",
                name: 'a',
                component:()=> import('@/views/auth/a/index'),
                meta:{
                    title: "权限管理A"
                }
            },
            {
                path: "b",
                name: 'b',
                component:()=> import('@/views/auth/b/index'),
                meta:{
                    title: "权限管理B"
                }
            },
        ]
    },

    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/index.vue'),
        hidden: true,
    },
    {
        path: '*',
        name: 'NotFind',
        component: () => import('@/views/not-find/index.vue'),
        hidden: true,

    }
]


/**
 * 配置路由模式
 * @type {function(): *}
 */
const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});




/**
 * 路由权限校验
 */
router.beforeEach(async (to, from, next) => {
    NProgress.start()
    if (cookie.get('token') && cookie.get('token') !== 'undefined') { //判断本地是否存在access_token
        //如果本地 存在 token 则 不允许直接跳转到登录页面
        if (to.fullPath === "/login") {
            next();
            router.push(from.fullPath)
        } else {
            next()
        }

    } else {
        if (to.path === '/login') {
            next()
        } else {
            next(`/login`)
        }
    }
});

/**
 * 设置路由进度条
 */
router.afterEach(() => {
    NProgress.done()
})


export default router
