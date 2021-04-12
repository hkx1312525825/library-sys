<template>
  <div id="wangeditor">
    <div ref="editorElem" style="text-align:left;"></div>
  </div>
</template>

<script>
import E from 'wangeditor'
export default {
  name: 'Editor',
  props: {
    content: {
      type: String
      // default: '暂无简介'
    }
  },
  data () {
    return {
      editor: null,
      editorContent: this.content
    }
  },
  watch: {
    content (newData) {
      this.editor.txt.html(this.content)
      return newData
    }
  },
  methods: {
    createEditor () {
      this.editor = new E(this.$refs.editorElem)
      this.editor.config.excludeMenus = [
        'image',
        'video'
      ]
      this.editor.config.onchange = (newHtml) => {
        this.$emit('getContent', newHtml)
      }
      this.editor.config.onchangeTimeout = 1000
      this.editor.config.pasteIgnoreImg = true
      this.editor.config.pasteFilterStyle = false
      this.editor.config.zIndex = 1
      this.editor.create() // 创建富文本实例
    }
  },
  mounted () {
    this.createEditor()
  }
}
</script>

<style lang="less" scoped>

</style>
