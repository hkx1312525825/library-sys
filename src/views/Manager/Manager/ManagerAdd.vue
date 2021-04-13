<template>
  <div>
    <Breadcrumb :style="{ margin: '24px 0' }">
      <!-- <BreadcrumbItem>Home</BreadcrumbItem> -->
      <BreadcrumbItem>管理员管理</BreadcrumbItem>
      <BreadcrumbItem>管理员新增</BreadcrumbItem>
    </Breadcrumb>
    <Content
      :style="{ padding: '24px', minHeight: '280px', background: '#fff' }"
    >
      <Form
        ref="managerForm"
        :model="managerForm"
        :rules="managerFormRules"
        :label-width="100"
      >
        <FormItem label="账号" prop="username">
          <Input
            v-model="managerForm.username"
            style="width: 300px"
            placeholder="请输入账号"
          ></Input>
        </FormItem>
        <FormItem label="密码" prop="password">
          <Input
            v-model="managerForm.password"
            style="width: 300px"
            type="password"
            :password="true"
            placeholder="请输入密码"
          ></Input>
        </FormItem>
        <FormItem label="姓名" prop="name">
          <Input
            v-model="managerForm.name"
            style="width: 300px"
            placeholder="请输入姓名"
          ></Input>
        </FormItem>
        <FormItem label="联系号码" prop="phone">
          <Input
            v-model="managerForm.phone"
            style="width: 300px"
            placeholder="请输入联系号码"
          ></Input>
        </FormItem>
        <div class="form-button">
          <Button type="primary" @click="submit">提交</Button>
          <Button @click="cancel">取消</Button>
        </div>
      </Form>
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
  FormItem,
  Input,
  Button,
  Message
} from 'view-design'
export default {
  components: {
    Breadcrumb,
    BreadcrumbItem,
    Content,
    Form,
    FormItem,
    Input,
    Button
  },
  name: '',
  data () {
    return {
      managerForm: {
        phone: '',
        username: '',
        password: '',
        name: ''
      },
      managerFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入真实姓名', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入联系方式', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submit () {
      this.$refs.managerForm.validate((valid) => {
        if (valid) {
          const data = this.managerForm
          axios.request({ url: 'managers?action=register', data: data, method: 'post' }).then(res => {
            Message.success('新增管理员成功')
            this.$router.replace('ManagerManage')
          }).catch(err => {
            Message.error('新增管理员失败')
            console.log(err)
          })
        } else {
          Message.error('请填写必填字段')
        }
      })
    },
    cancel () {
      this.$router.replace({ name: 'ManagerManage' })
    }
  }
}
</script>

<style lang="less">

</style>
