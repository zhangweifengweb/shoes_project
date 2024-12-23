import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '*',
        redirect: "/login"
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/index.vue')
    },

    {
        path: '/home',
        component: () => import('@/views/home/index.vue'),
        children: [
            // {
            //   path: '/home/perInfo',
            //   name: 'perInfo',
            //   component: () => import('@/views/perInfo/index.vue')
            // },
            {
                path: '/home/priceStatistics',
                name: 'priceStatistics',
                component: () => import('@/views/priceStatistics/index.vue'),
                meta: {
                    pageName: "账号信息总览",
                    iconClass: "el-icon-s-data"
                }
            },
            {
                path: '/home/shoesSaleInfo',
                name: 'shoesSaleInfo',
                component: () => import('@/views/shoesSaleInfo/index.vue'),
                meta: {
                    pageName: "球鞋信息总览",
                    iconClass: "el-icon-menu"
                }
            },
            {
                path: '/home/shoeslist',
                name: 'shoeslist',
                component: () => import('@/views/shoeslist/index.vue'),
                meta: {
                    pageName: "球鞋管理",
                    iconClass: "el-icon-edit"
                }
            }
        ]
    }

]

const router = new VueRouter({
    mode: 'hash',
    base: '/',
    routes
})
// 导航守卫：使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
    if (to.path === '/login') {
        next();
    } else {
        let token = localStorage.getItem('token');

        if (token === null || token === '') {
            next('/login');
        } else {
            next();
        }
    }
});
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
    return VueRouterPush.call(this, to).catch(err => err)
}

export default router
