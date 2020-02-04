<template>
  <div class="container">
    <div class="search-div">
      <div class="search-inpu-div">
        <input v-model="reqData.title" @keyup.enter="initData" placeholder="请输入事件标题" />
        <img src="../../assets/img/fond.png" @click="initData" class="search-icon" />
        <!-- <img src="../../assets/img/edit.png" class="edit-icon"/> -->
      </div>
      <el-select v-model="reqData.tree.id" clearable filterable placeholder="请选择银杉树">
        <el-option v-for="item in treeList" :key="item.no" :label="item.no" :value="item.id"></el-option>
      </el-select>
    </div>
    <div class="event-rows">
      <!-- <div class="event-col">
				<div class="header">				 
					<span class="title">添加事件</span>
				</div>
				<div class="card">
					<img/>
					<div class="date">
						<span>new</span>
					</div>				 
						<div class="content" >
							请输入事件内容
						</div>
				</div>
      </div>-->
      <div class="col" v-for="(item) in list" :key="item.id">
        <div class="card">
          <div class="header">
            <img class="avator" :src="item.photo" />
            <span class="title">
              {{item.tree.no}}
              <span style="color:#80808057">/</span>
              {{item.title}}
            </span>

            <span class="date">{{item.happenDate}}</span>
          </div>

          <el-popover
            placement="top"
            :title="item.title"
            width="300"
            trigger="hover"
            :content="item.content"
          >
            <div class="content" slot="reference">
              <span style="color:rgb(0, 62, 143)"></span>
              {{item.content}}
            </div>
          </el-popover>
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
  data() {
    return {
      list: [],
      treeList: [],
      reqData: {
        pageNum: 1,
        pageSize: 4,
        title: "",
        tree: {
          id: ""
        }
      },
      total: 0
    };
  },
  mounted() {
    this.initData();
    //初始化银杉树列表
    this.initTreeData();
  },
  methods: {
    initTreeData: function() {
      let that = this;
      api
        .treeList()
        .then(res => {
          if (res.data.code == "1") {
            that.treeList = res.data.rows.list;
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
    },
    handleCurrentChange: function(e) {
      this.reqData.pageNum = e;
      this.initData();
    },
    initData: function() {
      let that = this;
      api
        .eventList(that.reqData)
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
</style>
