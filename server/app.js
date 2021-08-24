var express = require('express')
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var session = require('express-session')
var MongoStore = require('connect-mongo')(session)
var bodyParser = require('body-parser');
var cors = require('cors')

var index = require('./routes/index')
var users = require('./routes/users')
var userRole = require('./routes/userRole')
var brands = require('./routes/brand')
var appApplication = require('./routes/appApplication')
var faqs = require('./routes/faq')
var tags = require('./routes/tags')
var replyes = require('./routes/replyes')
var spaces = require('./routes/spaces')
var chats = require('./routes/chats')
var customers = require('./routes/customers')
var onlineShowrooms = require('./routes/onlineShowroom')
var carousels = require('./routes/carousels')//轮播
var suppliersReview = require('./routes/suppliersReview') //供应商审核
var inviter = require('./routes/supplierInviter')  //邀请供应商
var suppliers = require('./routes/suppliers')
var caigou = require('./routes/caigou')
var caigouInfo = require('./routes/caigouInfo')
var caigouGuanxi = require('./routes/caigouGuanxi')
var business = require('./routes/business')  
var productCatalog = require('./routes/productCatalog')
var orders = require('./routes/order')
var products = require('./routes/product')
var upload = require('./routes/upload')


var app = express()


//设置跨域访问
// app.all('*', function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//   res.header("X-Powered-By",' 3.2.1')
//   res.header("Content-Type", "application/json;charset=utf-8");
//   next();
// });

var mongoose = require('mongoose')

mongoose.Promise = global.Promise
// db
const dburl = "mongodb://localhost:27017/shop";

mongoose.connect(dburl, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true, useUnifiedTopology: true }).then(() => console.log('Database Successful！')).catch((err) => console.log(err));


var port = normalizePort(process.env.PORT || '4000');
// 

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}


mongoose.connection.on('error', () => {
  console.log('Mongodb connected fail!')
})
mongoose.connection.on('disconnected', () => {
  console.log('Mongodb disconnected!')
})

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')
// app.set('port', port)

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))

//设置请求头的最大值，因为vue  post 提效时携带token 超出限制报 431
//express.json()  express.urlencoded 替换 已经被废弃掉的body-parser
app.use(express.json({limit:'100mb'}));
app.use(express.urlencoded({ limit:'100mb', extended: true }));
app.use(cookieParser('ordersecrettoken'))
app.use(session({
  secret: 'ordersecrettoken',
  cookie: {
    maxAge: 24 * 3600 * 1000 * 7
  },
  store: new MongoStore({
    url: 'mongodb://127.0.0.1:27017/shop'
  }),
  resave: false,
  saveUninitialized: false
}))

app.use(express.static(path.join(__dirname, 'public')))

// 记录访问次数
/* app.use((req, res, next) => {
  if (req.session.views) {
    req.session.views++
    console.log(`欢迎第 ${req.session.views} 次访问`)
    next()
  } else {
    req.session.views = 1
    console.log(`欢迎首次访问`)
    next()
  }
}) */

app.use(cors())

app.use('/', index)
app.use('/api/user', users)
app.use('/api/user/role',userRole)
app.use('/api/brand',brands)
app.use('/app/application',appApplication)
app.use('/faq', faqs)
app.use('/tag',tags)
app.use('/replye',replyes)
app.use('/space',spaces)
app.use('/chat',chats)
app.use('/customer',customers)
app.use('/api/platform/online/room',onlineShowrooms)
app.use('/api/carousel',carousels)
app.use('/api/supplier',suppliersReview)
app.use('/api/caigou',caigou)
app.use('/api/caigou/info', caigouInfo)
app.use('/api/caigou/guanxi',caigouGuanxi)
app.use('/api/buyer/inviter',inviter)
app.use('/api/business',business)
app.use('/api/product/catalog', productCatalog)
// app.use('/supplier',suppliers)
app.use('/api/order',orders)
app.use('/api/product',products)
app.use('/api/upload/file',upload)




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})


const ip ='192.168.31.182'
// const ip ='192.168.51.57'
const server = app.listen(port, ip, () => {
  const host = server.address().address
  const port = server.address().port
  console.log("server started! 访问地址为 http://%s:%s", host, port)
});
// module.exports = app