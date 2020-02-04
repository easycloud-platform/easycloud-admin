<template>
  <div class="container">
    <div class="search-div" v-show="role==1">
      <div class="search-inpu-div">
        <!-- <img src="../../assets/img/search.png" @click="initData" class="search-icon"/> -->
        <img src="../../assets/img/edit.png" @click="dialogVisible = true" class="edit-icon" />
      </div>
    </div>
    <iframe :src="liveUrl" style="width:100%;height:93%;border:none;" id="show-iframe"></iframe>

    <el-dialog title="无人机直播地址" :visible.sync="dialogVisible" center width="30%">
      <el-form ref="form" :model="dataForm" label-position="left" label-width="80px">
        <el-form-item label="地址">
          <el-input v-model="dataForm.value"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeLive">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import * as api from "@/axios/api.js";
export default {
  components: {},
  data() {
    return {
      id: "",
      dataForm: {
        value: ""
      },
      dialogVisible: false,
      role: "",
      liveUrl: ""
    };
  },
  watch: {},
  mounted() {
    //   this.changeFixed(this.clientHeight)
    this.role = JSON.parse(localStorage.getItem("user")).role;
    this.getLiveUrl();
  },
  methods: {
    changeLive: function() {
      let json = {
        id: this.id,
        code: "uav",
        value: this.dataForm.value
      };
      api
        .changeConfig(json)
        .then(res => {
          if (res.data.code == "1") {
            this.$notify.success({
              title: "设置直播地址成功",
              message: "即将刷新页面"
            });
            this.liveUrl = this.dataForm.value;
            this.dialogVisible = false;
          } else {
            this.$notify.error({
              title: "服务器出小差了",
              message: res.data.message
            });
          }
        })
        .catch(() => {
          this.$notify.error({
            title: "服务器出小差了",
            message: "请您稍后再试"
          });
        });
    },
    getLiveUrl: function() {
      api
        .getConfigByCode("uav")
        .then(res => {
          if (res.data.code == "1") {
            this.id = res.data.rows.id;
            this.data = res.data.rows;
            this.liveUrl = res.data.rows.value;
          } else {
            this.$notify.error({
              title: "服务器出小差了",
              message: res.data.message
            });
          }
        })
        .catch(() => {
          this.$notify.error({
            title: "服务器出小差了",
            message: "请您稍后再试"
          });
        });
    }
  }
};
</script>

<style >
</style>
