var loaderUtils = require('loader-utils')
var hljs = require('highlight.js')
var cheerio = require('cheerio')
var markdownit = require('markdown-it')
var extractMetadata = require('./metadata-compiler').extractMetadata
var mergeMetadata = require('./metadata-compiler').mergeMetadata

/**
 * `<pre></pre>` => `<pre v-pre></pre>`
 * `<code></code>` => `<code v-pre></code>`
 * @param  {string} str
 * @return {string}
 */
var addVuePreviewAttr = function (str) {
  return str.replace(/(<pre|<code)/g, '$1 v-pre')
}

/**
 * renderHighlight
 * @param  {string} str
 * @param  {string} lang
 */
var renderHighlight = function (str, lang) {
  if (!(lang && hljs.getLanguage(lang))) {
    return ''
  }

  return hljs.highlight(lang, str, true).value
}


/**
 * html => vue file template
 * @param  {[type]} html [description]
 * @return {[type]}      [description]
 */
var renderVueTemplate = function (html, metadata = {}) {
  var $ = cheerio.load(html, {
    decodeEntities: false,
    lowerCaseAttributeNames: false,
    lowerCaseTags: false,
  })

  var output = {
    style: $.html('style'),
    script: mergeMetadata($.html('script'), metadata),
  }

  var result

  $('style').remove()
  $('script').remove()

  result = '<template><section>\n' + $.html() + '</section></template>\n' +
    output.script + '\n' +
    output.style

  return result
}

module.exports = function (source) {
  this.cacheable && this.cacheable()

  var parser, preprocess
  var params = loaderUtils.parseQuery(this.query) || {}
  var vueMarkdownOptions = this.options.__vueMarkdownOptions__
  var opts = Object.create(vueMarkdownOptions.__proto__) // inherit prototype
  opts = Object.assign(opts, params, vueMarkdownOptions) // assign attributes

  if (typeof opts.render === 'function') {
    parser = opts
  } else {
    opts = Object.assign({
      preset: 'default',
      html: true,
      highlight: renderHighlight,
    }, opts)

    var plugins = opts.use
    preprocess = opts.preprocess

    delete opts.use
    delete opts.preprocess

    parser = markdownit(opts.preset, opts)

    if (plugins) {
      plugins.forEach(function (plugin) {
        if (Array.isArray(plugin)) {
          parser.use.apply(parser, plugin)
        } else {
          parser.use(plugin)
        }
      })
    }
  }

  /**
   * override default parser rules by adding v-pre attribute on 'code' and 'pre' tags
   * @param {Array<string>} rules rules to override
   */
  function overrideParserRules (rules) {
    if (parser && parser.renderer && parser.renderer.rules) {
      var parserRules = parser.renderer.rules
      rules.forEach(function (rule) {
        if (parserRules && parserRules[rule]) {
          var defaultRule = parserRules[rule]
          parserRules[rule] = function () {
            return addVuePreviewAttr(defaultRule.apply(this, arguments))
          }
        }
      })
    }
  }

  overrideParserRules([ 'code_inline', 'code_block', 'fence' ])

  if (preprocess) {
    source = preprocess.call(this, parser, source)
  }

  var { markdown, metadata } = extractMetadata(source)

  // convert markdown to HTML but avoid parsing vue '@' action handlers
  var content = parser
    .render(markdown.replace(/@/g, '__at__'))
    .replace(/__at__/g, '@')

  var result = renderVueTemplate(content, metadata)

  if (opts.raw) {
    return result
  } else {
    return 'module.exports = ' + JSON.stringify(result)
  }
}
