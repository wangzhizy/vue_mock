<template>
    <div class="w100">
        <el-card class="w100 smsText" v-for="(item,index) in smsList" :key="index">
            {{item.body}}}
        </el-card>
    </div>
</template>
<script>
    import Base from "./Base.vue";
    import {ajax_get} from "../kit/HttpKit";
    import {API_GETSMS} from "../config/ApiConfig";

    export default {
        name: "SmsList",
        extends: Base,
        data: function () {
            return {
                smsList: []
            };
        },
        beforeMount: function () {
            //获取短信列表
            const _self = this;
            ajax_get(
                API_GETSMS,
                {},
                function (data) {
                    _self.smsList = data;
                },
                function (code, message) {
                    alert(message);
                }
            );
        }
    };
</script>
<style>
    .smsText{
        font-size: 40px;
    }
</style>
