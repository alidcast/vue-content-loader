# vue-content-loader

Extends `vue-markdown-loader` to accept metadata.

## Installation

```bash

npm install vue-content-loader --save-dev

```

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

First, the metadata is extracted and the front matter is commented out.

Then, the markdown file is converted into a single Vue component file.

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
  }
}
</script>
```

Finally, the extracted metadata is appended to the component's `data` property!


```
import FirstPost from '~content/FirstPost'

console.log(FirstPost.data().title // "My First Post"

```
