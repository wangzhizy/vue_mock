<template>
  <el-row type="flex" class="headerRoot" justify="space-between" align="middle">
    <img :src="imgPath" alt="MOCK" class="w100p m20"/>
    <div class="m10"><el-button @click="logout()" >退出登录</el-button></div>
  </el-row>
</template>

<script>
const imgPath = require("../img/easy-mock.png");
export default {
  data: function() {
    return { imgPath: imgPath };
  },
  methods:{
    logout:function(){
      localStorage.token = ''
      this.$router.replace("SignIn");
    }
  }
};
</script>
<style>
.headerRoot {
  background-color: #495060;
}
.logout {
  float: right;
  height: 100%;
}
</style>

