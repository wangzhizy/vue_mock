<template>
    <div class="w100">
        <el-card class="w100 smsText" v-for="(item,index) in smsList" :key="index">
            {{item.body}}
            <p style="text-align: right">{{getdate(item.date)}}</p>
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
        },
        methods: {
            getdate: function (time) {
                const now = new Date(time),
                    y = now.getFullYear(),
                    m = now.getMonth() + 1,
                    d = now.getDate();
                return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " + now.toTimeString().substr(0, 8);
            }
        }
    };
</script>
<style>
    .smsText {
        font-size: 40px;
    }
</style>
