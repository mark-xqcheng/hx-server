/**
 * Created by LXHFIGHT on 2019/4/8
 * Email: lxhfight1@gmail.com
 * Description:
 *  用于处理请求对象的相关内容
 */
let object = require('./object')
let logger = require('./logger')
let excludeParams = ['page', 'pagesize', 'maxsize', 'order']   // 不列入合并搜索的字段名

/**
 * 根据请求参数获取Sequelize搜索条件对象
 * @param query
 * @returns {{where: {}, offset: (number|*), limit: *}}
 */
const getSearchBundle = (query) => {
  let { pagesize, page } = query, offset, limit, order;
  pagesize = (pagesize) ? (parseInt(pagesize)) : 20
  page = page || 1
  offset = pagesize * (page - 1)
  limit = pagesize
  let where = {} // 搜索条件对象
  for(let p in query){
    if (!excludeParams.includes(p)) {
      if (!((query[p] === '') || (query[p] === null ))) {
        if (!isNaN(parseFloat(query[p])) || p === 'id') {
          where[p] = query[p];
        } else {
          where[p] = {$like: `%${query[p]}%`};
        }
      } else {
        console.log('RequestHelper.js:  the param ' + p + ' is empty');
      }
    }
  }
  if (query.order) {
    order = `${query.order.key} ${query.order.type ? query.order.type : 'asc'}`
  } else {
    order = 'createdAt DESC'
  }
  return { where,  order,  offset, limit }
}

/**
 * 请求指定URL 并返回一个Promise对象， 获取对应的内容
 * @param {string} url 请求的url
 * @return {Promise} 
 */
let requestUrl = (url) => {
  let data = ''
  let requestModule = null
  let req = null
  if (url.indexOf('https') === 0) {
    requestModule = require('https')
  } else {
    requestModule =  require('http')
  }
  return new Promise((resolve, reject) => {
    req = requestModule.get(url, (httpsRes) => {
      httpsRes.setEncoding('utf8')
      httpsRes.on('data', (chunk) => {
        data += chunk
      })
      httpsRes.on('end', () => {
        resolve(data)
      })
    })
    req.on('error', (err) => {
      LogHelper.error('访问路径： ' + url + ' 获取参数失败')
      LogHelper.error(err)
      reject(err)
    })
    req.end()
  })
}

module.exports = {
  getSearchBundle,
  requestUrl
}
