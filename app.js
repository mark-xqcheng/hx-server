/*
 * @Author       : liuxuhao
 * @LastEditors  : liuxuhao
 */
var createError = require('http-errors')
var express = require('express')
let ejs = require('ejs')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
const loggerHelper = require('./utils/logger')
const indexRouter = require('./app/routes/index')
const userRouter = require('./app/routes/user')
/** 可使用 npm run createModule 快速添加模块 */

const app = express()

// view engine setup
app.engine('.html', ejs.__express);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter)
app.use('/users', userRouter)
/** 可使用 npm run createModule 快速引用模块 */

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  if (err) {
    loggerHelper.error(err)
  }
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
