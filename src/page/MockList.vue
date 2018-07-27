<template>
    <div class="h100">
        <MainHeader/>
        <el-table style="width:100%;height:100%" :data="mockList" border highlight-current-row>
            <el-table-column label="状态" width="60" align="center">
                <template slot-scope="scope">
                    <el-switch
                            v-model="scope.row.mockState"
                            @change="switchMockState(scope.row,scope.$index)">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column label="URL" sortable prop="mockUrl"/>
            <el-table-column label="描述" prop="mockDesc"/>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button-group>
                        <el-button size="mini" icon="el-icon-view" v-on:click="previewMock(scope.row,scope.$index)"/>
                        <el-button size="mini" icon="el-icon-edit" v-on:click="editMock(scope.row,scope.$index)"/>
                        <el-button size="mini" icon="el-icon-delete" v-on:click="deleteMock(scope.row,scope.$index)"/>
                    </el-button-group>
                </template>
            </el-table-column>
        </el-table>
        <el-button type="primary" icon="el-icon-plus" class="addBtn" circle v-on:click="addMock"></el-button>
    </div>
</template>
<script>
    import Base from "./Base.vue";
    import {isEmpty} from "../kit/EmptyKit";
    import {ajax_get, ajax_post} from "../kit/HttpKit";
    import {API_DELETEMOCK, API_MOCKLIST, API_SWITCHMOCK, BASEURL} from "../config/ApiConfig";
    import MainHeader from "../components/MainHeader.vue";

    export default {
        name: "MockList",
        extends: Base,
        components: {MainHeader: MainHeader},
        data: function () {
            return {
                mockList: []
            };
        },
        beforeMount: function () {
            const projectId = sessionStorage.projectId;
            if (isEmpty(projectId)) {
                alert("参数错误");
                this.$router.replace("/");
                return;
            }
            //获取项目列表
            const _self = this;
            ajax_get(
                API_MOCKLIST,
                {projectId: projectId},
                function (data) {
                    data.map(item => {
                        item.mockState = item.mockState == "1";
                        return item;
                    });
                    _self.mockList = data;
                },
                function (code, message) {
                    alert(message);
                }
            );
        },
        methods: {
            //切换mock开启状态
            switchMockState: function (selectMock, index) {
                const _self = this;
                ajax_post(
                    API_SWITCHMOCK,
                    {mockId: selectMock.mockId, mockState: selectMock.mockState},
                    function (data) {
                    },
                    function (code, message) {
                        alert("切换状态失败");
                        _self.mockList[index].mockState = !_self.mockList[index].mockState;
                    }
                );
            },
            //预览Mock
            previewMock: function (selectMock) {
                window.open(
                    BASEURL +
                    selectMock.mockUrl +
                    "?mockProjectId=" +
                    selectMock.projectId,
                    "_blank"
                );
            },
            //编辑Mock
            editMock: function (selectMock) {
                sessionStorage.mockId = selectMock.mockId;
                this.$router.push("/MockDetail");
            },
            //删除Mock
            deleteMock: function (selectMock, index) {
                const _self = this;
                ajax_post(
                    API_DELETEMOCK,
                    {mockId: selectMock.mockId},
                    function (data) {
                        _self.mockList.splice(index, 1);
                    },
                    function (code, message) {
                        alert("删除失败");
                    }
                );
            },
            //添加Mock
            addMock: function () {
                sessionStorage.mockId = -1;
                this.$router.push("/MockDetail");
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
