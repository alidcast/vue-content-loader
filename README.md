# vue-content-loader

Extends `vue-markdown-loader` to accept front-matter and adds the metadata to Vue component.

## Installation

```bash

npm install vue-content-loader --save-dev

```

## Basic Usage

The following markdown file:

```
// ~content/MyFirstPost.md
---
title: "My First Post"
---

# Hello World

```

Can be used as such:

```js
import FirstPost from '~content/FirstPost'

FirstPost.$metadata // { title: "My First Post" }
```

Note: `vue-content-loader` also supports Nuxt.js `layout` property. It treats
this key in the front-matter differently, inserting it into the component's `layout` property, rather than the `$metadata` property.

## How it works

You can use front-matter and Vue components in your markdown files:

```md
---
title: "My first post!"
---

# Hello

This is my newest project:

<SomeDemo />

<script>
import SomeDemo from '~components/demo'

export default {
  component: {
    SomeDemo
  }
}
</script>
```

The content is parsed in three main steps:

First, the metadata is extracted and the front matter is commented out.

Then, the markdown file is converted into a single Vue component file.

Finally, the `$metadata` property is added to Vue component.

The result:

```
// ~content/FirstPost.md

<template>
<!--
title: "My first post!"
-->
<h1>Hello</h1>
<SomeDemo></SomeDemo>
</template>

<script>
import SomeDemo from '~components/demo'
export default {
  component: {
    SomeDemo
  },
  $metadata: { title: "My first post!" }
}
</script>
```

## More information

See [vue-markdown-loader](https://github.com/QingWei-Li/vue-markdown-loader) for additional usage.


## Lisence

WTFPL
