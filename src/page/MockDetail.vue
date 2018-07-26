<template>
  <div>
    <MainHeader/>
    <el-form ref="mockForm" :model="data.mock" label-width="130px"  :rules="rules" class="bgWhite m20 p50">
      <el-form-item label="URL:" prop="mockUrl">
        <el-input v-model="data.mock.mockUrl"  placeholder="/test/test.json"></el-input>
      </el-form-item>
      <el-form-item label="描述:" prop="mockDesc">
        <el-input v-model="data.mock.mockDesc" placeholder="请输入Mock描述"></el-input>
      </el-form-item>
      <el-form-item label="组ID:" prop="mockGroupId">
        <el-input v-model="data.mock.mockGroupId" placeholder="输入可标记组"></el-input>
      </el-form-item>
      <el-form-item label="组描述:" prop="mockGroupDesc">
        <el-input v-model="data.mock.mockGroupDesc" type="textarea" placeholder="请输入组描述"></el-input>
      </el-form-item>
      <el-form-item label="返回值:">
        <div v-for="(item,index) in data.responseList" :key="index" >
            <el-radio v-model="mockSelectResponseId" :label="item.responseId">
                {{item.responseDesc}}
            </el-radio>
            <el-button type="primary" size="mini" icon="el-icon-edit" v-on:click="editResponse(item)"/>
        </div>
      </el-form-item>
      <el-form-item size="large">
        <el-button type="primary" v-on:click="addResponse()" >添加返回值</el-button>
        <el-button type="primary" @click="saveMock()" :loading="loading">保存更改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import Base from "./Base.vue";
import { API_MOCKDETAIL, API_MOCKSAVE } from "../config/ApiConfig";
import { ajax_get, ajax_post } from "../kit/HttpKit";
import { isEmpty } from "../kit/EmptyKit";
import MainHeader from "../components/MainHeader.vue";
export default {
  name: "MockDetail",
  extends: Base,
  components: { MainHeader },
  data: function() {
    return {
      loading: false,
      mockSelectResponseId: "",
      data: {
        mock: {
          mockDesc: "",
          mockGroupDesc: ""
        },
        responseList: []
      },
      rules: {
        mockUrl: [{ required: true, message: "请输入URL", trigger: "blur" }]
      }
    };
  },
  beforeMount: function() {
    const mockId = sessionStorage.mockId;
    if (isEmpty(mockId)) {
      alert("参数错误");
      this.$router.replace("/");
      return;
    }
    if (mockId == -1) {
      return;
    }
    const _self = this;
    _self.mockSelectResponseId = -1;
    ajax_get(
      API_MOCKDETAIL,
      { mockId: mockId },
      function(data) {
        if (isEmpty(data.responseList)) {
          data.responseList = [];
        }
        if (data.mock.mockGroupId == 0) {
          data.mock.mockGroupId = "";
        }
        data.responseList.map(item => {
          if (item.responseId == data.mock.mockResponseId) {
            _self.mockSelectResponseId = item.responseId;
          }
          return item;
        });
        _self.data.mock = data.mock;
        _self.data.responseList = data.responseList;
      },
      function(code, message) {
        alert(message);
      }
    );
  },
  methods: {
    saveMock: function(needAddResponse) {
      var isValid = true;
      this.$refs.mockForm.validate(valid => {
        isValid = valid;
      });
      if (!isValid) return;
      const _self = this;
      _self.loading = true;
      ajax_post(
        API_MOCKSAVE,
        {
          mockId: sessionStorage.mockId,
          projectId: sessionStorage.projectId,
          mockDesc: this.data.mock.mockDesc,
          mockUrl: this.data.mock.mockUrl,
          mockState: "1",
          mockGroupId: isEmpty(this.data.mock.mockGroupId)
            ? 0
            : this.data.mock.mockGroupId,
          mockGroupDesc: this.data.mock.mockGroupDesc,
          mockResponseId: isEmpty(this.mockSelectResponseId)
            ? 0
            : this.mockSelectResponseId
        },
        function(data) {
          _self.loading = false;
          sessionStorage.mockId = data.mockId;
          if (needAddResponse) {
            sessionStorage.responseId = -1;
            _self.$router.push("/ResponseDetail");
          } else {
            _self.$message({
              type: "success",
              message: "保存成功"
            });
          }
        },
        function(code, message) {
          _self.loading = false;
          _self.$message({
              type: "info",
              message: message
            });
        }
      );
    },
    editResponse: function(response) {
      sessionStorage.responseId = response.responseId;
      this.$router.push("/ResponseDetail");
    },
    addResponse: function() {
      if (sessionStorage.mockId == -1) {
        this.saveMock(true);
        return;
      }
      sessionStorage.mockId = this.data.mock.mockId;
      sessionStorage.responseId = -1;
      this.$router.push("/ResponseDetail");
    }
  }
};
</script>
<style>

</style>
