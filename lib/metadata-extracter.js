var fm = require('front-matter')

exports.extractMetadata = function (source) {
  const hasFrontMatter = source.match(/^---([^-]+)---/)

  let metadata = {},
      markdown = source

  if (hasFrontMatter) {
    metadata = fm(source).attributes
    // replace front matter with commented out metadata
    markdown = source.replace(/^---/, '<!--').replace(/[^<]---/, '\r\n-->')
  }

  return {
    markdown,
    metadata
  }
}

exports.metadataLoader = function(html) {

}

// exports.metadataBlock = function(source, map) {
//   this.callback(null, 'module.exports = function(Component) {Component.options.__docs = ' +
//     JSON.stringify(source) +
//     '}', map)
// }
