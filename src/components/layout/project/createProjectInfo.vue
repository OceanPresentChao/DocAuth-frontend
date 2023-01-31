<template>
    <div>
        <el-dialog v-model="AddProjectDialogFormVisible" title="添加新项目" width="40%">
            <el-form ref = "newProject" :model= "newProject" :rules = "rules" label-width="80px">
                <el-form-item prop = "projectName" label="项目名称">
                    <el-input  v-model="newProject.projectName" />
                </el-form-item>
                <el-form-item prop = "desc"  label = "概述" >
                    <el-input v-model="newProject.desc"/>
                </el-form-item>
                <el-form-item label="启动？"  >
                    <el-switch  v-model="newProject.status" active-color="#13ce66" inactive-color="#ccc" />
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancelCreate">
                    取 消
                </el-button>
                <el-button type="success" @click="confirmCreate">
                    确 定
                </el-button>
            </div>
        </el-dialog>
    </div>
    
</template>

<script>
    import {ElMessage} from "element-plus";

    export default {
        name:'createProjectInfo',
        data(){
            return {
                AddProjectDialogFormVisible:true,
                newProject:{},
                projectId:0,

                rules:{
                    desc: [
                        { required: true, message: '请输入项目概况', trigger: 'blur' },
                    ],
                    projectName: [
                        { required: true, message: '请输入项目名称', trigger: 'blur' },
                    ],
                }
            }

        },
        created()
        {
            //清空
            this.newProject = {}
        },
        methods:{
            // handleCreate()
            // {
            //     this.AddProjectDialogFormVisible = true
            // },
            confirmCreate(){

                this.$refs['newProject'].validate((valid) => {
                    if (valid) {
                        if (this.newProject.status == true) {
                            this.newProject.status = 'r'
                        } else {
                            this.newProject.status = 's'
                        }
                        this.$request.post('/django/business/new', {
                            body: {
                                "projectName": this.newProject.name,
                                "desc": this.newProject.desc,
                                "status": this.newProject.status
                            }
                        }).then((res) => {
                            if (res.code == 200) {
                                ElMessage({
                                    showClose: true,
                                    message: res.message,
                                    type: 'success'
                                })
                                this.projectId = res.data
                            } else {
                                ElMessage({
                                    showClose: true,
                                    message: res.message,
                                    type: 'error'
                                })
                            }

                        })
                    }
                })
            },
            cancelCreate()
            {
                //取消创建
                //需要跳转到父组件
            }
        }
    }

</script>

<style scoped>

</style>