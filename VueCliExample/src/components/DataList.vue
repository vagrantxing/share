<!--
 * @Author: xingtao
 * @Date: 2021-12-05 14:37:36
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-12-05 21:08:05
 * @Descripttion: 列表页
 * @FilePath: \share\share\VueCliExample\src\components\DataList.vue
-->

<template>
  <div class="data-container">
    <div class="header-item">
      <header-item></header-item>
    </div>
    <div class="main">
      <div class="search-item">
        <search-item :sexMapping="sexMapping" @sendListQuery="sendListQuery"></search-item>
      </div>
      <div class="main-container">
        <el-row style="padding: 10px 0;">
          <el-col :span="24" align="right">
              <el-button size="medium" type="success" icon="el-icon-plus" @click="handleDialog({})">新增</el-button>
          </el-col>
        </el-row>
        <div class="table-item">
          <el-table
            :data="tableData"
            border
            stripe
            style="width: 100%"
            :header-cell-style="{background: '#d1def1',color: '#444'}">
            <el-table-column type="index" label="序号" width="55"></el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="sex" label="性别">
              <template slot-scope="scope">
                {{ sexMapping[scope.row.sex] }}
              </template>
</el-table-column>
<el-table-column prop="height" label="身高"></el-table-column>
<el-table-column prop="phone" label="手机"></el-table-column>
<el-table-column prop="hobby" label="爱好">
    <template slot-scope="scope">
                    {{ scope.row.hobby === 3 ? hobbyMapping[scope.row.hobby] : scope.row.otherHobby }}
                  </template>
</el-table-column>
<el-table-column label="操作" width="120">
    <template slot-scope="scope">
                <el-button type='text' size="mini" @click="handleDialog(scope.row)">编辑</el-button>
                <el-button type='text' size="mini" @click="handleDelete(scope.row)">删除</el-button>
              </template>
</el-table-column>
</el-table>
</div>
<div class="page-item">
    <el-pagination v-if="total > 0" background @current-change="handleCurrentChange" :current-page.sync="pageQuery.pageNum" :page-size="pageQuery.pageSize" layout="total, prev, pager, next" :total="total">
    </el-pagination>
</div>
</div>
</div>
<div class="dialog-item">
    <el-dialog :title="dataOption[dataOperation]" :visible.sync="dialogVisible" width="45%">
        <dialog-item :sexMapping="sexMapping" :hobbyMapping="hobbyMapping" :userInfo="userInfo" @cancelDialog="cancelDialog" @successDialog="getTableData"></dialog-item>
    </el-dialog>
</div>
</div>
</template>

<script>
    import Header from "./Header.vue"
    import SearchItem from "./SearchItem.vue"
    import DialogItem from "./DialogItem.vue"
    export default {
        name: 'DataList',
        components: {
            "header-item": Header,
            "search-item": SearchItem,
            "dialog-item": DialogItem,
        },
        data() {
            return {
                sexMapping: {
                    1: "男",
                    2: "女"
                },
                hobbyMapping: {
                    0: '无',
                    1: '象棋',
                    2: '胸口碎大石',
                    3: '其他',
                },
                userTableData: [],
                tableData: [{
                    uuid: "asdfkahskdfasfdh",
                    name: "邢涛",
                    nikeName: "xingtao",
                    sex: "1",
                    birthday: "1997-04-17",
                    height: 180,
                    phone: "15706012563",
                    address: "福建省厦门市",
                    email: "xingtao@163.com",
                    hobby: "0"
                }],
                total: 0,
                pageQuery: {
                    pageNum: 1,
                    pageSize: 10
                },

                dataOption: {
                    create: '新增',
                    edit: '编辑'
                },
                dataOperation: "create",
                dialogVisible: false,
                userInfo: {},
            }
        },
        created() {
            this.$nextTick(() => {
                this.getTableData()
            })
        },
        methods: {
            // 获取表格数据
            getTableData() {
                this.userTableData = JSON.parse(localStorage.getItem("userTableData")) || [];
                this.tableData = this.userTableData.slice(0, 10);
                this.total = this.userTableData.length;
            },
            // 分页
            handleCurrentChange(val) {
                this.pageQuery.pageNum = val;
                this.tableData = this.userTableData.slice(this.pageQuery.pageNum, this.pageQuery.pageSize);
            },
            // 搜索
            sendListQuery(val) {
                const tableData = this.userTableData.filter(item => {
                    if (val.name && val.sex) {
                        return val.name === item.name && val.sex === item.sex;
                    } else if (val.name) {
                        return val.name === item.name
                    } else if (val.sex) {
                        return val.sex === item.sex
                    } else {
                        return true;
                    }
                })
                this.tableData = tableData.slice(0, 10);
                this.total = this.tableData.length
            },
            // 编辑/新增
            handleDialog(item) {
                this.userInfo = Object.assign({}, item)
                this.dialogVisible = true
            },
            // 删除
            handleDelete(row) {
                this.$confirm(`是否删除${row.name}的信息?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.userTableData.forEach((item, index) => {
                        if (row.uuid === item.uuid) {
                            this.userTableData.splice(index, 1);
                            localStorage.setItem("userTableData", JSON.stringify(this.userTableData));
                            this.getTableData()
                            this.$message.success("删除成功!")
                        }
                    });
                })
            },
            // 关闭弹框
            cancelDialog() {
                this.dialogVisible = false
            },
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .data-container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        background-color: #f6f6f6;
    }
    
    .data-container .header-item {
        width: 100%;
        height: 50px;
        font-size: 14px;
        color: #fff;
        box-sizing: border-box;
        padding: 0 20px;
        line-height: 50px;
        background: linear-gradient(to right, rgb(55, 105, 245), rgb(172, 171, 241));
    }
    
    .main {
        height: 100%;
        display: flex;
        flex-direction: column;
        padding: 20px;
    }
    
    .main .search-item {
        background-color: #fff;
        padding-top: 10px;
        padding-right: 20px;
        margin-bottom: 10px;
    }
    
    .main .main-container {
        padding: 0 20px 20px;
        background-color: #fff;
    }
    
    .main-container .page-item {
        margin-top: 10px;
        text-align: center;
    }
</style>