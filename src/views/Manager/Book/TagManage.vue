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
          ref="tagForm"
          :model="tagInfo"
          label-position="right"
          :label-width="100"
        >
          <Row>
            <Col span="6"
              ><FormItem label="标签名称" prop="name">
                <Input
                  v-model="tagInfo.name"
                  placeholder="请输入标签名称"
                ></Input> </FormItem
            ></Col>
            <Col span="6" offset="12"
              ><FormItem>
                <Button
                  style="margin-right: 25px"
                  @click="searchTag(1)"
                  type="primary"
                  >查询</Button
                >
                <Button @click="resetData">重置</Button>
              </FormItem></Col
            >
            <Col v-show="user.isSuper" span="24"
              ><FormItem>
                <Button type="primary" @click="tagAddShow=true">新增</Button>
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
          :data="tagData"
        ></Table>
      </div>
      <div style="margin-top: 10px"><Page @on-change="pageChange" :total="total" /></div>
    </Content>
    <Modal v-model="tagAddShow" :loading="loading" @on-ok="submitTag" @on-cancel="cancelTag" title="新增标签">
      <Form
        ref="addTagForm"
        :model="addTagForm"
        :rules="addTagFormRules"
        :label-width="100"
      >
        <FormItem label="标签名称" prop="name">
          <Input
            v-model="addTagForm.name"
            style="width: 300px"
            placeholder="请输入标签名称"
          ></Input>
        </FormItem>
      </Form>
    </Modal>
    <Modal v-model="tagEditShow" :loading="loadingEdit" @on-ok="editTag" @on-cancel="cancelEditTag" title="新增标签">
      <Form
        ref="editTagForm"
        :model="editTagForm"
        :rules="editTagFormRules"
        :label-width="100"
      >
        <FormItem label="标签名称" prop="name">
          <Input
            v-model="editTagForm.name"
            style="width: 300px"
            placeholder="请输入标签名称"
          ></Input>
        </FormItem>
      </Form>
    </Modal>
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
    Modal
  },
  name: '',
  data () {
    return {
      tagInfo: {
        name: '',
        username: ''
      },
      loading: true,
      tagAddShow: false,
      tagEditShow: false,
      loadingEdit: false,
      user: {},
      addTagForm: {
        name: ''
      },
      addTagFormRules: {
        name: [
          { required: true, message: '请输入标签名称', trigger: 'blur' }
        ]
      },
      editTagForm: {
        name: ''
      },
      editId: '',
      editTagFormRules: {
        name: [
          { required: true, message: '请输入标签名称', trigger: 'blur' }
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
          title: '管理员姓名',
          align: 'center',
          key: 'name'
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
      tagData: [],
      total: 0
    }
  },
  methods: {
    searchTag (page = 1) {
      axios.request({ url: `tags?page=${page}`, params: this.tagInfo }).then(res => {
        this.tagData = res.results
        this.total = res.count
      })
    },
    resetData () {
      this.$refs.tagForm.resetFields()
    },
    pageChange (page) {
      this.searchTag(page)
    },
    delete (params) {
      axios.request({ url: `tags/${params.id}`, method: 'delete' }).then(res => {
        Message.success('删除标签成功')
        this.searchTag()
      }).catch(err => {
        console.log(err)
      })
    },
    showEdit (params) {
      this.tagEditShow = true
      this.editId = params.id
      this.editTagForm.name = params.name
    },
    submitTag () {
      this.$refs.addTagForm.validate((valid) => {
        if (valid) {
          axios.request({ url: 'tags', data: this.addTagForm, method: 'POST' }).then(res => {
            Message.success('添加标签成功')
            this.tagAddShow = false
            this.$refs.addTagForm.resetFields()
            this.searchTag()
          }).catch(err => {
            Message.error('添加标签失败')
            console.log(err)
            this.tagAddShow = false
            this.searchTag()
          })
        } else {
          this.loading = false
          this.$nextTick(() => {
            this.loading = true
          })
        }
      })
    },
    cancelTag () {
      this.$refs.addTagForm.resetFields()
      this.tagAddShow = false
    },
    editTag () {
      this.$refs.editTagForm.validate((valid) => {
        if (valid) {
          axios.request({ url: `tagsUpdate/${this.editId}`, data: this.editTagForm, method: 'put' }).then(res => {
            Message.success('修改标签成功')
            this.tagEditShow = false
            this.$refs.editTagForm.resetFields()
            this.searchTag()
          }).catch(err => {
            Message.error('添加标签失败')
            console.log(err)
            this.tagEditShow = false
            this.searchTag()
          })
        } else {
          this.loadingEdit = false
          this.$nextTick(() => {
            this.loadingEdit = true
          })
        }
      })
    },
    cancelEditTag () {
      this.$refs.editTagForm.resetFields()
      this.tagEditShow = false
    }
  },
  created () {
    this.searchTag()
    this.user = this.$store.state.currentManager
  }
}
</script>

<style lang="less" scoped>

</style>
