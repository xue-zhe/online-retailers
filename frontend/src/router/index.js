import Vue from 'vue';
import VueRouter from "vue-router";
import Login from "../views/Login";
import Register from "../views/Register";
import Home from "../views/Home";
import Goods from "../components/commen/goods/Goods";
import Detaile from "../components/commen/goods/Detaile";
import Pay from "../components/commen/goods/Pay";
import Person from "../components/commen/person/Person";
import Personpassword from "../components/commen/person/Personpassword";
import Loginpassword from "../components/commen/login/Loginpassword";
import Orders from "../components/commen/Orders/Orders";


/**
 * 管理员页面组件引入
 * */
import ShopsInformation from "../components/admin/shopsmanagement/ShopsInformation";
import AdminHome from "../views/AdminHome";
import OrdersMentmanagement from "../components/admin/ordersmentmanagement/OrdersMentmanagement";

Vue.use(VueRouter)

const routes = [
  /**
   * 定向页面路由
   * */
  {
    path:'/',
    redirect:'/login'
  },
    /**
     * 登录页面路由
     * */
  {
    path: '/login',
    name: 'login',
    component: Login
  },
    /***
     * 注册页面路由
     **/
  {
    path: '/register',
    name: 'register',
    component: Register
  },
    {
        path:'/loginpassword',
        name:'loginpassword',
        component:Loginpassword
    },
    /**
     * 首页路由
     * */
  {
    path: '/home',
    name: 'home',
    component: Home,
    redirect:'/goods',
    children:[
      {
        path:'/goods',
        component:Goods
      },
        {
            path:'/detaile',
            component:Detaile
        },
        {
            path:'/orders',
            component:Orders
        },
        {
            path:'/person',
            component:Person
        },
        {
            path:'/personpassword',
            component:Personpassword
        },
        {
            path:'/pay',
            component:Pay
        }
    ]
  },
  /**
   * 管理员路由
   * */
    {
        path:'/adminhome',
        name:'adminhome',
        component:AdminHome,
        redirect:'/shopsinformation',
        children:[
            {
                path:'/shopsinformation',
                name:'shopsinformation',
                component:ShopsInformation
            },
            {
                path:'/ordersmentmanagement',
                component:OrdersMentmanagement
            },
        ]
    }
]

const router = new VueRouter({
  routes
})

//挂载路由导航守卫

router.beforeEach((to, from, next) => {
    //to 将要访问的路径
    //from 代表从哪个路径跳转而来
    //next 是一个函数，表示放行
    //  next（）放行 next（'/login'）强制跳转
    if (to.path === '/login'|| to.path === '/register' || to.path === '/loginpassword') return next()
    //获取账号
    const accountSrc = window.sessionStorage.getItem('account')
    if (!accountSrc) return next('/login')
    next()
})
export default router
