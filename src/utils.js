const {
  stringLiteral,
  Identifier,
  memberExpression,
  CallExpression,
  jsxExpressionContainer
} = require('@babel/types')

const isChinese = val => /[\u4e00-\u9fa5]/.test(val)

const isMessageCall = node => node.callee.object.name === 'message'

const genWrapper = (msg, type = 'call') => {
  let res = CallExpression(memberExpression(Identifier('React'), Identifier('__')), [stringLiteral(`${msg}`)])
  type === 'jsx' && (res = jsxExpressionContainer(res))
  return res
}

module.exports = {
  isChinese,
  isMessageCall,
  genWrapper
}
