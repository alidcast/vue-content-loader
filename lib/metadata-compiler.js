var fm = require('front-matter')

/**
 * Extracts front matter and converts hypens to HTML comments.
 */
exports.extractMetadata = function (source) {
  const hasFrontMatter = source.match(/^---([^-]+)---/)

  let metadata = {},
      markdown = source

  if (hasFrontMatter) {
    metadata = fm(source).attributes
    markdown = source.replace(/^---/, '<!--').replace(/[^<]---/, '\r\n-->')
  }

  return {
    markdown,
    metadata
  }
}

/**
 * Adds $metadata property to Vue component script.
 *
 * Note: Also accepts and merges Nuxt.js layout property.
 */
exports.mergeMetadata = function(source, metadata) {
  if (metadata === {}) return source

  const layout = metadata.layout
  delete metadata.layout

  const layoutProp = `${layout ? `layout: ${layout},\n` : ''}`
  const metadataProp = `$metadata: ${JSON.stringify(metadata)}`
  var script
  if (!source) {
    script = `
      <script>
        export default {
          ${layoutProp},
          ${metadataProp}
        }
      </script>
    `
  } else {
    var endRegex = /\n?}?\n?(<\/script>)/
    var end = source.match(endRegex)[0]
    script = source.replace(endRegex,
      `,\n${layoutProp}` + `${metadataProp}\n`
      + end)
  }
  return script
}
