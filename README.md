# vue-content-loader

Extends `vue-markdown-loader` to accept metadata.

## Installation

```bash

npm install vue-content-loader --save-dev

```

## Usage
[Documentation: Using loaders](https://webpack.js.org/concepts/loaders/)

`webpack.config.js` file:

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.md$/,
        loader: 'vue-markdown-loader'
      }
    ]
  }
};
```

## Options

reference [markdown-it](https://github.com/markdown-it/markdown-it#init-with-presets-and-options)
```javascript
{
  module: {
    rules: [
      {
        test: /\.md$/,
        loader: 'vue-markdown-loader'
        options: {
          // markdown-it config
          preset: 'default',
          breaks: true,
          preprocess: function(markdownIt, source) {
            // do any thing
            return source
          },
          use: [
            /* markdown-it plugin */
            require('markdown-it-xxx'),
            /* or */
            [require('markdown-it-xxx'), 'this is options']
          ]
        }
      }
    ]
  }
}
```

Or you can customize markdown-it
```javascript
var markdown = require('markdown-it')({
  html: true,
  breaks: true
})

markdown
  .use(plugin1)
  .use(plugin2, opts, ...)
  .use(plugin3);

module.exports = {
  module: {
    rules: [
      {
        test: /\.md$/,
        loader: 'vue-markdown-loader',
        options: markdown
      }
    ]
  }
};
```

## License
WTFPL
