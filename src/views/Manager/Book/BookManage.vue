<template>
  <div class="book-manage">
    <Breadcrumb :style="{ margin: '24px 0' }">
      <!-- <BreadcrumbItem>Home</BreadcrumbItem> -->
      <BreadcrumbItem>书籍管理</BreadcrumbItem>
      <BreadcrumbItem>书籍管理</BreadcrumbItem>
    </Breadcrumb>
    <Content
      :style="{ padding: '24px', minHeight: '280px', background: '#fff' }"
    >
      <div class="search">
        <Form
          ref="bookForm"
          :model="bookInfo"
          label-position="right"
          :label-width="100"
        >
          <Row>
            <Col span="6"
              ><FormItem label="书籍名称" prop="name">
                <Input
                  v-model="bookInfo.name"
                  placeholder="请输入书籍名称"
                ></Input> </FormItem
            ></Col>
            <Col span="6"
              ><FormItem label="书籍类型" prop="tag">
                <Select v-model="bookInfo.tag">
                  <Option
                    v-for="item in tagData"
                    :value="item.name"
                    :key="item.name"
                    >{{ item.name }}</Option
                  >
                </Select>
              </FormItem></Col
            >
            <Col span="6"
              ><FormItem label="作者名称" prop="author">
                <Input
                  v-model="bookInfo.author"
                  placeholder="请输入作者名称"
                ></Input> </FormItem
            ></Col>
            <Col span="6"
              ><FormItem>
                <Button
                  style="margin-right: 25px"
                  @click="searchBook(1)"
                  type="primary"
                  >查询</Button
                >
                <Button @click="resetData">重置</Button>
              </FormItem></Col
            >
            <Col span="24"
              ><FormItem>
                <Button type="primary" @click="bookAddShow = true">新增</Button>
              </FormItem></Col
            >
          </Row>
        </Form>
      </div>
      <div class="table">
        <Table
          stripe
          :columns="columns1"
          :border="true"
          :data="bookData"
        ></Table>
      </div>
      <div style="margin-top: 10px"><Page @on-change="pageChange" :total="total" /></div>
    </Content>
    <Modal v-model="bookAddShow" :loading="loading" @on-ok="submitBook" @on-cancel="cancelBook" fullscreen title="新增书籍">
      <Form
        ref="addBookForm"
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
        <FormItem label="简介" prop="introduction">
          <!-- <Input v-model="bookForm.introduction" placeholder="请输入书籍名称"></Input> -->
          <Editor :content="bookForm.introduction" @getContent="getContent"></Editor>
        </FormItem>
        <FormItem label="标签" prop="tags">
          <!-- <Input v-model="bookForm.tags" placeholder="请输入书籍名称"></Input> -->
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
            v-model="bookForm.num"
            placeholder="请输入书籍数量"
          ></Input>
        </FormItem>
        <FormItem label="推荐值" prop="value">
          <Input
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
      </Form>
    </Modal>
  </div>
</template>

<script>
import Editor from '@/components/Editor.vue'
import Upload from '@/components/Upload.vue'
import {
  Breadcrumb,
  BreadcrumbItem,
  Content,
  Table,
  Form,
  FormItem,
  Row,
  Col,
  Input,
  Button,
  Tag,
  Select,
  Option,
  Modal,
  Message,
  Page
} from 'view-design'
import axios from '@/libs/axios'
export default {
  components: {
    Breadcrumb,
    BreadcrumbItem,
    Content,
    Table,
    Form,
    FormItem,
    Row,
    Col,
    Input,
    Button,
    Select,
    Option,
    Modal,
    Editor,
    Upload,
    Page
  },
  name: '',
  data () {
    return {
      bookInfo: {
        name: '',
        tag: '',
        author: ''
      },
      total: 0,
      bookAddShow: false,
      bookData: [],
      tagData: [],
      img: [],
      bookForm: {
        name: '',
        author: '',
        num: '',
        introduction: '',
        value: '',
        img: '',
        tags: []
      },
      loading: true,
      columns1: [
        {
          title: '#',
          type: 'index',
          align: 'center',
          width: '80'
        },
        {
          title: '书籍名称',
          align: 'center',
          key: 'name'
        },
        {
          title: '书籍图片',
          align: 'center',
          key: 'img',
          width: '100',
          render: (h, params, column) => {
            if (params.row.img) {
              return (
                <div>
                  <img style="height: 35px" src={params.row.img.url}></img>
                </div>
              )
            }
          }
        },
        {
          title: '作者',
          align: 'center',
          width: '150',
          key: 'author'
        },
        {
          title: '评分',
          align: 'center',
          width: '100',
          key: 'score'
        },
        {
          title: '推荐值',
          align: 'center',
          width: '100',
          key: 'value'
        },
        {
          title: '数量',
          align: 'center',
          key: 'num',
          width: '100'
        },
        {
          title: '标签',
          align: 'center',
          key: 'tags',
          tooltip: true,
          render: (h, params, column) => {
            if (params.row.tags.length !== 0) {
              return (
                <div>
                  {params.row.tags.map(item => {
                    return <Tag color="default">{item.name}</Tag>
                  })}
                </div>
              )
            } else {
              return <span>暂无标签</span>
            }
          }
        },
        {
          title: '操作',
          // tooltip: true,
          align: 'center',
          render: (h, params) => {
            const style = {
              marginRight: '10px'
            }
            return (
              <div>
                <Button
                  type="primary"
                  style={style}
                  size="small"
                  onClick={() => this.showEdit(params.row)}
                >
                  编辑
                </Button>
                <Button
                  type="error"
                  size="small"
                  onClick={() => this.delete(params.row)}
                >
                  删除
                </Button>
              </div>
            )
          }
        }
      ],
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
  methods: {
    showEdit (params) {
      this.$router.push({ name: 'BookEdit', params: { id: params.id } })
    },
    delete (params) {
      axios.request({ url: `books/${params.id}`, method: 'DELETE' }).then(res => {
        console.log(res)
        Message.success('删除书籍成功')
        this.searchBook()
      })
    },
    searchBook (page = 1) {
      axios
        .request({
          url: `books?page=${page}&name=${this.bookInfo.name}&author=${this.bookInfo.author}&tag=${this.bookInfo.tag}`
        })
        .then(res => {
          this.bookData = res.results
          this.total = res.count
        })
    },
    pageChange (page) {
      this.searchBook(page)
    },
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
    submitBook () {
      if (this.img.length > 0) {
        this.bookForm.img = this.img[0].id
      }
      const data = {
        name: this.bookForm.name,
        author: this.bookForm.author,
        introduction: this.bookForm.introduction,
        value: this.bookForm.value,
        num: this.bookForm.num,
        img: this.bookForm.img,
        tags: []
      }
      this.bookForm.tags.forEach((item, index) => {
        data.tags[index] = { tag: item }
      })
      this.$refs.addBookForm.validate((valid) => {
        if (valid) {
          axios.request({ url: 'createBooks', data: data, method: 'POST' }).then(res => {
            Message.success('添加书籍成功')
            this.bookAddShow = false
            this.searchBook()
            this.img = []
            this.$refs.addBookForm.resetFields()
          }).catch(err => {
            Message.error('添加书籍失败')
            console.log(err)
            // this.bookAddShow = false
            this.searchBook()
            this.loading = false
            this.$nextTick(() => {
              this.loading = true
            })
          })
        } else {
          this.loading = false
          this.$nextTick(() => {
            this.loading = true
          })
        }
      })
    },
    cancelBook () {
      this.$refs.addBookForm.resetFields()
      this.img = []
      this.bookAddShow = false
    },
    resetData () {
      this.$refs.bookForm.resetFields()
    }
  },
  created () {
    this.searchBook()
    axios.request({ url: 'tags' }).then(res => {
      const data = res
      // console.log(data)
      this.tagData = data.results
      console.log(this.tagData)
    })
  }
}
</script>

<style lang="less" scoped></style>
