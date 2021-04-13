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
          ref="userForm"
          :model="userInfo"
          label-position="right"
          :label-width="100"
        >
          <Row>
            <Col span="6"
              ><FormItem label="用户姓名" prop="name">
                <Input
                  v-model="userInfo.name"
                  placeholder="请输入用户姓名"
                ></Input> </FormItem
            ></Col>
            <Col span="6"
              ><FormItem label="用户账号" prop="phone">
                <Input
                  v-model="userInfo.phone"
                  placeholder="请输入用户账号"
                ></Input> </FormItem
            ></Col>
            <Col span="6"
              ><FormItem label="帐号状态" prop="forbidden">
                <Select v-model="userInfo.forbidden">
                  <Option value="false">未禁用</Option>
                  <Option value="true">已禁用</Option>
                </Select>
                </FormItem
            ></Col>
            <Col span="6"
              ><FormItem>
                <Button
                  style="margin-right: 25px"
                  @click="searchUser(1)"
                  type="primary"
                  >查询</Button
                >
                <Button @click="resetData">重置</Button>
              </FormItem></Col
            >
            <Col span="24"
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
  Tag,
  Select,
  Option
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
    Page,
    Select,
    Option

  },
  name: '',
  data () {
    return {
      userInfo: {
        name: '',
        phone: '',
        forbidden: ''
      },
      columns1: [
        {
          title: '#',
          type: 'index',
          width: '80',
          align: 'center'
        },
        {
          title: '账号/联系方式',
          align: 'center',
          key: 'phone'
        },
        {
          title: '密码',
          key: 'password',
          align: 'center',
          render: (h, params) => {
            return (
              <span>******</span>
            )
          }
        },
        {
          title: '账号状态',
          key: 'forbidden',
          align: 'center',
          render: (h, params) => {
            if (params.row.is_super) {
              return (
                <Tag color="error">已禁用</Tag>
              )
            } else {
              return (
                <Tag color="primary">未禁用</Tag>
              )
            }
          },
          width: 100
        },
        {
          title: '积分',
          key: 'score',
          align: 'center',
          width: 80
        },
        {
          title: '等级',
          align: 'center',
          key: 'level'
        },
        {
          title: '头像',
          key: 'img',
          align: 'center',
          render: (h, params) => {
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
          title: '姓名',
          align: 'center',
          key: 'name'
        },
        {
          title: '性别',
          align: 'center',
          key: 'sex',
          render: (h, params) => {
            if (params.row.sex) {
              return (
                <Tag color="primary">女</Tag>
              )
            } else {
              return (
                <Tag color="error">男</Tag>
              )
            }
          },
          width: 80
        },
        {
          title: '操作',
          align: 'center',
          // tooltip: true,
          width: 200,
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
                  style={style}
                  size="small"
                  onClick={() => this.showEdit(params.row)}
                >
                  编辑
                </Button>
                <Button
                  style={params.row.forbidden ? hidden : style}
                  type="warning"
                  size="small"
                  onClick={() => this.forbidden(params.row)}
                >
                  禁用
                </Button>
                <Button
                  style={params.row.forbidden ? style : hidden}
                  type="success"
                  size="small"
                  onClick={() => this.active(params.row)}
                >
                  启用
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
    searchUser (page = 1) {
      const params = {
        phone: this.userInfo.phone,
        name: this.userInfo.name
      }
      if (this.userInfo.forbidden === 'true') {
        params.forbidden = true
      } else {
        params.forbidden = false
      }
      axios.request({ url: `users?page=${page}`, params: this.userInfo }).then(res => {
        this.managerData = res.results
        this.total = res.count
      })
    },
    resetData () {
      this.$refs.userForm.resetFields()
    },
    pageChange (page) {
      this.searchUser(page)
    },
    forbidden (params) {
      axios.request({ url: `users/${params.id}?action=forbidden` }).then(res => {
        Message.success('禁用账号成功')
        this.searchUser()
      })
    },
    active (params) {
      axios.request({ url: `users/${params.id}?action=forbidden` }).then(res => {
        Message.success('启用账号成功')
        this.searchUser()
      })
    },
    delete (params) {
      axios.request({ url: `users/${params.id}`, method: 'delete' }).then(res => {
        Message.success('删除用户成功')
        this.searchUser()
      }).catch(err => {
        console.log(err)
      })
    },
    showEdit (params) {
      this.$router.push({ name: 'ManagerEdit', params: { manager: params } })
    }
  },
  created () {
    this.searchUser()
  }
}
</script>

<style lang="less" scoped>

</style>
