<template>
    <div class="container">
    <div class="search-container">
        <el-row>
          <el-button size="small" icon="el-icon-search" circle></el-button>
          <el-button type="primary" size="small" icon="el-icon-edit" circle></el-button>
          <el-button type="success" size="small" icon="el-icon-check" circle></el-button>
          <el-button type="info" size="small" icon="el-icon-message" circle></el-button>
          <el-button type="warning" size="small" icon="el-icon-star-off" circle></el-button>
          <el-button type="danger" size="small" icon="el-icon-delete" circle></el-button>
        </el-row>
    </div>
        <el-table
        :data="tableData"
        border
        >
        <el-table-column
          fixed
          prop="date"
          label="日期"
          width="150">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="120">
        </el-table-column>
        <el-table-column
          prop="province"
          label="省份"
          width="120">
        </el-table-column>
        <el-table-column
          prop="city"
          label="市区"
          width="120">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址"
          width="300">
        </el-table-column>
        <el-table-column
          prop="zip"
          label="邮编"
          width="120">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
        </el-table>

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
  export default {
    methods: {
      handleClick(row) {
        console.log(row);
      }
    },

    data() {
      return {
          list: [],
          treeList: [],
          reqData: {
            pageNum: 1,
            pageSize: 4,
            title: "",
          },
          total: 100,
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1517 弄',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1519 弄',
          zip: 200333
        }, {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1516 弄',
          zip: 200333
        },{
                    date: '2016-05-02',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                  }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1517 弄',
                    zip: 200333
                  }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1519 弄',
                    zip: 200333
                  }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1516 弄',
                    zip: 200333
                  },{
                              date: '2016-05-02',
                              name: '王小虎',
                              province: '上海',
                              city: '普陀区',
                              address: '上海市普陀区金沙江路 1518 弄',
                              zip: 200333
                            }, {
                              date: '2016-05-04',
                              name: '王小虎',
                              province: '上海',
                              city: '普陀区',
                              address: '上海市普陀区金沙江路 1517 弄',
                              zip: 200333
                            }, {
                              date: '2016-05-01',
                              name: '王小虎',
                              province: '上海',
                              city: '普陀区',
                              address: '上海市普陀区金沙江路 1519 弄',
                              zip: 200333
                            }, {
                              date: '2016-05-03',
                              name: '王小虎',
                              province: '上海',
                              city: '普陀区',
                              address: '上海市普陀区金沙江路 1516 弄',
                              zip: 200333
                            }]
      }
    }
  }
</script>