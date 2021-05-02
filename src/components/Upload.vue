<template>
  <div class="components-upload">
    <Upload
      ref="upload"
      accept="image/*,.pdf"
      :disabled="isDisabled"
      :action="uploadUrl"
      multiple
      :max-size="maxSize"
      :before-upload="beforeUpload"
      :on-success="onSuccess"
      :on-exceeded-size="onExceededSize"
      :on-format-error="formatError"
      :on-error="onError"
      :on-remove="onRemove"
      :on-preview="onPreview"
      :default-file-list="files"
    >
      <Button icon="ios-cloud-upload-outline">上传附件</Button>
      <div slot="tip" class="upload-right">
        <div>
          (<span class="currentLen">{{ files.length }}</span
          >/<span>{{ max }}</span
          >)
        </div>
        <div class="tips">{{ tips }}</div>
      </div>
    </Upload>
  </div>
</template>

<script>
import { Upload, Button, Message } from 'view-design'
import { baseURL } from '@/config'
export default {
  name: 'upload',
  props: {
    max: {
      type: [String, Number],
      default: 1
    },
    maxSize: {
      type: [String, Number],
      default: 10240
    },
    length: {
      type: [String, Number]
    },
    tips: {
      type: String,
      default: '支持图片、pdf'
    },
    files: {
      type: Array
    },
    disabled: {
      type: Boolean
    }
  },
  components: {
    Upload,
    Button
  },
  // watch: {
  //   files (val) {
  //     console.log(val)
  //     if (val.length >= this.max) {
  //       this.isDisabled = true
  //     } else {
  //       this.isDisabled = false
  //     }
  //     if (val.length > 0) {
  //       val.forEach(element => {
  //         element.name = element.originalName
  //       })
  //     }
  //     debugger
  //     this.files = val
  //   }
  // },
  data () {
    return {
      isDisabled: false,
      fileList: this.files,
      uploadUrl: baseURL + 'upload'
    }
  },
  methods: {
    beforeUpload () {
      if (this.files.length >= this.max) {
        this.isDisabled = true
        Message.warning('限制上传的文件数量为' + this.max)
        return false
      } else {
        this.isDisabled = false
      }
    },
    onSuccess (res, file, fileList) {
      this.files.push(res)
      console.log(this.files)
      this.backFile(fileList)
    },
    onError (error, file, fileList) {
      console.log(error)
    },
    onRemove (file) {
      const fileList = this.files
      const index = fileList.findIndex(item => item.id === file.id)
      console.log(index)
      fileList.splice(index, 1)
      // this.currentLen = fileList.length;
      this.backFile(fileList)
    },
    formatError () {
      Message.warning('只支持上传pdf、图片文件')
    },
    onExceededSize () {
      Message.warning(`附件内容过大，请上传${this.maxSize / 1024}M以内的文件`)
    },
    onPreview (file) {
      window.open(file.response.url)
    },
    backFile (el) {
      this.$emit('getFile', el)
    }
  }
}
</script>

<style lang="less">
@diy-background-color: #2994ff;
@diy-error-color: #ff4d4f;
.components-upload {
  position: relative;
  .upload-right {
    position: absolute;
    left: 120px;
    top: 0;
    width: 570px;
    display: flex;
    flex-direction: row;
    .currentLen {
      color: @diy-background-color;
    }
    .tips {
      margin-left: 15px;
      color: @diy-error-color;
    }
  }
  .ivu-upload {
    text-align: left;
    .ivu-btn {
      width: 106px !important;
      height: 32px !important;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(221, 221, 221, 1);
      font-size: @h6-font-size!important;
    }
  }
}
</style>
