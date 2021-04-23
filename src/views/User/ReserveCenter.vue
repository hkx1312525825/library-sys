<template>
  <div class="reserve-center-page">
    <div class="reserve-list">
      <div v-for="(item, index) in reserveList" :key="index">
        <div class="book-img">
          <img :src="item.book.img.url" alt="">
        </div>
        <div class="book-detail">
          <span>书籍名称：{{item.book.name}}</span>
          <span>作者：{{item.book.author}}</span>
          <span>上架时间：{{item.book.created_date | formatDate}}</span>
        </div>
        <div class="reserve-date">
          <span>借阅开始日期：{{item.start_time}}</span>
          <span>借阅截止日期：{{item.end_time}}</span>
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
          <Button v-if="item.status === 0 || item.status === 1 || item.status === 2" type="error" size="mini" ghost @click="cancel(item.id)">取消</Button>
          <Button v-if="item.status === 3" type="success" size="mini" ghost>续订</Button>
          <Button v-if="item.status === 4" type="primary" size="mini" ghost>评论</Button>
        </div>
      </div>
    </div>
    <div class="flex-x-center" v-show="reserveList.length === 0">
      <img src="../../assets/noData.svg" alt="">
    </div>
    <div v-show="reserveList.length !== 0" class="flex-x-center"><Page @on-change="changePage" :total="total" /></div>
  </div>
</template>

<script>
import axios from '@/libs/axios'
import { formatDate } from '@/libs/utils'
import { Button, Page, Message } from 'view-design'
export default {
  name: '',
  components: {
    Button,
    Page
  },
  data () {
    return {
      reserveList: [],
      total: null
    }
  },
  filters: {
    formatDate (time) {
      var date = new Date(time)
      return formatDate(date, 'yyyy年MM月dd日')
    }
  },
  methods: {
    searchReserve (page = 1) {
      const user = this.$store.state.currentUser
      axios.request({ url: `ReserveList?phone=${user.phone}&page=${page}` }).then(res => {
        this.reserveList = res.results
        this.total = res.count
      })
    },
    changePage (page) {
      this.searchReserve(page)
    },
    cancel (id) {
      axios.request({ url: `ReserveDelAndUp/${id}`, method: 'delete' }).then(res => {
        Message.success('取消预订成功')
        this.searchReserve()
      }).catch(err => {
        console.log(err)
        Message.error('取消预订失败')
      })
    }
  },
  created () {
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
