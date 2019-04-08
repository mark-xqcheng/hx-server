let co = require('co')
const AliyunOss = require('ali-oss')
const qiniu = require('qiniu')
const logger = require('./logger')
const aliConfig = require('../config/oss/aliyun')
const qiniuConfig = require('../config/oss/qiniu')
let client = null

/**
 *  阿里云文件上传工具方法
 *  @param key          键 例如 “avatar/343728-3237218-2321.jpg”
 *  @param filePath     目录
 *  @return {Promise} 返回Promise 成功的回调方法
 */
let AliyunUploadFile = (key, filePath) => {
  const { oss_conf } = aliConfig
  return new Promise((resolve, reject) => {
    if (use_oss) {
      if (!client) {
        client = new AliyunOss(oss_conf)
      }
      co(function* () {
        let result = yield client.put(key, filePath)
        logger.success('阿里云上传图片成功, 成功信息为：')
        logger.success(result)
        resolve(result)
      }).catch(function (err) {
        logger.error('阿里云处理上传图片出错，具体信息为: ')
        logger.error(err)
        reject(err)
      });
    } else {
      let err = { errMsg: 'please switch the use_oss param to true in /config/oss/aliyun.js' }
      reject(err)
    }
  })
}

/**
 * 七牛云文件上传工具方法
 * @param key
 * @param filePath
 * @return {Promise} 返回Promise 成功的回调方法
 */
let QiniuUploadFile = (key, filePath) => {
  const { oss_conf } = qiniuConfig
  return new Promise((resolve, reject) => {
    if (use_oss) {
      const putPolicy = new qiniu.rs.PutPolicy(oss_conf.bucket+":"+key)
      let token = putPolicy.token()
      let extra = new qiniu.io.PutExtra()
      qiniu.io.putFile(token, key, filePath, extra, (err, result) => {
        if (!err) {
          logger.success('七牛云上传图片成功, 成功信息为：')
          logger.success(result)
          resolve({url: (oss_conf.prefix + result.key)})
        } else {
          logger.error('七牛云处理上传图片出错，具体信息为: ')
          logger.error(err.stack)
          reject(err)
        }
      })
    } else {
      reject({ errMsg: 'please switch the use_oss param to true in  in /config/oss/qiniu.js file' })
    }
  })
}

module.exports = {
  AliyunUploadFile,
  QiniuUploadFile
}
