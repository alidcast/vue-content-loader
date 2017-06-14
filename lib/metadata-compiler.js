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
 */
exports.mergeMetadata = function(source, metadata) {
  const hasData = {}
  var script
  if (!source) {
    script = `
      <script>
        export default {
          $metadata: ${JSON.stringify(metadata)}
        }
      </script>
    `
  } else { // append $metadata property to ending
    var endRegex = /\n?}?\n?(<\/script>)/
    var end = source.match(endRegex)[0]
    script = source.replace(endRegex, `,\n $metadata: ${JSON.stringify(metadata)}`
      + end)
  }
  return script
}
