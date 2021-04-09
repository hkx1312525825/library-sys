<template>
  <div class="login-page">
    <div class="login-head">
      <img src="../../assets/匠-书房.png" alt="" />
    </div>
    <div class="login-content">
      <div class="login-part">
        <div class="part-head">
          <div
            class="choosen"
            @click="chossen = false"
            :class="chossen ? '' : 'active'"
          >
            用户登录
          </div>
          <div
            class="choosen"
            @click="chossen = true"
            :class="chossen ? 'active' : ''"
          >
            管理员登录
          </div>
        </div>
        <div class="part-content">
          <div class="login-form-user">
            <Form
              v-show="!chossen"
              :hide-required-mark="true"
              ref="userForm"
              :model="userForm"
              :rules="userFormRules"
              :label-width="80"
            >
              <FormItem :show-message="false" :label-width="0" prop="phone">
                <Input
                  prefix="md-person"
                  v-model="userForm.phone"
                  placeholder="请输入用户名"
                ></Input>
              </FormItem>
              <FormItem :show-message="false" :label-width="0" prop="password">
                <Input
                  prefix="md-unlock"
                  :password="true"
                  type="password"
                  v-model="userForm.password"
                  placeholder="请输入密码"
                ></Input>
              </FormItem>
              <FormItem class="submit" :label-width="0">
                <Button @click="userLogin('userForm')" type="primary"
                  >登录</Button
                >
              </FormItem>
              <FormItem class="register-unremember" :label-width="0">
                <div class="unremember">忘记密码</div>
                <div class="register" @click="RegisterShow = true">注册</div>
              </FormItem>
            </Form>
            <Form
              v-show="chossen"
              :hide-required-mark="true"
              ref="managerForm"
              :model="managerForm"
              :rules="managerFormRules"
              :label-width="80"
            >
              <FormItem :show-message="false" :label-width="0" prop="username">
                <Input
                  prefix="md-person"
                  v-model="managerForm.username"
                  placeholder="请输入管理员账号"
                ></Input>
              </FormItem>
              <FormItem :show-message="false" :label-width="0" prop="password">
                <Input
                  prefix="md-unlock"
                  :password="true"
                  type="password"
                  v-model="managerForm.password"
                  placeholder="请输入密码"
                ></Input>
              </FormItem>
              <FormItem class="submit" :label-width="0">
                <Button @click="managerLogin('managerForm')" type="primary"
                  >登录</Button
                >
              </FormItem>
            </Form>
          </div>
        </div>
      </div>
    </div>
    <div class="login-footer"></div>
    <Modal
      v-model="RegisterShow"
      title="注册"
      @on-ok="registerSubmit('registerForm')"
      @on-cancel="cancel"
      width="40%"
      :loading="true"
    >
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
          <Input
            v-model="registerForm.password"
            placeholder="请输入密码"
          ></Input>
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
          <Radio
            v-model="registerForm.sex"
            true-value="false"
            false-value="true"
            >男</Radio
          >
          <Radio
            v-model="registerForm.sex"
            true-value="true"
            false-value="false"
            >女</Radio
          >
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
      </Form>
    </Modal>
  </div>
</template>

<script>
import axios from '@/libs/axios'
import Upload from '@/components/Upload.vue'
import {
  Form,
  FormItem,
  Input,
  Button,
  Message,
  Modal,
  Radio
} from 'view-design'
export default {
  components: {
    Form,
    FormItem,
    Input,
    Button,
    Modal,
    Radio,
    Upload
  },
  name: '',
  data () {
    return {
      chossen: false,
      RegisterShow: false,
      userForm: {
        phone: '',
        password: ''
      },
      managerForm: {
        username: '',
        password: ''
      },
      managerFormRules: {
        username: [
          { required: true, message: '管理员账号不能为空', trigger: 'blur' }
        ],
        password: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
      },
      userFormRules: {
        phone: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
        password: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
      },
      img: [],
      registerForm: {
        phone: '',
        password: '',
        name: '',
        id_card: '',
        sex: '',
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
    userLogin (name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          axios
            .request({
              url: 'users?action=login',
              data: this.userForm,
              method: 'post'
            })
            .then(res => {
              this.$store.commit('setToken', res.token)
            })
        } else {
          Message.error('请输入账号密码')
        }
      })
    },
    managerLogin (name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          axios
            .request({
              url: 'managers?action=login',
              data: this.managerForm,
              method: 'post'
            })
            .then(res => {
              this.$store.commit('setToken', res.token)
              this.$router.push({ name: 'ManagerIndex' })
            })
        } else {
          Message.error('请输入账号密码')
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
    registerSubmit (name) {
      console.log(this.registerForm)
      if (this.img.length > 0) {
        this.registerForm.img_id = this.img[0].id
      }
      this.$refs[name].validate(valid => {
        if (valid) {
          axios
            .request({
              url: 'users?action=register',
              data: this.registerForm,
              method: 'post'
            })
            .then(res => {
              this.RegisterShow = false
              this.$refs.registerForm.resetFields()
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
.login-page {
  background: url("../../assets/background.png");
  min-height: 100vh;
  background-repeat: no-repeat;
  background-color: #b8e5f8;
  background-size: cover;
  .active {
    border-bottom: 5px solid @active-color;
    font-weight: 600;
  }
  .login-head {
    text-align: center;
  }
  .login-content {
    min-height: 500px;
    .flex-x-center;
    .login-part {
      border-radius: 10px;
      background: #fff;
      height: 450px;

      width: 400px;
      .part-head {
        .flex;
        font-size: 18px;
        // background: green;
        padding: 15px 25px;
        > div {
          cursor: pointer;
          padding: 5px;
          margin-right: 15px;
          // background: gold;
        }
      }
      .submit {
        margin-top: 50px;
        text-align: center;
        .ivu-btn {
          width: 300px;
          height: 40px;
          background: @base-color;
        }
      }
      .register-unremember {
        text-align: center;
        cursor: pointer;
        .unremember {
          margin-bottom: 5px;
          color: rgb(170, 170, 170);
        }
        .register {
          color: @base-color;
        }
      }
    }
    .part-content {
      padding: 30px;
    }
  }
  .login-footer {
    height: 200px;
  }
}
</style>
