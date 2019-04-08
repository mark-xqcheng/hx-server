/**
 * Created by LXHFIGHT on 2019/4/8
 * Email: lxhfight1@gmail.com
 * Description:
 *  Qiniu OSS configuration
 *  URL: https://developer.qiniu.com/kodo/sdk/nodejs
 */
const use_oss = true
const oss_conf = {
  ACCESS_KEY: '', // TODO 七牛云账号的accessKey
  SECRET_KEY: '', // TODO 七牛云账号的accessKeySecret
  bucket: '', // TODO 七牛云OSS对象存储桶名字
  prefix: 'http://*******.bkt.clouddn.com/' // TODO 七牛云OSS外链前缀【结尾记得带上"/"】
}

module.exports = {
  use_oss,
  oss_conf
}
