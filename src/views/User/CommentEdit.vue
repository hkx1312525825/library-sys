<template>
  <div class="comment-edit-page">
    <Form
      ref="commentDetail"
      :model="commentDetail"
      :rules="commentDetailRules"
      :label-width="100"
    >
      <FormItem label="标题" prop="title">
        <Input v-model="commentDetail.title" placeholder="请输入标题"></Input>
      </FormItem>
      <FormItem label="内容" prop="detail">
        <Editor
          :content="commentDetail.detail"
          @getContent="getContent"
        ></Editor>
      </FormItem>
      <div class="btn-end">
        <Button type="primary" @click="submit('commentDetail')">提交</Button>
        <Button @click="$router.push({name: 'ReserveCenter'})">返回</Button>
      </div>
    </Form>
  </div>
</template>

<script>
import { Form, FormItem, Input, Button, Message } from 'view-design'
import Editor from '@/components/Editor.vue'
import axios from '@/libs/axios'
export default {
  name: '',
  components: {
    Form,
    FormItem,
    Input,
    Editor,
    Button
  },
  props: ['bookId',
    'reserveId'],
  data () {
    return {
      commentDetail: {
        title: '',
        detail: '',
        book_id: null,
        user_id: null,
        reserve_id: null
      },
      commentDetailRules: {
        title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        detail: [{ required: true, message: '请输入标题', trigger: 'blur' }]
      }
    }
  },
  computed: {
    user () {
      return this.$store.state.currentUser
    }
  },
  methods: {
    getContent (content) {
      this.commentDetail.detail = content
    },
    submit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.commentDetail.user_id = this.user.id
          this.commentDetail.book_id = this.bookId
          this.commentDetail.reserve_id = this.reserveId
          axios.request({ url: 'CreateComment', method: 'post', data: this.commentDetail }).then(res => {
            Message.success('提交评论成功!')
            this.$router.push({ name: 'ReserveCenter' })
          })
        } else {
          Message.error('提交评论失败，请输入必填项!')
        }
      })
    }
  },
  created () {
  }
}
</script>

<style lang="less" scoped>
.comment-edit-page {
  width: @content-width;
  margin: 15px auto;
  // background: pink;
  padding: 15px;
  .btn-end {
    float: right;
    > button {
      margin-left: 15px;
    }
  }
}
</style>
