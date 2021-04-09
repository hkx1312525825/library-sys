<template>
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
              <!-- <div class="unremember">忘记密码</div> -->
              <div class="register" @click="$router.push({name: 'Register'})">注册</div>
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
</template>

<script>
import { Form, FormItem, Input, Button, Message } from 'view-design'
import axios from '@/libs/axios'
export default {
  components: {
    Form,
    FormItem,
    Input,
    Button
  },
  name: 'Login',
  data () {
    return {
      userForm: {
        phone: '',
        password: ''
      },
      chossen: false,
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
    }
  }
}
</script>

<style lang="less" scoped>
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
  .active {
    border-bottom: 5px solid @active-color;
    font-weight: 600;
    transition: all 0.2s;
  }
}
</style>
