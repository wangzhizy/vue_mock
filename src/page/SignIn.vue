<template>
  <div class="main wh100">
    <div class="text1 p10 float-r" style="color:#fff" v-on:click="setting" hidden='true'>设置</div>
    <img :src="imgPath" alt="MOCK" class="mockImg centerH p100 clear"  />
    <div class="w300p centerH">
      <el-input type="text" v-model="userName" placeholder="用户名，没有会自动注册哦" clearable></el-input>
      <el-input type="password" v-model="userPass" placeholder="密码" class="mtb10" clearable></el-input>
      <el-button type="success" v-on:click="signIn" class="w100" v-loading.body.fullscreen="loading">登录</el-button>
    </div>
  </div>
</template>
<script>
import Base from "./Base.vue";
import { isEmpty } from "../kit/EmptyKit";
import { ajax_post } from "../kit/HttpKit";
import { API_SIGNIN } from "../config/ApiConfig";
const imgPath = require("../img/easy-mock.png");
export default {
  name: "SignIn",
  extends: Base,
  methods: {
    setting: function() {this.$router.push("Setting")},
    signIn: function(event) {
      if (isEmpty(this.userName)) {
        alert("用户名不能为空");
        return;
      }
      if (isEmpty(this.userPass)) {
        alert("密码不能为空");
        return;
      }
      this.loading = true;
      const _self = this;
      ajax_post(
        API_SIGNIN,
        { userName: this.userName, userPass: this.userPass },
        function(data) {
          _self.loading = false;
          console.log(data);
          localStorage.token = data;
          alert("登录成功");
          _self.$router.replace("/");
        },
        function(code, message) {
          _self.loading = false;
          alert(message);
        }
      );
    }
  },
  data: function() {
    return {
      imgPath: imgPath,
      userName: "",
      userPass: "",
      loading: false
    };
  }
};
</script>
<style>
.main {
  background-color: #56bc8a;
}
.mockImg {
  width: 230px;
}
</style>

