<template>
  <div class="main wh100">
    <img :src="imgPath" alt="MOCK" class="mockImg centerH p100 clear"  />
    <div class="w300p centerH">
      <el-input type="text" v-model="baseUrl" placeholder="http://192.168.1.1:8080" class="mtb10"></el-input>
      <el-button type="success" v-on:click="save" class="w100">保存</el-button>
    </div>
  </div>
</template>
<script>
import Base from "./Base.vue";
import { isEmpty } from "../kit/EmptyKit";
const imgPath = require("../img/easy-mock.png");
export default {
  name: "Setting",
  extends: Base,
  methods: {
    save: function() {
      if (isEmpty(this.baseUrl)) {
        this.$message({
          type: "info",
          message: "url不能为空"
        });
        return
      }
      localStorage.baseUrl = this.baseUrl
      this.$router.go(-1)
    }
  },
  data: function() {
    return {
      imgPath: imgPath,
      baseUrl: localStorage.baseUrl
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

