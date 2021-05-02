<template>
  <div>
    <Breadcrumb :style="{ margin: '24px 0' }">
      <!-- <BreadcrumbItem>Home</BreadcrumbItem> -->
      <BreadcrumbItem>用户管理</BreadcrumbItem>
      <BreadcrumbItem>新增用户</BreadcrumbItem>
    </Breadcrumb>
    <Content
      :style="{ padding: '24px', minHeight: '280px', background: '#fff' }"
    >
      <Form
        ref="userForm"
        :model="userForm"
        :rules="userFormRules"
        :label-width="100"
      >
        <FormItem label="账号" prop="phone">
          <Input
            v-model="userForm.phone"
            style="width: 300px"
            placeholder="请输入账号"
          ></Input>
        </FormItem>
        <FormItem label="密码" prop="password">
          <Input
            v-model="userForm.password"
            style="width: 300px"
            type="password"
            :password="true"
            placeholder="请输入密码"
          ></Input>
        </FormItem>
        <FormItem label="姓名" prop="name">
          <Input v-model="userForm.name" style="width: 300px" placeholder="请输入姓名"></Input>
        </FormItem>
        <FormItem label="身份证号码" prop="id_card">
          <Input
            v-model="userForm.id_card"
            placeholder="请输入身份证号码"
             style="width: 300px"
          ></Input>
        </FormItem>
        <FormItem label="性别" prop="sex">
          <RadioGroup v-model="userForm.sex">
            <Radio label="false" border>男</Radio>
            <Radio label="true" border>女</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="头像" prop="img_id">
          <!-- <Input v-model="userForm.img" placeholder="请输入用户名"></Input> -->
          <Upload
            :length.sync="img.length"
            :files.sync="img"
            :max="1"
            @getFile="getUploadFile($event)"
          ></Upload>
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
import Upload from '@/components/Upload.vue'
import {
  Breadcrumb,
  BreadcrumbItem,
  Content,
  Form,
  FormItem,
  Input,
  Button,
  Message,
  RadioGroup,
  Radio
} from 'view-design'
export default {
  components: {
    Breadcrumb,
    BreadcrumbItem,
    Content,
    Form,
    FormItem,
    Input,
    Button,
    Upload,
    RadioGroup,
    Radio
  },
  name: '',
  data () {
    return {
      userForm: {
        phone: '',
        password: '',
        name: '',
        id_card: '',
        sex: 'false',
        img_id: ''
      },
      img: [],
      userFormRules: {
        phone: [{ required: true, message: '手机号不能为空', trigger: 'blur' }],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ],
        name: [{ required: true, message: '姓名不能为空', trigger: 'blur' }],
        id_card: [
          { required: true, message: '身份证号码不能为空', trigger: 'blur' }
        ],
        sex: [{ required: true, message: '性别不能为空', trigger: 'blur' }]
      }
    }
  },
  methods: {
    submit () {
      console.log(this.userForm)
      if (this.img.length > 0) {
        this.userForm.img_id = this.img[0].id
      }
      this.$refs.userForm.validate(valid => {
        if (valid) {
          const data = this.userForm
          if (this.userForm.sex === 'false') {
            data.sex = false
          } else {
            data.sex = true
          }
          axios
            .request({
              url: 'users?action=register',
              data: data,
              method: 'post'
            })
            .then(res => {
              this.$router.replace({ name: 'UserManage' })
              Message.success('新增用户成功')
            })
            .catch(err => {
              console.log(err)
            })
        } else {
          Message.error('请输入所有必填项')
        }
      })
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
    },
    cancel () {
      this.$router.replace({ name: 'UserManage' })
    }
  }
}
</script>

<style lang="less"></style>
