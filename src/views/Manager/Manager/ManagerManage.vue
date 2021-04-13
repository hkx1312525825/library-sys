<template>
  <div class="manager-page">
    <Breadcrumb :style="{ margin: '24px 0' }">
      <!-- <BreadcrumbItem>Home</BreadcrumbItem> -->
      <BreadcrumbItem>管理员管理</BreadcrumbItem>
      <BreadcrumbItem>管理员管理</BreadcrumbItem>
    </Breadcrumb>
    <Content
      :style="{ padding: '24px', minHeight: '280px', background: '#fff' }"
    >
      <div class="search">
        <Form
          ref="managerForm"
          :model="managerInfo"
          label-position="right"
          :label-width="100"
        >
          <Row>
            <Col span="6"
              ><FormItem label="管理员名称" prop="name">
                <Input
                  v-model="managerInfo.name"
                  placeholder="请输入管理员名称"
                ></Input> </FormItem
            ></Col>
            <Col span="6"
              ><FormItem label="管理员账号" prop="username">
                <Input
                  v-model="managerInfo.username"
                  placeholder="请输入管理员账号"
                ></Input> </FormItem
            ></Col>
            <Col span="6" offset="6"
              ><FormItem>
                <Button
                  style="margin-right: 25px"
                  @click="searchManager(1)"
                  type="primary"
                  >查询</Button
                >
                <Button @click="resetData">重置</Button>
              </FormItem></Col
            >
            <Col v-show="user.isSuper" span="24"
              ><FormItem>
                <Button type="primary" @click="$router.push({name: 'ManagerAdd'})">新增</Button>
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
          :data="managerData"
        ></Table>
      </div>
      <div style="margin-top: 10px"><Page @on-change="pageChange" :total="total" /></div>
    </Content>
  </div>
</template>

<script>
import axios from '@/libs/axios'
import {
  Breadcrumb,
  BreadcrumbItem,
  Content,
  Form,
  Row,
  Col,
  FormItem,
  Input,
  Table,
  Button,
  Page,
  Message,
  Tag
} from 'view-design'
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
    Table,
    Button,
    Page

  },
  name: '',
  data () {
    return {
      managerInfo: {
        name: '',
        username: ''
      },
      user: {},
      columns1: [
        {
          title: '#',
          type: 'index',
          width: '80'
        },
        {
          title: '管理员姓名',
          key: 'name'
        },
        {
          title: '联系电话',
          key: 'phone'
        },
        {
          title: '账号',
          key: 'username'
        },
        {
          title: '密码',
          key: 'password',
          render: (h, params) => {
            return (
              <span>******</span>
            )
          }
        },
        {
          title: '权限',
          key: 'is_super',
          render: (h, params) => {
            if (params.row.is_super) {
              return (
                <Tag color="default">超级管理员</Tag>
              )
            } else {
              return (
                <Tag color="default">管理员</Tag>
              )
            }
          }
        },
        {
          title: '操作',
          // tooltip: true,
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
      managerData: [],
      total: 0
    }
  },
  methods: {
    searchManager (page = 1) {
      axios.request({ url: 'managers', params: this.managerInfo }).then(res => {
        this.managerData = res.results
        this.total = res.count
      })
    },
    resetData () {
      this.$refs.managerForm.resetFields()
    },
    pageChange (page) {
      this.searchManager(page)
    },
    delete (params) {
      axios.request({ url: `managers/${params.id}`, method: 'delete' }).then(res => {
        Message.success('删除管理员成功')
      }).catch(err => {
        console.log(err)
      })
    },
    showEdit (params) {
      this.$router.push({ name: 'ManagerEdit', params: { manager: params } })
    }
  },
  created () {
    this.searchManager()
    this.user = this.$store.state.currentManager
  }
}
</script>

<style lang="less" scoped>

</style>
