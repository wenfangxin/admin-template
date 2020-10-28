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
        children: [
            {
                path: "/home",
                name: "home",
                component: ()=>import('@/views/home/index.vue'),
                meta: {
                    icon: "icon-shouye",
                    title: "首页"
                }
            },
            {
                path:'/auth',
                redirect:'/auth/a',
                meta: {
                    icon: "icon-quanxian",
                    title: "权限管理"
                },
                children:[
                    {
                        path: "a",
                        name: "a",
                        component: ()=>import('@/views/a/index.vue'),
                        meta: {
                            title: "a",
                        }
                    },
                    {
                        path: "b",
                        name: "b",
                        component: ()=>import('@/views/b/index.vue'),
                        meta: {
                            title: "b"
                        }
                    }
                ]
            }


        ]
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/index.vue'),
    },
    {
        path: '*',
        name: 'NotFind',
        component: () => import('@/views/not-find/index.vue'),
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
