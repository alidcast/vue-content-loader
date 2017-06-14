<metadata>
</metadata>

<template>
  <div class="markdown-body">
    <!-- <markdown></markdown> -->
    <content> </content>
  </div>
</template>

<script>
// import markdown from './markdown.md'
import content from './content.md'
import 'highlight.js/styles/github.css'
import 'github-markdown-css'

export default {
  created() {
    console.log(content)
  },
  components: {
    // markdown,
    content
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
