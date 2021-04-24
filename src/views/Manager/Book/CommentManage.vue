<template>
  <div class="comment-manage-page">
    <Breadcrumb :style="{ margin: '24px 0' }">
      <!-- <BreadcrumbItem>Home</BreadcrumbItem> -->
      <BreadcrumbItem>书籍管理</BreadcrumbItem>
      <BreadcrumbItem>评论管理</BreadcrumbItem>
    </Breadcrumb>
    <Content
      :style="{ padding: '24px', minHeight: '280px', background: '#fff' }"
    >
      <div class="search">
        <Form
          ref="commentInfo"
          :model="commentInfo"
          label-position="right"
          :label-width="100"
        >
          <Row>
            <Col span="6"
              ><FormItem label="书籍名称" prop="bookName">
                <Input
                  v-model="commentInfo.bookName"
                  placeholder="请输入书籍名称"
                ></Input> </FormItem
            ></Col>
            <Col span="6"
              ><FormItem label="用户名称" prop="userName">
                <Input
                  v-model="commentInfo.userName"
                  placeholder="请输入用户名称"
                ></Input> </FormItem
            ></Col>
            <Col span="6" offset="6"
              ><FormItem>
                <Button
                  style="margin-right: 25px"
                  @click="searchComment(1)"
                  type="primary"
                  >查询</Button
                >
                <Button @click="resetData('commentInfo')">重置</Button>
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
          :data="commentList"
        ></Table>
      </div>
      <div style="margin-top: 10px"><Page @on-change="pageChange" :total="total" /></div>
    </Content>
    <Modal v-model="commentShow" :fullscreen="true" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <span>评论</span>
      </p>
      <div style="text-align:left">
        <Form v-if="commentShow" :label-colon="true" :rules="rules" ref="commentDetail" :model="commentDetail" :label-width="200" label-position="right">
          <Row>
            <Col span="24">
              <FormItem label="评论标题">
                <span>{{commentDetail.title}}</span>
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem label="内容">
                <p v-html="commentDetail.detail"></p>
              </FormItem>
            </Col>
            <Col span="5" v-show="!infoShow">
              <FormItem label="评分" prop="score">
                <Input type="number" v-model="commentDetail.score" placeholder="请输入分数"></Input>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
      <div slot="footer" v-show="!infoShow">
        <Button type="primary" :loading="loading" @click="submit('commentDetail')"
          >通过</Button
        >
        <Button type="error" @click="back"
          >返回</Button
        >
      </div>
    </Modal>
  </div>
</template>

<script>
import {
  Breadcrumb,
  BreadcrumbItem,
  Content,
  Form,
  Row,
  Col,
  FormItem,
  Input,
  Button,
  Table,
  Page,
  Modal,
  Message
} from 'view-design'
import axios from '@/libs/axios'
export default {
  components: {
    Breadcrumb,
    BreadcrumbItem,
    Content,
    Form,
    Row,
    Col,
    FormItem,
    Input,
    Button,
    Table,
    Page,
    Modal
  },
  name: '',
  data () {
    return {
      commentInfo: {
        userName: '',
        bookName: ''
      },
      commentList: [],
      total: null,
      commentShow: false,
      commentDetail: {},
      loading: false,
      infoShow: false,
      rules: {
        score: [
          { required: true, message: '请输入评分', trigger: 'blur' }
        ]
      },
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
          render: (h, params, column) => {
            return (<div>{params.row.book.name}</div>)
          }
        },
        {
          title: '用户名称',
          align: 'center',
          key: 'img',
          render: (h, params, column) => {
            return (
              <div>
                {params.row.user.name}
              </div>
            )
          }
        },
        {
          title: '用户联系方式',
          align: 'center',
          render: (h, params, column) => {
            return (
              <div>
                {params.row.user.phone}
              </div>
            )
          }
        },
        {
          title: '评分',
          align: 'center',
          render: (h, params, column) => {
            if (params.row.score !== null) {
              return (
                <div>
                  {params.row.score}
                </div>
              )
            } else {
              return (
                <div>
                  暂未评分
                </div>
              )
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
            const hidden = {
              display: 'none'
            }
            return (
              <div>
                <Button
                  type="primary"
                  style={params.row.score === null ? style : hidden}
                  size="small"
                  onClick={() => this.showEdit(params.row)}
                >
                  评分
                </Button>
                <Button
                  type="primary"
                  style={style}
                  size="small"
                  onClick={() => this.showInfo(params.row)}
                >
                  详情
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
      ]
    }
  },
  methods: {
    searchComment (page = 1) {
      axios.request({ url: `comments?page=${page}` }).then(res => {
        this.commentList = res.results
        this.total = res.count
      })
    },
    pageChange (page) {
      this.searchComment(page)
    },
    resetData (name) {
      this.$refs[name].resetFields()
    },
    showEdit (row) {
      this.commentDetail = row
      this.commentShow = true
    },
    submit (name) {
      // debugger
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.loading = true
          axios.request({ url: `comments/${this.commentDetail.id}`, data: this.commentDetail, method: 'Put' }).then(res => {
            Message.success('评分成功')
            this.commentShow = false
            this.loading = false
            this.searchComment()
            this.commentDetail = {}
          }).catch(err => {
            // Message.error('评分失败')
            console.log(err)
            this.commentShow = false
            this.loading = false
            this.commentDetail = {}
            this.searchComment()
          })
        } else {
          Message.error('请填写评论分数')
        }
      })
    },
    back () {
      this.commentShow = false
      this.commentDetail = {}
    },
    showInfo (row) {
      this.infoShow = true
      this.showEdit(row)
    },
    delete (row) {
      axios.request({ url: `comments/${row.id}`, method: 'delete' }).then(res => {
        Message.success('删除成功')
        this.searchComment()
      }).catch(err => {
        console.log(err)
      })
    }
  },
  created () {
    this.searchComment()
  }
}
</script>

<style lang="less" scoped>

</style>
