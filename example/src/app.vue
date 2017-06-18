<template>
  <div class="markdown-body">
    The layout: {{ layout }} <br>
    Your metadata: {{ metadata }}
    </br> </br>
    <MetadataContent />
    <Markdown />
  </div>
</template>

<script>
import Markdown from './markdown.md'
import MetadataContent from './content.md'
import 'highlight.js/styles/github.css'
import 'github-markdown-css'

export default {
  data() {
    return {
      layout: MetadataContent.layout,
      metadata: MetadataContent.$metadata
    }
  },
  components: {
    Markdown,
    MetadataContent
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
