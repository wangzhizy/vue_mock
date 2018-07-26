<template>
  <div>
    <MainHeader/>
    <el-form ref="projectForm" :model="form" label-width="130px"  :rules="rules" class="bgWhite m20 p50">
      <el-form-item label="项目ID:" prop="projectId">
        <el-input v-model="form.projectId" disabled ></el-input>
      </el-form-item>
      <el-form-item label="项目名称:" prop="projectName">
        <el-input v-model="form.projectName"></el-input>
      </el-form-item>
      <el-form-item label="项目基础URL:" prop="projectBaseUrl">
        <el-input v-model="form.projectBaseUrl" placeholder="https://com.wangzhi.test.com"></el-input>
      </el-form-item>
      <el-form-item label="项目描述:" prop="projectDesc">
        <el-input v-model="form.projectDesc" type="textarea"></el-input>
      </el-form-item>
      <el-form-item size="large">
        <el-button @click="cancel()">取消</el-button>
        <el-button type="primary" @click="saveProject('projectForm')" :loading="loading">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import Base from "./Base.vue";
import { isEmpty } from "../kit/EmptyKit";
import { ajax_post } from "../kit/HttpKit";
import { API_SAVEPROJECT } from "../config/ApiConfig";
import MainHeader from "../components/MainHeader.vue";
export default {
  name: "AddProject",
  extends: Base,
  components: { MainHeader: MainHeader },
  beforeMount: function() {
    if (!isEmpty(sessionStorage.projectObj)) {
      this.form = JSON.parse(sessionStorage.projectObj);
    }
  },
  methods: {
    saveProject: function(formName) {
      var isValid = true;
      this.$refs[formName].validate(valid => {
        isValid = valid;
      });
      if (!isValid) return;
      this.loading = true;
      const _self = this;
      ajax_post(
        API_SAVEPROJECT,
        {
          projectId: _self.form.projectId,
          projectName: _self.form.projectName,
          projectDesc: _self.form.projectDesc,
          projectBaseUrl: _self.form.projectBaseUrl
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
          _self.loading = false;
          _self.$message({
            type: "success",
            message: message
          });
        }
      );
    },
    cancel: function() {
      this.$router.go(-1);
    }
  },
  data: function() {
    return {
      loading: false,
      form: {
        projectId: "",
        projectName: "",
        projectBaseUrl: "",
        projectDesc: ""
      },
      rules: {
        projectName: [
          { required: true, message: "请输入项目名称", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        projectBaseUrl: [
          { required: true, message: "请输入项目基础URL", trigger: "blur" }
        ],
        projectDesc: [
          { required: true, message: "请输入项目描述", trigger: "blur" }
        ]
      }
    };
  }
};
</script>
<style>

</style>

