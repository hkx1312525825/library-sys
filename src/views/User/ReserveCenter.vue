<template>
  <div class="reserve-center-page">
    <div class="search">
      <Form ref="reserveInfo" :label-width="100" :model="reserveInfo">
        <Row>
          <Col :span="22">
            <FormItem label="预约状态">
              <Select
                style="width: 200px"
                :clearable="true"
                placeholder="请选择预定状态"
                v-model="reserveInfo.status"
              >
                <Option value="0">未审核</Option>
                <Option value="1">已通过</Option>
                <Option value="2">未通过</Option>
                <Option value="3">租赁中</Option>
                <Option value="4">已归还</Option>
                <Option value="5">已逾期</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :span="2">
            <Button type="primary" @click="searchReserve(1)">查询</Button>
          </Col>
        </Row>
      </Form>
    </div>
    <div class="reserve-list">
      <div v-for="(item, index) in reserveList" :key="index">
        <div class="book-img">
          <img :src="item.book.img.url" alt="" />
        </div>
        <div class="book-detail">
          <span>书籍名称：{{ item.book.name }}</span>
          <span>作者：{{ item.book.author }}</span>
          <span>上架时间：{{ item.book.created_date | formatDate }}</span>
        </div>
        <div class="reserve-date">
          <span>借阅开始日期：{{ item.start_time }}</span>
          <span>借阅截止日期：{{ item.end_time }}</span>
        </div>
        <div class="reserve-status">
          <span class="warning" v-show="item.status === 0">待审核</span>
          <span class="success" v-show="item.status === 1">待领取</span>
          <span class="danger" v-show="item.status === 2">已驳回</span>
          <span class="success" v-show="item.status === 3">借阅中</span>
          <span class="success" v-show="item.status === 4">已归还</span>
          <span class="danger" v-show="item.status === 5">已归还</span>
        </div>
        <div class="btn">
          <Button
            v-if="item.status === 0 || item.status === 1 || item.status === 2"
            size="small"
            type="error"
            ghost
            @click="cancel(item.id)"
            >取消</Button
          >
          <Button v-if="item.status === 3" type="success" size="small" ghost
            >续订</Button
          >
          <Button
            v-if="item.status === 4"
            type="primary"
            size="small"
            @click="toComment(item)"
            ghost
            >评论</Button
          >
        </div>
      </div>
    </div>
    <div class="flex-x-center" v-show="reserveList.length === 0">
      <img src="../../assets/noData.svg" alt="" />
    </div>
    <div v-show="reserveList.length !== 0" class="flex-x-center">
      <Page @on-change="changePage" :total="total" />
    </div>
  </div>
</template>

<script>
import axios from '@/libs/axios'
import { formatDate } from '@/libs/utils'
import {
  Button,
  Page,
  Message,
  Select,
  Option,
  Form,
  FormItem,
  Row,
  Col
} from 'view-design'
export default {
  name: '',
  components: {
    Button,
    Page,
    Select,
    Option,
    Form,
    FormItem,
    Row,
    Col
  },
  data () {
    return {
      reserveList: [],
      total: null,
      reserveInfo: {
        status: ''
      }
    }
  },
  filters: {
    formatDate (time) {
      var date = new Date(time)
      return formatDate(date, 'yyyy年MM月dd日')
    }
  },
  computed: {
    user () {
      // debugger
      return this.$store.state.currentUser
    }
  },
  methods: {
    searchReserve (page = 1) {
      axios
        .request({ url: `ReserveList?phone=${this.user.phone}&page=${page}`, params: this.reserveInfo })
        .then(res => {
          this.reserveList = res.results
          this.total = res.count
        })
    },
    changePage (page) {
      this.searchReserve(page)
    },
    cancel (id) {
      axios
        .request({ url: `ReserveDelAndUp/${id}`, method: 'delete' })
        .then(res => {
          Message.success('取消预订成功')
          this.searchReserve()
        })
        .catch(err => {
          console.log(err)
          Message.error('取消预订失败')
        })
    },
    toComment (item) {
      const { href } = this.$router.resolve({
        name: 'CommentEdit',
        params: { bookId: item.book.id, reserveId: item.id }
      })
      window.open(href, '_blank')
      // this.$router.push({ path: '/CommentEdit', params: { id: id } })
    }
  },
  created () {
    debugger
    this.searchReserve()
  }
}
</script>

<style lang="less" scoped>
.reserve-center-page {
  width: @content-width;
  margin: 25px auto;
  .reserve-list {
    > div {
      .flex;
      width: 100%;
      padding: 15px;
      border: 1px solid #ccc;
      border-radius: 5px;
      margin-bottom: 25px;
      .flex-x-bt;
      > div {
        // flex: 1;
        .flex-y;
        > span:not(:last-child) {
          margin-bottom: 15px;
        }
      }
      .reserve-status {
        font-size: 18px;
        font-weight: 600;
      }
      .btn {
        > button:not(:last-child) {
          margin-bottom: 15px;
        }
      }
      .book-img {
        > img {
          height: 150px;
          width: 100px;
        }
      }
    }
  }
}
</style>
