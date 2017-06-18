---
layout: "posts"
title: "Vue Content Component"
---

Some text here.

# And some headings, too.

As well as components:

<Demo />

<script>
import Demo from '~example/demo'

export default {
  data() {
    return { msg: "Hello World" }
  },
  components: {
    Demo
  }
}
</script>
