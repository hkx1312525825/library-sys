<template>
  <div>
    <Breadcrumb :style="{ margin: '24px 0' }">
      <!-- <BreadcrumbItem>Home</BreadcrumbItem> -->
      <BreadcrumbItem>书籍管理</BreadcrumbItem>
      <BreadcrumbItem>书籍管理</BreadcrumbItem>
      <BreadcrumbItem>编辑书籍</BreadcrumbItem>
    </Breadcrumb>
    <Content
      :style="{ padding: '24px', minHeight: '280px', background: '#fff' }"
    >
    <Form
        ref="editBookForm"
        :model="bookForm"
        :rules="ruleValidate"
        :label-width="100"
      >
        <FormItem label="书籍名称" prop="name">
          <Input
            v-model="bookForm.name"
            style="width: 300px"
            placeholder="请输入书籍名称"
          ></Input>
        </FormItem>
        <FormItem label="作者" prop="author">
          <Input
            v-model="bookForm.author"
            style="width: 300px"
            placeholder="请输入作者名称"
          ></Input>
        </FormItem>
        <FormItem label="简介">
          <!-- <Input v-model="bookForm.introduction" placeholder="请输入书籍名称"></Input> -->
          <Editor :content="bookForm.introduction" @getContent="getContent"></Editor>
        </FormItem>
        <FormItem label="标签">
          <Select
            style="width: 200px;"
            :multiple="true"
            placement="bottom"
            v-model="bookForm.tags"
          >
            <Option v-for="item in tagData" :value="item.id" :key="item.name">{{
              item.name
            }}</Option>
          </Select>
        </FormItem>
        <FormItem label="书籍数量" prop="num">
          <Input
            style="width: 120px"
            type="number"
            v-model="bookForm.num"
            placeholder="请输入书籍数量"
          ></Input>
        </FormItem>
        <FormItem label="推荐值" prop="value">
          <Input
          type="number"
            style="width: 120px"
            v-model="bookForm.value"
            placeholder="请输入推荐值"
          ></Input>
        </FormItem>
        <FormItem label="图片">
          <Upload
            :length.sync="img.length"
            :files.sync="img"
            :max="1"
            @getFile="getUploadFile($event)"
          ></Upload>
        </FormItem>
        <div class="form-button">
          <Button type="primary" @click="submit">提交</Button>
          <Button @click="cancel">取消</Button>
        </div>
      </Form>
    </Content>
  </div>
</template>

<script>
import axios from '@/libs/axios'
import Editor from '@/components/Editor.vue'
import Upload from '@/components/Upload.vue'
import {
  Breadcrumb,
  BreadcrumbItem,
  Content,
  Form,
  FormItem,
  Input,
  Select,
  Option,
  Button,
  Message
} from 'view-design'
export default {
  components: {
    Breadcrumb,
    BreadcrumbItem,
    Content,
    Form,
    FormItem,
    Input,
    Select,
    Option,
    Editor,
    Upload,
    Button
  },
  name: '',
  data () {
    return {
      bookForm: {},
      img: [],
      tagData: [],
      ruleValidate: {
        name: [
          { required: true, message: '请输入书籍名称', trigger: 'blur' }
        ],
        author: [
          { required: true, message: '请输入作者名称', trigger: 'blur' }
        ],
        num: [
          { required: true, message: '请输入书籍数量', trigger: 'blur' }
        ],
        value: [
          { required: true, message: '请输入书籍推荐值', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    axios.request({ url: 'tags' }).then(res => {
      const data = res
      // console.log(data)
      this.tagData = data.results
      console.log(this.tagData)
    })
    const id = this.$route.params.id
    axios.request({ url: `books/${id}` }).then(res => {
      this.bookForm = res
      if (res.img) {
        this.img.push(res.img)
      }
      this.bookForm.tags = this.bookForm.tags.map(item => {
        return item.id
      })
    })
  },
  methods: {
    getContent (content) {
      this.bookForm.introduction = content
    },
    getUploadFile (e) {
      if (e.length > 0) {
        this.img = e.map(item => {
          // console.log(item)
          if (item.response) {
            return item.response
          } else {
            return item
          }
        })
        console.log(this.img)
      } else {
        this.img = []
      }
    },
    cancel () {
      this.$router.push('BookManage')
    },
    submit () {
      console.log(this.bookForm)
      const data = {
        id: this.bookForm.id,
        author: this.bookForm.author,
        introduction: this.bookForm.introduction,
        name: this.bookForm.name,
        num: this.bookForm.num,
        value: this.bookForm.value,
        tags: []
      }
      if (this.img.length !== 0) {
        data.img = this.img[0].id
      }
      this.bookForm.tags.forEach((item, index) => {
        data.tags[index] = item
      })
      console.log(data)
      this.$refs.editBookForm.validate((valid) => {
        if (valid) {
          axios.request({ url: 'bookEdit', data: data, method: 'PUT' }).then(res => {
            Message.success('修改书籍信息成功')
            this.$router.replace('BookManage')
          }).catch(err => {
            Message.error('修改书籍信息失败')
            console.log(err)
          })
        } else {
          Message.error('请填写必填字段')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>

</style>
