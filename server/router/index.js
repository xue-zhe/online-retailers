const Router = require('koa-router');
const router = new Router();
const login = require('./login');
const register = require('./register')
const verification = require('./verification')
const shops = require('./shops')
const admin = require('./admin')
const imgs = require('./imgs')
const orders = require('./orders')
const person = require('./person')

router.use('/login',login.routes(), login.allowedMethods());   //登录
router.use('/register',register.routes(), register.allowedMethods());   //注册
router.use('/verification',verification.routes(), verification.allowedMethods());  //验证码
router.use('/shops',shops.routes(), shops.allowedMethods());  //商品信息
router.use('/admin',admin.routes(), admin.allowedMethods());   //管理员对网站的管理
router.use('/imgs',imgs.routes(), imgs.allowedMethods());   //首页
router.use('/orders',orders.routes(), orders.allowedMethods());   //首页
router.use('/person',person.routes(), person.allowedMethods());   //个人中心
router.redirect('/','/home')    
module.exports = router