<!--
 * @Author: xingtao
 * @Date: 2021-12-05 13:15:28
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-12-05 20:54:12
 * @Descripttion: 搜索页
 * @FilePath: \share\share\VueCliExample\src\components\SearchItem.vue
-->
<template>
  <div>
    <div class="filter-option">
      已选条件：
      <el-tag
        v-for="(item,index) in filterOption"
        style="margin-right: 10px;"
        size="medium"
        closable
        @close="handleClose(item.key)">
          {{ item.label }} : {{ item.value }}
      </el-tag>
    </div>
    <el-row :gutter="20">
      <el-col :span="20">
        <el-form :inline="true" :model="listQuery" class="demo-form-inline" ref="form" label-width="100px">
            <el-form-item label="姓名">
              <el-input v-model="listQuery.name" style="width: 100%;" @keyup.enter.native="handleSearch" clearable placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-select v-model="listQuery.sex" clearable placeholder="请选择性别">
                <el-option
                  v-for="(value, key) in sexMapping"
                  :label="value"
                  :value="key">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
      </el-col>
        <el-col :span="4" align="right">
          <el-button size="medium" type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
          <el-button size="medium" type="info" icon="el-icon-refresh-left" @click="handleRefresh">重置</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    export default {
        name: 'SearchItem',
        props: {
            sexMapping: {
                type: Object,
                default: () => {}
            }
        },
        data() {
            return {
                keyword: null,
                queryMapping: {
                    name: "姓名",
                    sex: "性别",
                },
                listQuery: {
                    name: "",
                    sex: "",
                }
            }
        },
        computed: {
            filterOption: function() {
                let arr = []
                for (let key in this.listQuery) {
                    if (this.listQuery[key]) {
                        if (key === "sex") {
                            arr.push({
                                label: this.queryMapping[key],
                                key: key,
                                value: this.sexMapping[this.listQuery[key]],
                            })
                        } else {
                            arr.push({
                                label: this.queryMapping[key],
                                key: key,
                                value: this.listQuery[key],
                            })
                        }
                    }
                }
                return arr;
            }
        },
        created() {},
        methods: {
            // 删除单个已选条件
            handleClose(key) {
                this.listQuery[key] = null
            },

            // 搜索
            handleSearch() {
                this.$emit("sendListQuery", this.listQuery)
            },

            // 重置
            handleRefresh() {
                this.listQuery = {
                    name: "",
                    sex: "",
                }
                this.$emit("sendListQuery", this.listQuery)
            }
        }
    }
</script>

<style scoped>
    .filter-option {
        height: 40px;
        padding-left: 20px;
        display: flex;
        font-size: 14px;
        color: #777;
        align-items: center;
    }
</style>