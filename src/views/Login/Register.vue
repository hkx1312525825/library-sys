<template>
  <div class="register-content">
    <Form
      ref="registerForm"
      :model="registerForm"
      :rules="registerFormRules"
      :label-width="100"
      class="register-form"
    >
      <FormItem label="手机号码" prop="phone">
        <Input
          v-model="registerForm.phone"
          placeholder="请输入手机号码"
        ></Input>
      </FormItem>
      <FormItem label="密码" prop="password">
        <Input v-model="registerForm.password" placeholder="请输入密码"></Input>
      </FormItem>
      <FormItem label="姓名" prop="name">
        <Input v-model="registerForm.name" placeholder="请输入姓名"></Input>
      </FormItem>
      <FormItem label="身份证号码" prop="id_card">
        <Input
          v-model="registerForm.id_card"
          placeholder="请输入身份证号码"
        ></Input>
      </FormItem>
      <FormItem label="性别" prop="sex">
        <RadioGroup v-model="registerForm.sex">
          <Radio label="false" border>男</Radio>
          <Radio label="true" border>女</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="头像" prop="img_id">
        <!-- <Input v-model="registerForm.img" placeholder="请输入用户名"></Input> -->
        <Upload
          :length.sync="img.length"
          :files.sync="img"
          :max="1"
          @getFile="getUploadFile($event)"
        ></Upload>
      </FormItem>
      <FormItem class="register" :label-width="0">
        <Button @click="registerSubmit('registerForm')" type="primary"
          >注册</Button
        >
        <Button @click="$router.push({name: 'Login'})" type="default"
          >返回</Button
        >
      </FormItem>
    </Form>
  </div>
</template>

<script>
import axios from '@/libs/axios'
import Upload from '@/components/Upload.vue'
import {
  Form,
  FormItem,
  Input,
  Message,
  Radio,
  RadioGroup,
  Button
} from 'view-design'
export default {
  components: {
    Form,
    FormItem,
    Input,
    Radio,
    Upload,
    RadioGroup,
    Button
  },
  name: 'Register',
  data () {
    return {
      man: false,
      woman: true,
      img: [],
      registerForm: {
        phone: '',
        password: '',
        name: '',
        id_card: '',
        sex: 'false',
        img_id: ''
      },
      registerFormRules: {
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
    registerSubmit (name) {
      console.log(this.registerForm)
      if (this.img.length > 0) {
        this.registerForm.img_id = this.img[0].id
      }
      this.$refs[name].validate(valid => {
        if (valid) {
          const data = this.registerForm
          if (this.registerForm.sex === 'false') {
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
              this.RegisterShow = false
              this.img = []
              this.$refs.registerForm.resetFields()
              this.$router.push({ name: 'Login' })
            })
            .catch(err => {
              console.log(err)
            })
        } else {
          Message.error('请输入所有必填项')
        }
      })
    },
    cancel () {
      this.$refs.registerForm.resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
.register-content {
  .flex-x-center;
  .register-form {
    border-radius: 10px;
    padding: 25px;
    background: #fff;
    width: 40%;
  }
  .register {
    text-align: right;
    .ivu-btn {
      margin-left: 35px;
    }
  }
}
</style>
