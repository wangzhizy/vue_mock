<template>
  <div>
    <MainHeader/>
    <div v-for="(item,index) in projectList" :key="index" class="bgWhite projectItem w200p p10 m10 tac">
        <p class="text p10 tac">{{item.projectName}}</p>
        <p class="text1 m10 p10 bgGray text_end tal">{{item.projectDesc}}</p>
        <p class="text1 m10 p10 bgGray text_end tal">{{item.projectBaseUrl}}</p>
        <el-button-group>
          <el-button type="primary" icon="el-icon-more-outline" v-on:click="projectDesc(item.projectId)"></el-button>
          <el-button type="primary" icon="el-icon-edit" @click="editProject(item)"></el-button>
          <el-button type="primary" icon="el-icon-delete" v-on:click="deleteProject(index)" :loading="item.loading"></el-button>
        </el-button-group>
    </div>
    <el-button type="primary" icon="el-icon-plus" class="addBtn" circle v-on:click="addProject"></el-button>
  </div>
</template>
<script>
import Base from "./Base.vue";
import { isEmpty } from "../kit/EmptyKit";
import { ajax_get } from "../kit/HttpKit";
import { API_PROJECTLIST, API_DELETEPROJECT } from "../config/ApiConfig";
import MainHeader from "../components/MainHeader.vue";
export default {
  name: "Main",
  extends: Base,
  components: { MainHeader: MainHeader },
  data: function() {
    return {
      projectList: []
    };
  },
  beforeMount: function() {
    if (isEmpty(localStorage.token)) {
      this.$router.replace("/SignIn");
      return;
    }
    //获取项目列表
    const _self = this;
    ajax_get(
      API_PROJECTLIST,
      {},
      function(data) {
        data.map(item => {
          item.loading = false;
          return item;
        });
        _self.projectList = data;
      },
      function(code, message) {
        alert(message);
      }
    );
  },
  methods: {
    deleteProject: function(index) {
      const _self = this;
      _self.projectList[index].loading = true;
      ajax_get(
        API_DELETEPROJECT,
        { projectId: _self.projectList[index].projectId },
        function(data) {
          _self.projectList[index].loading = false;
          _self.projectList.splice(index, 1);
        },
        function(code, message) {
          _self.projectList[index].loading = false;
          alert(message);
        }
      );
    },
    addProject: function() {
      sessionStorage.projectObj = undefined
      this.$router.push("AddProject")
    },
    projectDesc: function(projectId) {
      sessionStorage.projectId = projectId
      this.$router.push("/MockList")
    },
    editProject:function(projectObj){
      sessionStorage.projectObj = JSON.stringify(projectObj)
      this.$router.push("AddProject")
    }
  }
};
</script>
<style>
.projectItem {
  float: left;
}
.addBtn {
  position: absolute;
  bottom: 10px;
  right: 10px;
}
</style>
