<template>
  <div class="reserve-page">
    <Breadcrumb :style="{ margin: '24px 0' }">
      <!-- <BreadcrumbItem>Home</BreadcrumbItem> -->
      <BreadcrumbItem>书籍管理管理</BreadcrumbItem>
      <BreadcrumbItem>预订管理</BreadcrumbItem>
    </Breadcrumb>
    <Content
      :style="{ padding: '24px', minHeight: '280px', background: '#fff' }"
    >
      <div class="search">
        <Form
          ref="reserveInfo"
          :model="reserveInfo"
          label-position="right"
          :label-width="100"
        >
          <Row>
            <Col span="6"
              ><FormItem label="书籍名称" prop="bookName">
                <Input
                  v-model="reserveInfo.bookName"
                  placeholder="请输入书籍名称"
                ></Input> </FormItem
            ></Col>
            <Col span="6"
              ><FormItem label="用户名称" prop="userName">
                <Input
                  v-model="reserveInfo.userName"
                  placeholder="请输入用户名称"
                ></Input> </FormItem
            ></Col>
            <Col span="6"
              ><FormItem label="书籍名称" prop="status">
                <Select v-model="reserveInfo.status">
                  <Option value="0" >未审核</Option>
                  <Option value="1" >已通过</Option>
                  <Option value="2" >已驳回</Option>
                </Select>
                </FormItem
            ></Col>
            <Col span="6"
              ><FormItem>
                <Button
                  style="margin-right: 25px"
                  @click="searchReserve(1)"
                  type="primary"
                  >查询</Button
                >
                <Button @click="resetData">重置</Button>
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
          :data="reserveData"
        ></Table>
      </div>
      <div style="margin-top: 10px">
        <Page @on-change="pageChange" :total="total" />
      </div>
    </Content>
    <Modal v-model="auditShow" :fullscreen="true" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <span>预订审核</span>
      </p>
      <div style="text-align:left">
        <Form v-if="auditShow" :label-colon="true" :model="reserveDetail" :label-width="200" label-position="right">
          <Row class="user-detail">
            <Col span="24">
              <FormItem><template slot="label"><span style="font-size: 25px; font-weight: 600;">预订详情</span></template></FormItem>
            </Col>
            <Col span="8">
              <FormItem label="预定状态">
                <span v-show="reserveDetail.status === 0" style="color: red">未审核</span>
                <span v-show="reserveDetail.status === 1" style="color: green">已通过</span>
                <span v-show="reserveDetail.status === 2" style="color: red">已驳回</span>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="开始日期">{{reserveDetail.start_time}}</FormItem>
            </Col>
            <Col span="8">
              <FormItem label="截止日期">{{reserveDetail.end_time}}</FormItem>
            </Col>
          </Row>
          <Row class="user-detail">
            <Col span="24">
              <FormItem><template slot="label"><span style="font-size: 25px; font-weight: 600;">用户详情</span></template></FormItem>
            </Col>
            <Col span="8">
              <FormItem label="书籍名称">{{reserveDetail.user.name}}</FormItem>
            </Col>
            <Col span="8">
              <FormItem label="联系方式/账号">{{reserveDetail.user.phone}}</FormItem>
            </Col>
            <Col span="8">
              <FormItem label="用户积分">{{reserveDetail.user.score}}</FormItem>
            </Col>
            <Col span="8">
              <FormItem label="等级">{{reserveDetail.user.level}}</FormItem>
            </Col>
            <Col span="8">
              <FormItem label="帐号状态">
                <span v-show="reserveDetail.user.forbidden" style="color: red">已禁用</span>
                <span v-show="!reserveDetail.user.forbidden" style="color: green">未禁用</span>
              </FormItem>
            </Col>
          </Row>
          <Row class="book-detail">
            <Col span="24">
              <FormItem><template slot="label"><span style="font-size: 25px; font-weight: 600;">书籍详情</span></template></FormItem>
            </Col>
            <Col span="8">
              <FormItem label="书籍名称">{{reserveDetail.book.name}}</FormItem>
            </Col>
            <Col span="8">
              <FormItem label="作者">{{reserveDetail.book.author}}</FormItem>
            </Col>
            <Col span="8">
              <FormItem label="分类"><Tag v-for="(item, index) in reserveDetail.book.tags" :key="index">{{item.name}}</Tag></FormItem>
            </Col>
            <Col span="8">
              <FormItem label="数量">{{reserveDetail.book.num}}</FormItem>
            </Col>
            <Col span="8">
              <FormItem label="点击量">{{reserveDetail.book.score}}</FormItem>
            </Col>
            <Col span="8">
              <FormItem label="推价值">{{reserveDetail.book.value}}</FormItem>
            </Col>
          </Row>
        </Form>
      </div>
      <div slot="footer">
        <Button type="primary" :loading="loading2" @click="auditPass"
          >通过</Button
        >
        <Button type="error" :loading="loading1" @click="auditBack"
          >驳回</Button
        >
      </div>
    </Modal>
    <Modal v-model="infoShow" :fullscreen="true" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <span>预订详情</span>
      </p>
      <div style="text-align:left">
        <Form v-if="infoShow" :label-colon="true" :model="reserveDetail" :label-width="200" label-position="right">
          <Row class="user-detail">
            <Col span="24">
              <FormItem><template slot="label"><span style="font-size: 25px; font-weight: 600;">预订详情</span></template></FormItem>
            </Col>
            <Col span="8">
              <FormItem label="预定状态">
                <span v-show="reserveDetail.status === 0" style="color: red">未审核</span>
                <span v-show="reserveDetail.status === 1" style="color: green">已通过</span>
                <span v-show="reserveDetail.status === 2" style="color: red">已驳回</span>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="开始日期">{{reserveDetail.start_time}}</FormItem>
            </Col>
            <Col span="8">
              <FormItem label="截止日期">{{reserveDetail.end_time}}</FormItem>
            </Col>
          </Row>
          <Row class="user-detail">
            <Col span="24">
              <FormItem><template slot="label"><span style="font-size: 25px; font-weight: 600;">用户详情</span></template></FormItem>
            </Col>
            <Col span="8">
              <FormItem label="书籍名称">{{reserveDetail.user.name}}</FormItem>
            </Col>
            <Col span="8">
              <FormItem label="联系方式/账号">{{reserveDetail.user.phone}}</FormItem>
            </Col>
            <Col span="8">
              <FormItem label="用户积分">{{reserveDetail.user.score}}</FormItem>
            </Col>
            <Col span="8">
              <FormItem label="等级">{{reserveDetail.user.level}}</FormItem>
            </Col>
            <Col span="8">
              <FormItem label="帐号状态">
                <span v-show="reserveDetail.user.forbidden" style="color: red">已禁用</span>
                <span v-show="!reserveDetail.user.forbidden" style="color: green">未禁用</span>
              </FormItem>
            </Col>
          </Row>
          <Row class="book-detail">
            <Col span="24">
              <FormItem><template slot="label"><span style="font-size: 25px; font-weight: 600;">书籍详情</span></template></FormItem>
            </Col>
            <Col span="8">
              <FormItem label="书籍名称">{{reserveDetail.book.name}}</FormItem>
            </Col>
            <Col span="8">
              <FormItem label="作者">{{reserveDetail.book.author}}</FormItem>
            </Col>
            <Col span="8">
              <FormItem label="分类"><Tag v-for="(item, index) in reserveDetail.book.tags" :key="index">{{item.name}}</Tag></FormItem>
            </Col>
            <Col span="8">
              <FormItem label="数量">{{reserveDetail.book.num}}</FormItem>
            </Col>
            <Col span="8">
              <FormItem label="点击量">{{reserveDetail.book.score}}</FormItem>
            </Col>
            <Col span="8">
              <FormItem label="推价值">{{reserveDetail.book.value}}</FormItem>
            </Col>
          </Row>
        </Form>
      </div>
      <div slot="footer">
        <Button type="primary" @click="infoShow = false"
          >关闭</Button
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
  Tag,
  Select,
  Option,
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
    Modal,
    Tag,
    Select,
    Option
  },
  name: '',
  data () {
    return {
      reserveInfo: {
        bookName: '',
        userName: '',
        status: ''
      },
      reserveDetail: {},
      reserveData: [],
      total: null,
      loading1: false,
      loading2: false,
      auditShow: false,
      infoShow: false,
      columns1: [
        {
          title: '#',
          type: 'index',
          align: 'center',
          width: '80'
        },
        {
          title: '预约书籍',
          align: 'center',
          width: '200',
          render: (h, params) => {
            return <span>{params.row.book.name}</span>
          }
        },
        {
          title: '用户名称',
          align: 'center',
          width: '100',
          render: (h, params) => {
            return <span>{params.row.user.name}</span>
          }
        },
        {
          title: '用户账号/联系方式',
          align: 'center',
          width: '200',
          render: (h, params) => {
            return <span>{params.row.user.phone}</span>
          }
        },
        {
          title: '用户等级',
          align: 'center',
          width: '100',
          render: (h, params) => {
            return <span>{params.row.user.level}</span>
          }
        },
        {
          title: '开始日期',
          align: 'center',
          width: '150',
          key: 'start_time'
        },
        {
          title: '结束日期',
          align: 'center',
          width: '150',
          key: 'end_time'
        },
        {
          title: '审核状态',
          align: 'center',
          width: '100',
          render: (h, params) => {
            const notAudit = {
              color: 'red'
            }
            const pass = {
              color: 'green'
            }
            const fail = {
              color: 'red'
            }
            if (params.row.status === 0) {
              return <span style={notAudit}>未审核</span>
            } else if (params.row.status === 1) {
              return <span style={pass}>已通过</span>
            } else {
              return <span style={fail}>未通过</span>
            }
          }
        },
        {
          title: '操作',
          // tooltip: true,
          align: 'center',
          width: 200,
          fixed: 'right',
          render: (h, params) => {
            const style = {
              marginRight: '10px'
            }
            const hidden = {
              display: 'none',
              marginRight: '10px'
            }
            return (
              <div>
                <Button
                  type="warning"
                  style={params.row.status === 0 ? style : hidden}
                  size="small"
                  onClick={() => this.audit(params.row)}
                >
                  审核
                </Button>
                <Button
                  type="primary"
                  style={style}
                  size="small"
                  onClick={() => this.info(params.row)}
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
    searchReserve (page = 1) {
      axios.request({ url: `reserves?page=${page}`, params: this.reserveInfo }).then(res => {
        this.reserveData = res.results
        this.total = res.count
      })
    },
    resetData () {
      this.$refs.reserveInfo.resetFields()
    },
    pageChange (page) {
      this.searchReserve(page)
    },
    audit (row) {
      this.auditShow = true
      this.reserveDetail = row
      console.log(this.reserveDetail)
    },
    auditPass () {
      this.loading1 = true
      axios.request({ url: `reserveAudit/${this.reserveDetail.id}`, data: { status: 1 }, method: 'put' }).then(res => {
        Message.success('审核通过')
        this.loading1 = false
        this.auditShow = false
        this.searchReserve()
      }).catch(err => {
        // Message.error('审核失败')
        console.log(err)
        this.loading1 = false
      })
    },
    auditBack () {
      this.loading2 = true
      axios.request({ url: `reserveAudit/${this.reserveDetail.id}`, data: { status: 2 }, method: 'put' }).then(res => {
        Message.success('驳回成功')
        this.loading2 = false
        this.auditShow = false
        this.searchReserve()
      }).catch(err => {
        this.loading2 = false
        // Message.error('审核失败')
        console.log(err)
      })
    },
    info (row) {
      this.infoShow = true
      this.reserveDetail = row
      // this.showInfo = true
    },
    delete (row) {
      axios.request({ url: `reserveAudit/${row.id}`, method: 'delete' }).then(res => {
        Message.success('删除成功')
        this.searchReserve()
      }).catch(err => {
        Message.error('删除失败')
        console.log(err)
      })
    }
  },
  created () {
    this.searchReserve(1)
  }
}
</script>

<style lang="less" scoped>
.book-detail, .user-detail {
  padding: 24px 0;
  margin: 15px;
  background: rgb(235, 234, 234);
  border-radius: 5px;
}
</style>
