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

First, the metadata is extracted, the front matter is converted into an HTML comment,
and the markdown file is converted into a single Vue component file.

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

Then, extracted metadata is appended to the component's `data` property!


```
import FirstPost from '~content/FirstPost'

console.log(FirstPost.data().title // "My First Post"

```
