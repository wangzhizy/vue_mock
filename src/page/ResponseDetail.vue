<template>
    <div>
        <MainHeader/>
        <el-form ref="responseForm" :model="response" label-width="130px"  :rules="rules" class="bgWhite m20 p50">
            <el-form-item label="标识:" prop="responseTag">
                <el-input v-model="response.responseTag" placeholder="请输入标识"></el-input>
            </el-form-item>
            <el-form-item label="描述:" prop="responseDesc">
                <el-input v-model="response.responseDesc" placeholder="请输入描述"></el-input>
            </el-form-item>
            <el-form-item label="返回值:" prop="responsePath">
                <el-input v-model="response.responsePath" type="textarea" :rows="10" placeholder="请输入返回值"></el-input>
            </el-form-item>
            <el-form-item size="large">
                <el-button type="danger" @click="deleteResponseClick()" :loading="loading" v-if="canDelete" >删除</el-button>
                <el-button type="primary" @click="saveResponse()" :loading="loading">保存更改</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import Base from "./Base.vue";
import { ajax_get, ajax_post } from "../kit/HttpKit";
import {
  API_RESPONSEDETAIL,
  API_RESPONSESAVE,
  API_RESPONSEDELETE
} from "../config/ApiConfig";
import { isEmpty } from "../kit/EmptyKit";
import MainHeader from "../components/MainHeader.vue";
export default {
  name: "ResponseDetail",
  components: { MainHeader },
  extends: Base,
  data: function() {
    return {
      loading: false,
      canDelete: false,
      response: {},
      rules: {
        responseTag: [
          { required: true, message: "请输入标识", trigger: "blur" }
        ]
      }
    };
  },
  beforeMount: function() {
    const mockId = sessionStorage.mockId;
    const responseId = sessionStorage.responseId;
    if (isEmpty(mockId) || isEmpty(responseId)) {
      alert("参数错误");
      this.$router.replace("/");
      return;
    }
    if (responseId == -1 || mockId == -1) {
      return;
    }
    this.canDelete = true;
    const _self = this;
    ajax_get(
      API_RESPONSEDETAIL,
      { responseId: responseId },
      function(data) {
        try {
          data.responsePath = JSON.stringify(
            JSON.parse(data.responsePath),
            null,
            2
          );
        } catch (e) {}
        _self.response = data;
      },
      function(code, message) {
        alert(message);
      }
    );
  },
  methods: {
    deleteResponseClick: function() {
      this.$confirm("此操作将删除该返回值, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
          this.deleteResponse();
        }).catch(() => {});
    },
    deleteResponse: function() {
      const _self = this;
      ajax_get(
        API_RESPONSEDELETE,
        { responseId: sessionStorage.responseId },
        function(data) {
          _self.$message({
            type: "success",
            message: "删除成功!，不要忘记设置新的返回值呦~"
          });
          _self.$router.go(-1);
        },
        function(code, message) {
          _self.$message({
            type: "info",
            message: message
          });
        }
      );
    },
    saveResponse: function() {
      var isValid = true;
      this.$refs.responseForm.validate(valid => {
        isValid = valid;
      });
      if (!isValid) return;
      const _self = this;
      this.loading = true;
      ajax_post(
        API_RESPONSESAVE,
        {
          responseId: sessionStorage.responseId,
          projectId: sessionStorage.projectId,
          mockId: sessionStorage.mockId,
          responseTag: this.response.responseTag,
          responseDesc: this.response.responseDesc,
          response: encodeURIComponent(this.response.responsePath)
        },
        function(data) {
          _self.loading = false;
          _self.$message({
            type: "success",
            message: "保存成功"
          });
          _self.$router.go(-1);
        },
        function(code, message) {
          _self.$message({
            type: "info",
            message: message
          });
          _self.loading = false;
        }
      );
    }
  }
};
</script>
<style>

</style>
