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
          ref="carouselForm"
          :model="carouselInfo"
          label-position="right"
          :label-width="100"
        >
          <Row>
            <Col span="6"
              ><FormItem label="轮播图名称" prop="name">
                <Input
                  v-model="carouselInfo.name"
                  placeholder="请输入轮播图名称"
                ></Input> </FormItem
            ></Col>
            <Col span="6" offset="12"
              ><FormItem>
                <Button
                  style="margin-right: 25px"
                  @click="searchCarousel(1)"
                  type="primary"
                  >查询</Button
                >
                <Button @click="resetData">重置</Button>
              </FormItem></Col
            >
            <Col v-show="user.isSuper" span="24"
              ><FormItem>
                <Button type="primary" @click="addCarouselShow = true">新增</Button>
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
    <Modal v-model="addCarouselShow" :loading="addLoading" @on-ok="submitCarousel" @on-cancel="cancelAdd" title="新增标签">
      <Form
        ref="addCarouselForm"
        :model="addCarouselForm"
        :rules="addCarouselFormRules"
        :label-width="100"
      >
        <FormItem label="标签名称" prop="name">
          <Input
            v-model="addCarouselForm.name"
            style="width: 300px"
            placeholder="请输入标签名称"
          ></Input>
        </FormItem>
        <FormItem label="标签名称">
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
import axios from '@/libs/axios'
import Upload from '@/components/Upload.vue'
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
  Modal
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
    Modal,
    Upload
  },
  name: '',
  data () {
    return {
      carouselInfo: {
        name: ''
      },
      user: {},
      columns1: [
        {
          title: '#',
          type: 'index',
          align: 'center',
          width: '80'
        },
        {
          title: '管理员姓名',
          align: 'center',
          key: 'name'
        },
        {
          title: '书籍图片',
          align: 'center',
          key: 'img',
          // width: '100',
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
          title: '操作',
          // tooltip: true,
          align: 'center',
          render: (h, params) => {
            return (
              <div>

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
      total: 0,
      addCarouselShow: false,
      addLoading: false,
      addCarouselForm: {
        name: '',
        img_id: ''
      },
      img: [],
      addCarouselFormRules: {
        name: [
          { required: true, message: '请输入标签名称', trigger: 'blur' }
        ],
        img_id: [
          { required: true, message: '请上传图片', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    searchCarousel (page = 1) {
      axios.request({ url: `carousel?page=${page}`, params: this.carouselInfo }).then(res => {
        this.managerData = res.results
        this.total = res.count
      })
    },
    resetData () {
      this.$refs.carouselForm.resetFields()
    },
    pageChange (page) {
      this.searchCarousel(page)
    },
    delete (params) {
      axios.request({ url: `carousel/${params.id}`, method: 'delete' }).then(res => {
        Message.success('删除轮播图成功')
        this.searchCarousel()
      }).catch(err => {
        console.log(err)
      })
    },
    showEdit (params) {
      this.$router.push({ name: 'ManagerEdit', params: { manager: params } })
    },
    submitCarousel () {
      if (this.img.length > 0) {
        this.addCarouselForm.img_id = this.img[0].id
      } else {
        this.addLoading = false
        this.$nextTick(() => {
          this.addLoading = true
        })
        return Message.error('请上传图片')
      }
      this.$refs.addCarouselForm.validate((valid) => {
        if (valid) {
          axios.request({ url: 'carousel', data: this.addCarouselForm, method: 'POST' }).then(res => {
            Message.success('添加轮播图成功')
            this.addCarouselShow = false
            this.$refs.addCarouselForm.resetFields()
            this.img = []
            this.searchCarousel()
          }).catch(err => {
            Message.error('添加轮播图失败')
            console.log(err)
            this.addCarouselShow = false
            this.searchCarousel()
            this.img = []
          })
        } else {
          this.addLoading = false
          this.$nextTick(() => {
            this.addLoading = true
          })
        }
      })
    },
    cancelAdd () {
      this.$refs.addCarouselForm.resetFields()
      this.addCarouselShow = false
      this.img = []
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
    }
  },
  created () {
    this.searchCarousel()
    this.user = this.$store.state.currentManager
  }
}
</script>

<style lang="less" scoped>

</style>
