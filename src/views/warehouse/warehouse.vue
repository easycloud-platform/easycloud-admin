<template>
  <div class="container">
    <div class="search-div">
      <div class="search-inpu-div">
        <input v-model="reqData.name" placeholder="请输入巡检库名称" @keyup.enter="initData" />
        <img src="../../assets/img/fond.png" @click="initData" class="search-icon" />
        <!-- <img src="../../assets/img/edit.png" class="edit-icon"/> -->
      </div>
      <div class="search-date-div">
        <el-date-picker
          v-model="reqData.uploadDate"
          type="date"
          placeholder="请选择巡检日期"
          :picker-options="pickerOptions"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </div>
    </div>
    <div class="event-rows">
      <div class="event-col" v-for="(item,index) in list" :key="item.id">
        <div class="header">
          <el-popover
            placement="right"
            :title="item.name"
            width="200"
            trigger="hover"
            :content="item.info"
          >
            <span class="title" slot="reference">{{item.name}}</span>
          </el-popover>
          <span class="date">{{item.uploadDate}} / {{JSON.parse(item.href).length}}张</span>
        </div>
        <div class="card">
          <viewer :images="JSON.parse(item.href)">
            <img v-for="obj in JSON.parse(item.href)" :src="obj" style="cursor: pointer;" />
          </viewer>
        </div>
      </div>
    </div>

    <div class="page">
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="reqData.pageSize"
        @current-change="handleCurrentChange"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import * as api from "@/axios/api.js";
export default {
  components: {},
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      list: [],
      reqData: {
        pageNum: 1,
        pageSize: 9,
        name: "",
        uploadDate: ""
      },
      total: 0
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    openImg: function(e) {
      // View an image
      const viewer = new Viewer(document.getElementById(e.id), {
        inline: true,
        viewed() {
          viewer.zoomTo(1);
        }
      });
    },
    handleCurrentChange: function(e) {
      this.reqData.pageNum = e;
      this.initData();
    },
    initData: function() {
      let that = this;
      api
        .warehouseList(that.reqData)
        .then(res => {
          if (res.data.code == "1") {
            that.list = res.data.rows.list;
            that.total = res.data.rows.total;
          } else {
            that.$notify.error({
              title: "服务器出小差了",
              message: res.data.message
            });
          }
        })
        .catch(() => {
          that.$notify.error({
            title: "服务器出小差了",
            message: "请您稍后再试"
          });
        });
    }
  }
};
</script>

<style scoped>
.event-rows {
  width: 100%;
  height: 70%;
  margin-top: 1%;
  margin-left: 4.5%;
}
.event-rows .event-col {
  width: 28%;
  height: 25%;
  margin-left: 1.5%;
  display: inline-block;
}
.event-rows .event-col .header {
  width: 100%;
  height: auto;
}
.event-rows .event-col .card {
  width: 100%;
  margin-top: 10%;
  height: 100%;
  background: rgba(255, 255, 255, 1);
  -webkit-box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.22);
  box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.22);
  border-radius: 0.1rem;
  position: relative;
  overflow: hidden;
}
.event-rows .event-col .card img {
  width: 100%;
  height: 100%;
  border-top-left-radius: 0.1rem;
  border-bottom-left-radius: 0.1rem;
  float: left;
}
.event-rows .event-col .card .date {
  background: transparent;
  width: 0.6rem;
  height: 0.3rem;
  position: absolute;
  color: #003e8f;
  /* border: 0.02rem dashed #003E8F; */
  /* top: -0.3rem; */
  /* right: -0.3rem; */
  font-size: 0.15rem;
  -webkit-transform: rotate(0deg);
  transform: rotate(0deg);
}
</style>
