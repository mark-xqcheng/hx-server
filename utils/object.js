/**
 * Created by LXHFIGHT on 2019/4/6 11:55.
 * Email: lxhfight1@gmail.com
 * Description:
 *  function for processing js Object
 */

const shuffle = require('knuth-shuffle')
const crypto = require('crypto')
const pinyin = require('pinyin')

/**
 * 对数组乱序处理
 * @param arr 操作对象数组
 */
const randomArray = (arr) => {
  if (!Array.isArray(arr)) {
    return null
  }
  return shuffle(arr)
}

/**
 * 生成随机数
 * @param options 随机生成对象
 * @param options.from 区间下限（包括）
 * @param options.to   区间上限（不包括）
 */
const randomNumber = (options) => {
  if (Object.prototype.toString.call(options) === '[object Number]') {
    return Math.floor(Math.random() * options);
  } else {
    return options.from + Math.floor(Math.random() * Math.abs(options.to - options.from));
  }
}

/**
 * 生成随机字符串，基于0-9  大小写字母
 * @param length 字符串长度
 */
const randomString = (length) => {
  let result = ''
  let tpl = '0123456789qwertyuiopasdfghjklzxcvbnmZXCVBNMASDFGHJKLQWERTYUIOP'
  for (let i = 0; i < length; i++) {
    result += tpl.charAt(randomNumber({from: 0, to: 62}))
  }
  return result
};

/**
 * 加密字符串通用方法 
 * @param {string} str 待处理字符串
 * @param {string} algorithm 加密算法 常见的有 'md5', 'RSA-MD5', 'md5-sha1', 'RSA-SHA1', 'sha1', 'sha256'
 */
const encryptStr = (str, algorithm = 'md5') => {
  console.log('supported:', crypto.getHashes())
  if (crypto.getHashes().includes(algorithm)) {
    let shasum = crypto.createHash(algorithm)
    shasum.update(str)
    return shasum.digest('hex')
  } else {
    return { errMsg: `不存在${algorithm}这种加密算法,可选项参照content`, content: supported }
  }
}

/**
 * 获取字符串拼音
 * @param {String} str 待处理字符串 
 */
const getPinyin = (str) => {
  let result = pinyin(str, {
    style: pinyin.STYLE_NORMAL,
    heteronym: false
  })
  return result.join('').toLowerCase()
}

module.exports = {
  randomArray,
  randomNumber,
  randomString,
  encryptStr,
  getPinyin
}
