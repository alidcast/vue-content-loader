var path = require('path')
var loaderUtils = require('loader-utils')

var markdownCompilerPath = path.resolve(__dirname, 'markdown-compiler.js')

module.exports = function (source) {
  this.cacheable()

  this.options.__vueMarkdownOptions__ = this.query || this.vueMarkdown || this.options.vueMarkdown || {}

  this.options._filepath = this.resourcePath
  var filePath = this.resourcePath

  var r = loaderUtils.parseQuery(this, '!!vue-loader!' + markdownCompilerPath + '?raw!' + filePath)

  var result = 'module.exports = require(' +
    loaderUtils.stringifyRequest(this, '!!vue-loader!' + markdownCompilerPath + '?raw!' + filePath) +
  ');'

  return result
}
