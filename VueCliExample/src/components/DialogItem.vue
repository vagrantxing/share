<!--
 * @Author: xingtao
 * @Date: 2021-12-05 14:37:36
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-12-05 21:02:53
 * @Descripttion: 弹框--新增/编辑
 * @FilePath: \share\share\VueCliExample\src\components\DialogItem.vue
-->

<template>
  <div>
      <el-form :model="listQuery" ref="form" :rules="rules"  label-width="100px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="listQuery.name" style="width: 90%;" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nikeName">
          <el-input v-model="listQuery.nikeName" style="width: 90%;" placeholder="请输入昵称"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="listQuery.sex" style="width: 90%;" placeholder="请选择性别">
            <el-option
              v-for="(value, key) in sexMapping"
              :label="value"
              :value="key">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" prop="birthday">
            <el-date-picker
              v-model="listQuery.birthday"
              type="date"
              style="width: 90%;"
              placeholder="请选择出生日期">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="身高" prop="height">
          <el-input v-model="listQuery.height" style="width: 90%;" placeholder="请输入身高"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="listQuery.phone" style="width: 90%;" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="listQuery.address" style="width: 90%;" placeholder="请输入地址"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="listQuery.email" style="width: 90%;" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="爱好" prop="hobby">
          <el-select v-model="listQuery.hobby" style="width: 90%;" placeholder="请选择爱好">
            <el-option
              v-for="(value, key) in hobbyMapping"
              :label="value"
              :value="key">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="listQuery.hobby == 3" label="其他爱好" prop="otherHobby">
          <el-input v-model="listQuery.otherHobby" style="width: 90%;" placeholder="请输入其他爱好"></el-input>
        </el-form-item>
        <el-form-item style="text-align: center;">
            <el-button size="medium" type="primary" @click="submitForm('form')">确定</el-button>
            <el-button size="medium" type="info" @click="cancelSubmit">取消</el-button>
        </el-form-item>
      </el-form>
  </div>
</template>

<script>
    export default {
        name: 'DialogItem',
        props: {
            sexMapping: {
                type: Object,
                default: () => {}
            },
            hobbyMapping: {
                type: Object,
                default: () => {}
            },
            userInfo: {
                type: Object,
                default: () => {}
            }
        },
        data() {
            return {
                listQuery: {
                    uuid: null,
                    name: null,
                    nikeName: null,
                    sex: null,
                    birthday: null,
                    height: null,
                    phone: null,
                    address: null,
                    email: null,
                    hobby: null,
                    otherHobby: null,
                },

                rules: {
                    name: [{
                        required: true,
                        message: '请输入姓名',
                        trigger: 'blur'
                    }, {
                        min: 2,
                        max: 5,
                        message: '长度在 3 到 5 个字符',
                        trigger: 'blur'
                    }],
                    sex: [{
                        required: true,
                        message: '请选择性别',
                        trigger: 'blur'
                    }],
                    email: [{
                        required: true,
                        message: '请输入邮箱地址',
                        trigger: 'blur'
                    }, {
                        type: 'email',
                        message: '请输入正确的邮箱地址',
                        trigger: ['blur', 'change']
                    }],
                    otherHobby: [{
                        required: true,
                        message: '请输入爱好',
                        trigger: 'blur'
                    }]
                }
            }
        },

        created() {
            this.$nextTick(() => {
                if (this.userInfo.uuid) {
                    for (let key in this.listQuery) {
                        this.listQuery[key] = this.userInfo[key]
                    }
                } else {
                    this.listQuery.uuid = this.getUuid()
                }
            })
        },
        mounted() {

        },
        methods: {
            // 前端生成UUID
            getUuid() {
                var s = [];
                var hexDigits = "0123456789abcdef";
                for (var i = 0; i < 36; i++) {
                    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
                }
                s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
                s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
                s[8] = s[13] = s[18] = s[23] = "-";

                var uuid = s.join("");
                return uuid;
            },

            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        const userTableData = localStorage.getItem("userTableData");
                        let tableData = JSON.parse(userTableData) || [];
                        if (this.userInfo.uuid) {
                            tableData.forEach((item, index) => {
                                if (item.uuid === this.userInfo.uuid)
                                    tableData.splice(index, 1, this.listQuery)
                            })
                        } else {
                            tableData.push(this.listQuery)
                        }
                        localStorage.setItem("userTableData", JSON.stringify(tableData));
                        this.$message.success(`${this.userInfo.uuid ? '编辑' : '新增'}成功!`);
                        this.$emit("successDialog");
                        this.cancelSubmit();
                    }
                });
            },
            cancelSubmit() {
                this.$emit("cancelDialog")
            }
        }
    }
</script>