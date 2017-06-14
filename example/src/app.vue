<metadata>
</metadata>

<template>
  <div class="markdown-body">
    <!-- <markdown></markdown> -->
    <test />
  </div>
</template>

<script>
// import markdown from './markdown.md'
import test from './content.md'
import 'highlight.js/styles/github.css'
import 'github-markdown-css'

export default {
  created() {
    console.log(test)
  },
  components: {
    // markdown,
    test
  }
}
</script>
<style>
  .markdown-body {
    box-sizing: border-box;
    min-width: 200px;
    max-width: 980px;
    margin: 0 auto;
    padding: 45px;
  }
</style>
