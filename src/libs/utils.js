// import axios from '@/libs/axios'

function padLeftZero (str) {
  return ('00' + str).substr(str.length)
}

export const escape2Html = str => {
  if (!str) return ''
  var arrEntities = {
    lt: '<',
    gt: '>',
    nbsp: ' ',
    amp: '&',
    quot: '"',
    mdash: '—',
    ldquo: '“',
    rdquo: '”'
  }
  return str.replace(/&(lt|gt|nbsp|amp|quot|mdash|ldquo|rdquo);/g, (all, t) => arrEntities[t])
}

export const scrollTop = () => {
  window.scrollTo(0, 0)
}

export const filterHtml = str => {
  str = str.replace(/<[^>].*?>/g, '')
  return str
}

export const ellipsis = value => {
  // const len = value.length
  if (!value) return ''
  if (value.length > 20) {
    return value.substring(0, 200) + '......'
  }
  return value
}

export const formatDate = (date, fmt) => {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      const str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}
