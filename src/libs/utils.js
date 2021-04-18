// import axios from '@/libs/axios'

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
