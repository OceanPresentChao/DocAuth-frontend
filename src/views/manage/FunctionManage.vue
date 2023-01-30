<template>
    <div style = "height:450px">
            <p>权限管理</p>
            <el-tree
                    :props = "treeProps"
                    style = "height:50px"
                    :data="allfunctions"
                    node-key="id"
                    :expand-on-click-node="false"
                    :render-content="renderContent">
            </el-tree>

        <el-dialog  v-model="dialog1" title="增加权限基本信息" width="40%">
            <el-form ref = "newFunction" :rules = "rules" :model =  "newFunction" label-width="80px">
                <el-form-item prop = "name" label="权限名" :label-width="formLabelWidth">
                    <el-input v-model="newFunction.name" autocomplete="off" />
                </el-form-item>

                <el-form-item prop="status" label="状态" :label-width="formLabelWidth">
                    <el-radio-group v-model="newFunction.status">
                        <el-radio label="r">可用</el-radio>
                        <el-radio label="s">不可用</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item  prop = "key" label="key" :label-width="formLabelWidth">
                    <el-input v-model="newFunction.key"/>
                </el-form-item>


                <el-form-item prop="rw_type" label="读写类型" :label-width="formLabelWidth">
                <el-radio-group v-model="newFunction.rw_type">
                    <el-radio label="r">可读</el-radio>
                    <el-radio label="s">可写</el-radio>
                    <el-radio label="a">可读写</el-radio>
                </el-radio-group>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialog1= false">
                    取 消
                </el-button>
                <el-button type="success" @click="addFunction()">
                    确 定
                </el-button>
            </div>
        </el-dialog>

        <el-dialog  v-model="dialog2" title="权限基本信息" width="40%">
            <el-form ref ="Ffunction" :rules = "rules" :model= "Ffunction" label-width="80px">
                <el-form-item prop="name" label="权限名" :label-width="formLabelWidth">
                    <el-input v-model="Ffunction.name" autocomplete="off" />
                </el-form-item>

                <el-form-item prop="status" label="状态" :label-width="formLabelWidth">
                    <el-radio-group v-model="Ffunction.status">
                        <el-radio label="r">可用</el-radio>
                        <el-radio label="s">不可用</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item prop ="key" label="key" :label-width="formLabelWidth">
                    <el-input v-model="Ffunction.key"/>
                </el-form-item>

                <el-form-item prop ="rw_type" label="读写类型" :label-width="formLabelWidth">
                    <el-radio-group v-model="Ffunction.rw_type">
                        <el-radio label="r">可读</el-radio>
                        <el-radio label="s">可写</el-radio>
                        <el-radio label="a">可读写</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="添加时间" :label-width="formLabelWidth">
                    <el-tag>{{Ffunction.addTime}}</el-tag>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialog2= false">
                    退出
                </el-button>
                <el-button type="success" @click="changeFunctionInfo()">
                    点击修改
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>


    import {ElMessage,ElMessageBox} from "element-plus";
    //import { ElMessage, ElMessageBox } from 'element-plus'

    let id = 1000;

    export default {
        data() {


            // const data = [{
            //     id: 1,
            //     name: '一级 1',
            //     children: [{
            //         id: 4,
            //         name: '二级 1-1',
            //         children: [{
            //             id: 9,
            //             name: '三级 1-1-1'
            //         }, {
            //             id: 10,
            //             name: '三级 1-1-2'
            //         }]
            //     }]
            // }, {
            //     id: 2,
            //     name: '一级 2',
            //     children: [{
            //         id: 5,
            //         name: '二级 2-1'
            //     }, {
            //         id: 6,
            //         name: '二级 2-2'
            //     }]
            // }, {
            //     id: 3,
            //     name: '一级 3',
            //     children: [{
            //         id: 7,
            //         name: '二级 3-1'
            //     }, {
            //         id: 8,
            //         name: '二级 3-2'
            //     }]
            // }];
            return {
                //data: JSON.parse(JSON.stringify(data)),
                dialog1: false,
                dialog2: false,

                // allFunctions1: [{
                //     id: 1,
                //     name: '一级 1',
                //     parent:null
                // },
                //     {
                //         id: 4,
                //         name: '二级 1-1',
                //         parent:2
                //     },
                //       {
                //             id: 9,
                //             name: '三级 1-1-1',
                //           parent:3
                //       },
                //     {
                //             id: 10,
                //             name: '三级 1-1-2',
                //         parent:5
                //         },
                //      {
                //          id: 2,
                //          name: '一级 2',
                //          parent:null
                //      },
                //     {
                //         id: 5,
                //         name: '二级 2-1',
                //         parent:2
                //     },
                //     {
                //         id: 6,
                //         name: '二级 2-2',
                //         parent:2
                //     },
                //    {
                //     id: 3,
                //     name: '一级 3',
                //        parent:null
                //    },
                //    {
                //         id: 7,
                //         name: '二级 3-1',
                //        parent:3
                //     }, {
                //         id: 8,
                //         name: '二级 3-2',
                //         parent:3
                //     }],

                allFunctions1:[],
                allfunctions: [],

                outList:[],

                //newChild: {},
                Ffunction: {},

                nowData: {}, //现在的data

                newFunction: {},

                rules: {
                    name: [
                        {required: true, message: '请输入权限名称', trigger: 'blur'},
                    ],
                    key: [
                        {required: true, message: '请输入key', trigger: 'blur'},
                    ],
                    status: [
                        { required: true, message: '请选择状态', trigger: 'blur' },
                    ],
                    rw_type: [
                        { required: true, message: '请选择读写类型', trigger: 'blur' },
                    ],
                },

                treeProps: {
                    label: 'name', // 作为对应节点的名字显示
                }
            }
        },
        created()
        {
            this.loadAllFunction()
        }
        ,

            methods: {
            //加载权限
                loadAllFunction()
                 {
                    this.$request.get('http://127.0.0.1:8000/api/v1/permission').then((res) => {
                        if (res.data.code == 200) {
                            this.allFunctions1 = res.data.data
                             this.allfunctions = this.buildTree(this.allFunctions1, null)
                    console.log(this.allfunctions)
                        } else {
                            ElMessage({
                                showClose: true,
                                message: res.data.message,
                                type: 'error'
                            })
                        }
                    })
                }
            ,
                //建树
                buildTree(data, parent)
                {
                    let tree = []
                    let temp
                    for (let i = 0; i < this.count(data); i++) {
                        if (data[i].parent == parent) {
                            let obj = data[i];
                            temp = this.buildTree(data, data[i].id)
                            if (temp.length > 0) {
                                obj.children = temp
                            }
                            tree.push(obj);
                        }
                    }
                    return tree
                }
                ,
                //树形到集合
                treeToList (data,id) {
                    console.log(id)
                    console.log(data)
                    for (let i = 0; i < this.count(data); i++) {
                        if(data[i].id==id){
                            this.outList.push(id)
                            for(let j = 0;j<this.count(data[i].children);j++)
                            this.treeToList(data, data[i].children[j].id)
                            break
                        }
                    }
                },
                count(o){
                   let n = 0;
                   for(let i in o){
                       n++;
                   }
                   return n;
                 },
                //增加子节点
                append(data)
                {

                    this.dialog1 = true
                    //console.log('你是猪')
                    this.newFunction = {}
                    this.newFunction.status = 'r'
                    this.newFunction.rw_type = 'r'
                    //this.nowData = data
                    this.newFunction.parent = data.id
                }
            ,

                //删除权限（包括子权限）
                remove(node, data)
                {
                    ElMessageBox.confirm(
                        '此操作将永久删除该权限以及他的子权限, 是否继续?',
                        'Warning',
                        {
                            confirmButtonText: 'OK',
                            cancelButtonText: 'Cancel',
                            type: 'warning',
                        }
                    ).then(() => {
                        //console.log('ok')
                        //console.log(data.id)
                        this.outList = []
                        //this.outList.push(data.id)
                        this.treeToList(this.allFunctions1,data.id)
                        let ids = this.outList
                        console.log(ids)
                        this.$request.delete('http://127.0.0.1:8000/api/v1/permission/delList',{
                            params:{
                                ids:ids
                            }
                        }).then((res) => {
                            if (res.data.code == 200) {
                                ElMessage({
                                    showClose: true,
                                    message: res.data.message,
                                    type: 'success'
                                })
                                this.loadAllFunction()
                            } else {
                                ElMessage({
                                    showClose: true,
                                    message: res.data.message,
                                    type: 'error'
                                })
                            }
                          })

                        })
                        // .catch(() => {
                        //     ElMessage({
                        //         type: 'info',
                        //         message: '取消删除',
                        //     })
                        // })
                }
                ,

                editFunctionInfo(data)
                {
                    this.dialog2 = true
                    this.Ffunction.id = data.id
                    this.Ffunction.name = data.name
                    this.Ffunction.status = data.status
                    this.Ffunction.rw_type = data.rw_type
                    this.Ffunction.parent = data.parent
                    this.Ffunction.addTime = data.addTime
                    this.Ffunction.key = data.key
                }
            ,
                changeFunctionInfo()
                {
                    let Function = this.Ffunction
                    this.$request.put('http://127.0.0.1:8000/api/v1/permission/status',{Function}).then((res) => {
                        if (res.data.code == 200) {
                            ElMessage({
                                showClose: true,
                                message: res.data.message,
                                type: 'success'
                            })
                            this.dialog2 = false
                            this.loadAllFunction()

                        } else {
                            ElMessage({
                                showClose: true,
                                message: res.data.message,
                                type: 'error'
                            })
                        }
                    })

                }
                ,
                addFunction()
                {
                    let Function = this.newFunction
                    console.log(Function)

                    this.$request.post('http://127.0.0.1:8000/api/v1/permission',{Function}).then((res) => {
                        if (res.data.code == 200) {
                            ElMessage({
                                showClose: true,
                                message: res.data.message,
                                type: 'success'
                            })
                            this.dialog1 = false
                            this.loadAllFunction()
                        } else {
                            ElMessage({
                                showClose: true,
                                message: res.data.message,
                                type: 'error'
                            })
                        }
                    })
                }
                ,

                renderContent(h, {node, data, store,})
                {
                    return h(
                        'span',
                        {
                            class: 'custom-tree-node',
                        },
                        h('span', null, node.label),
                        h(
                            'span',
                            null,
                            h(
                                'a',
                                {
                                    onClick: () => this.append(data),
                                },
                                '增加子权限'
                            ),
                            h(
                                'a',
                                {
                                    style: 'margin-left: 8px',
                                    onClick: () => this.remove(node, data),
                                },
                                '删除'
                            ),
                            h(
                                'a',
                                {
                                    style: 'margin-left: 8px',
                                    onClick: () => this.editFunctionInfo(data),
                                },
                                '编辑'
                            )
                        )
                    )
                }
            }
    }
</script>

<style>
    .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 8px;
    }
</style>