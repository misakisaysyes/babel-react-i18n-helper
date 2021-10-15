const { isChinese, isMessageCall, genWrapper } = require('./utils')

module.exports = ({ types: t }) => {
  return {
    visitor: {
      Literal (path) {
        if (!isChinese(path.node.value)) path.skip()

        if (t.isJSXExpressionContainer(path.parent)) {
          path.replaceWith(genWrapper(path.node.value))
          path.skip()
        }

        if (t.isJSXAttribute(path.parent)) {
          path.replaceWith(genWrapper(path.node.value, 'jsx'))
          path.skip()
        }

        if (t.isCallExpression(path.parent)) {
          if (isMessageCall(path.parent)) {
            path.replaceWith(genWrapper(path.node.value))
            path.skip()
          }
        }
      },

      JSXText (path) {
        if (isChinese(path.node.value)) {
          path.replaceWith(genWrapper(path.node.value, 'jsx'))
          path.skip()
        }
      }
    }
  }
}
