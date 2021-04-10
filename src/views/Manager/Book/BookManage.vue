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
        <Form :model="bookInfo" label-position="right" :label-width="100">
          <Row>
            <Col span="6"
              ><FormItem label="书籍名称">
                <Input
                  v-model="bookInfo.name"
                  placeholder="请输入书籍名称"
                ></Input> </FormItem
            ></Col>
            <Col span="6"
              ><FormItem label="书籍类型">
                <Input
                  v-model="bookInfo.tag"
                  placeholder="请输入书籍名称"
                ></Input> </FormItem
            ></Col>
            <Col span="6"
              ><FormItem label="作者名称">
                <Input
                  v-model="bookInfo.author"
                  placeholder="请输入作者名称"
                ></Input> </FormItem
            ></Col>
            <Col span="6"
              ><FormItem>
                  <Button style="margin-right: 25px" type="primary">查询</Button>
                  <Button type="normal">重置</Button>
                </FormItem
            ></Col>
          </Row>
        </Form>
      </div>
      <div class="table">
        <Table stripe :columns="columns1" :border="true" :data="bookData"></Table>
      </div>
    </Content>
  </div>
</template>

<script>
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
  Button
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
    Button
  },
  name: '',
  data () {
    return {
      bookInfo: {
        name: '',
        tag: '',
        author: ''
      },
      bookData: [],
      columns1: [
        {
          title: '#',
          type: 'index',
          width: '30'
        },
        {
          title: '书籍名称',
          key: 'name'
        },
        {
          title: '书籍图片',
          key: 'img'
        },
        {
          title: '作者',
          key: 'author'
        },
        {
          title: '简介',
          key: 'introduction',
          tooltip: true
        },
        {
          title: '评分',
          key: 'score'
        },
        {
          title: '推荐值',
          key: 'value'
        },
        {
          title: '标签',
          key: 'tags',
          tooltip: true
        },
        {
          title: '操作',
          // tooltip: true,
          render: (h, params) => {
            // return (
            //   <div>
            //     <Button type="primary" size="small" vOn:click={this.showEdit}>编辑</Button>
            //   </div>
            // )
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marinRight: '10px'
                },
                on: {
                  click: () => {
                    this.showEdit(params.row)
                  }
                }
              }, '编辑'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.delete(params.row)
                  }
                }
              }, '删除')
            ])
          }
        }
      ]
    }
  },
  methods: {
    showEdit (params) {
      console.log(params)
    },
    delete (params) {
      console.log(params)
    }
  },
  created () {
    axios.request({ url: 'books' }).then(res => {
      this.bookData = res
    })
  }
}
</script>

<style lang="less" scoped>
</style>
