<template>
  <div class="book-detail-page">
    <div class="breadcumb">
      <Breadcrumb :style="{ margin: '24px 0' }">
        <BreadcrumbItem>首页</BreadcrumbItem>
        <BreadcrumbItem>书籍总览</BreadcrumbItem>
        <BreadcrumbItem>书籍详情</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="book-detail-content">
      <div class="title">《{{ bookDetail.name }}》</div>
      <div class="info">
        <div>
          <p v-html="bookDetail.introduction"></p>
        </div>
        <div style="margin-right: 15px">
          <img
            style="width: 200px; height: 250px"
            :src="bookDetail.img.url"
            alt=""
          />
        </div>
      </div>
    </div>
    <Card :bordered="false" class="fix-card">
      <p slot="title">书籍小tip</p>
      <span
        v-show="bookDetail.num !== 0"
        class="reserve-book"
        @click="reserveBook"
        slot="extra"
        >预订</span
      >
      <div>作者：{{ bookDetail.author }}</div>
      <div>上架时间：{{ bookDetail.created_date | dateFormate }}</div>
      <div>书籍数量：{{ bookDetail.num }}</div>
      <div>点击量：{{ bookDetail.score }}</div>
      <div>
        <Tag v-for="(item, index) in bookDetail.tags" :key="index">{{
          item.name
        }}</Tag>
      </div>
    </Card>
    <Modal
      v-model="reserveShow"
      title="预订信息"
      :loading="loading"
      @on-ok="asyncOK"
    >
      <Form
        ref="reserveForm"
        :model="reserveForm"
        format="daterange"
        :rules="reserveFormRules"
      >
        <FormItem label="书籍名称">
          <p>：《{{ bookDetail.name }}》</p>
        </FormItem>
        <FormItem label="借阅日期" prop="start_time">
          <DatePicker
            type="daterange"
            @on-change="getDate"
            @on-clear="clearDate"
            :show-week-numbers="true"
            placeholder="请选择借阅日期"
            style="width: 200px"
          ></DatePicker>
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
  Tag,
  Card,
  Modal,
  Form,
  FormItem,
  DatePicker,
  Message
} from 'view-design'
export default {
  components: {
    Breadcrumb,
    BreadcrumbItem,
    Tag,
    Card,
    Modal,
    Form,
    FormItem,
    DatePicker
  },
  name: '',
  data () {
    return {
      bookDetail: {},
      reserveShow: false,
      loading: false,
      reserveForm: {
        user_id: '',
        book_id: '',
        start_time: '',
        end_time: ''
      },
      reserveFormRules: {
        start_time: [
          { required: true, message: '请选择借阅时间', trigger: 'blur' }
        ]
      }
    }
  },
  props: ['id'],
  filters: {
    dateFormate (str) {
      var time = new Date(str)

      function timeAdd0 (str) {
        if (str < 10) {
          str = '0' + str
        }
        return str
      }
      var y = time.getFullYear()
      var m = time.getMonth() + 1
      var d = time.getDate()
      var h = time.getHours()
      var mm = time.getMinutes()
      var s = time.getSeconds()
      return (
        y +
        '-' +
        timeAdd0(m) +
        '-' +
        timeAdd0(d) +
        ' ' +
        timeAdd0(h) +
        ':' +
        timeAdd0(mm) +
        ':' +
        timeAdd0(s)
      )
    }
  },
  methods: {
    asyncOK () {
      this.$refs.reserveForm.validate((valid) => {
        if (valid) {
          const currentUser = this.$store.state.currentUser
          if (currentUser) {
            this.reserveForm.user_id = currentUser.id
            this.reserveForm.book_id = this.bookDetail.id
            axios.request({ url: 'createReserve', data: this.reserveForm, method: 'post' }).then(res => {
              Message.success('预定成功，请等待管理员处理')
              this.reserveShow = false
            }).catch(error => {
              console.log(error)
              Message.error('预定失败，请联系管理员')
            })
          } else {
            Message.error('请登陆后在进行尝试')
            this.loading = false
            this.$nextTick(() => {
              this.loading = true
            })
          }
        } else {
          this.loading = false
          this.$nextTick(() => {
            this.loading = true
          })
        }
      })
    },
    getDate (date) {
      if (date.length !== 0) {
        this.reserveForm.start_time = date[0]
        this.reserveForm.end_time = date[1]
      }
    },
    clearDate () {
      this.reserveForm.start_time = ''
      this.reserveForm.end_time = ''
    },
    reserveBook () {
      // const currentUser = this.$store.state.currentUser
      // if (currentUser) {
      //   const data = {
      //     user_id: currentUser.id,
      //     book_id: this.bookDetail.id
      //   }
      //   axios.request({ url: 'reserves', data: data, method: 'post' })
      // } else {
      //   Message.error('请登陆后在进行尝试')
      // }
      this.reserveShow = true
    }
  },
  created () {
    axios.request({ url: `bookDetail/${this.id}` }).then(res => {
      this.bookDetail = res
    })
  }
}
</script>

<style lang="less" scoped>
.book-detail-page {
  width: @content-width;
  // background: pink;
  .reserve-book {
    cursor: pointer;
    &:hover {
      color: #eee;
    }
  }
  margin: auto;
  .book-detail-content {
    .flex-y-center;
    > div {
      margin-top: 15px;
    }
    .title {
      font-size: 24px;
      font-weight: 600;
    }
    .info {
      .flex;
      > div {
        padding: 40px;
      }
    }
  }
  .ivu-card {
    position: fixed;
    right: 0;
    bottom: 45vh;
    background: #eee;
    border-radius: 15px;
    background: @base-bg-color;
    color: #fff;
  }
  .ivu-card-head {
    > p {
      color: #fff;
    }
  }
  .ivu-card-body {
    > div {
      margin-bottom: 15px;
    }
  }
}
</style>
