<script>
    import { ElMessage } from 'element-plus';

    export default {
        name: 'ApiManage',

        data() {
            return {
                id:'',
                path:'',//搜索框的API path
                apiname:'',

                api:{},//某个API

                //被选择要删除的API
                selectedapis:[],

                //所有权限,未分组
                allfunctions1:[] ,
                //所有权限,分组
                allfunctions:[] ,
                allfunctions1: [{
                    id: 1,
                    name: '一级 1',
                    parent:null
                },
                    {
                        id: 4,
                        name: '二级 1-1',
                        parent:2
                    },
                      {
                            id: 9,
                            name: '三级 1-1-1',
                          parent:3
                      },
                    {
                            id: 10,
                            name: '三级 1-1-2',
                        parent:5
                        },
                     {
                         id: 2,
                         name: '一级 2',
                         parent:null
                     },
                    {
                        id: 5,
                        name: '二级 2-1',
                        parent:2
                    },
                    {
                        id: 6,
                        name: '二级 2-2',
                        parent:2
                    },
                   {
                    id: 3,
                    name: '一级 3',
                       parent:null
                   },
                   {
                        id: 7,
                        name: '二级 3-1',
                       parent:3
                    }, {
                        id: 8,
                        name: '二级 3-2',
                        parent:3
                    }],
                tableData:[
                            {
                                id: 5,
                                name: '创建用户',
                                status:'r',
                                path:'dsfg',
                                addTime:'  '
                            },
                            {
                                id: 2,
                                name: '创建用户',
                                status:'r',
                                path:'dsfg',
                                addTime:'  '
                            },
                            {
                                id: 11,
                                name: '创建用户',
                                status:'r',
                                path:'dsfg',
                                addTime:'  '
                            },
                            {
                                id: 12,
                                name: '创建用户',
                                status:'r',
                                path:'dsfg',
                                addTime:'  '
                            },
                            {
                                id: 13,
                                name: '创建用户',
                                status:'r',
                                path:'dsfg',
                                addTime:'  '
                            },
                            {
                                id: 14,
                                name: '创建用户',
                                status:'r',
                                path:'dsfg',
                                addTime:'  '
                             },
                        ],

                addstatus:'r',
                addApiFunction:[],

                //tableData: [],
                thisapiFunctions:[],
                thisapiFunctions1:[],
                newapi:{},
                AddapiDialogFormVisible:false,
                FunctionDialogFormVisible:false,
                infodialogFormVisible:false,

                treeProps: {
                    label: 'name', // 作为对应节点的名字显示
                },

                //分页查询
                pageNum:1,
                pageSize:5,
                total:6,
            }
        },

        created() {
            this.loadAllFunctions()
            this.load()
        },
        methods : {

            loadAllFunctions()
            {
                this.$request.get('http://127.0.0.1:8000/api/v1/permission').then((res)=>{
                    if(res.data.code==200)
                    {
                        this.allfunctions1 = res.data.data
                           this.allfunctions = this.allfunctions1
                           this.allfunctions = this.buildTree(this.allfunctions1,null)
                    }
                    else
                    {
                        ElMessage({
                            showClose:true,
                            message:res.data.message,
                            type:'error'
                        })
                    }
                })
            },

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
            //树形到集合(无用)
            treeToList (data,id) {
                //console.log(id)
                //console.log(data)
                for (let i = 0; i < this.count(data); i++) {
                    if(data[i].id==id){
                        this.outList.push(id)
                        for(let j = 0;j<this.count(data[i].children);j++)
                            this.treeToList(data, data[i].children[j].id)
                        break
                    }
                }
            },
            //计数
            count(o){
                let n = 0;
                for(let i in o){
                    n++;
                }
                return n;
            },

            //分页加载所有API
            load() {
                // 请求分页查询
                this.$request.get('http://127.0.0.1:8000/api/v1/permission/api/page', {
                    params:{
                        pageNum :this.pageNum,
                        pageSize :this.pageSize,
                        path :this.path,
                        name :this.apiname
                    }
                }).then((res) => {
                    console.log(res)
                    if (res.data.code == 200) {
                        ElMessage({
                            showClose:true,
                            message:res.data.message,
                            type:'success'
                        })
                        this.tableData = res.data.data.records
                        console.log(this.tableData)
                        this.total = res.data.data.total
                        console.log(this.total)
                    } else {
                        ElMessage({
                            showClose:true,
                            message:res.data.message,
                            type:'error'
                        })
                    }
                })
            },

            searchAll()
            {
                this.pageNum = 1
                this.load()
            },
            reset() {
                this.apiname = ''
                this.path = ''
            },
            //相应添加新API按钮
            handleAdd() {
                this.newapiFunctions = [];
                this.AddapiDialogFormVisible = true;
            },

            //确定添加此新API
            confirmHandleAdd() {

                //默认状态为true
                this.newapi.status = 'r';
                let newapi = this.newapi;
                this.$request.post('http://127.0.0.1:8000/api/v1/permission/api', newapi).then((res) => {

                    if (res.data.code == 200) {
                        //console.log(2222222222)
                        ElMessage({
                            showClose:true,
                            message:res.data.message,
                            type:'success'
                        })
                        //加载API
                        this.load();
                    } else {
                        ElMessage({
                            showClose:true,
                            message:res.data.message,
                            type:'error'
                        })
                    }
                })
            },

            //删除某个API
            deleteapi(id) {
                let Id = id
                console.log(id)
                this.$request.delete('http://127.0.0.1:8000/api/v1/permission/api/status', {
                    params: {
                        id:Id,
                    }}).then((res) => {
                    if (res.data.code == 200) {
                        ElMessage({
                            showClose:true,
                            message:res.data.message,
                            type:'success'
                        })
                        //加载API
                        this.load()
                    } else {
                        ElMessage({
                            showClose:true,
                            message:res.data.message,
                            type:'error'
                        })
                    }
                })
            },
            //批量删除API 完成
            delBatch() {
                const ids = this.selectedapis.map(v => v.id) // 将对象数组变成纯ID的数组
                console.log(this.multipleSelection)
                console.log(ids)
                this.$request.delete('http://127.0.0.1:8000/api/v1/permission/api/ids', {
                    params: {
                        ids:ids,
                    }
                }).then((res) => {
                    //console.log(res)
                    if (res.data.code == 200) {
                        ElMessage({
                            showClose:true,
                            message:res.data.message,
                            type:'success'
                        })
                        this.load()
                    } else {
                        ElMessage({
                            showClose:true,
                            message:res.data.message,
                            type:'error'
                        })
                    }
                })
            },

            handleSelectionChange(val) {
                this.selectedapis = val;
            },

            handleEditapiInformation(row) {
                this.api = {};
                this.api.id = row.id
                this.infodialogFormVisible = true;
                this.api.name = row.name;
                this.api.path = row.path;
                this.api.status = row.status
                this.api.addTime =row.addTime
            },

            //更新api基本信息
            updateapiInfo() {
                let api = this.api
                //this.api.required_functions = this.thisapiFunctions
                this.$request.put('http://127.0.0.1:8000/api/v1/permission/api/status',api).then((res) => {
                    if (res.data.code == 200) {
                        ElMessage({
                            showClose:true,
                            message:res.data.message,
                            type:'success'
                        })
                        this.load();
                    } else {
                        ElMessage({
                            showClose:true,
                            message:res.data.message,
                            type:'error'
                        })
                    }
                })
            },

            //添加api权限
            addapiInfo() {
                let addapiFunctions = this.addApiFunction
                for(let i = 0;i<this,count(this.addApiFunction);i++)
                {
                    addapiFunctions.push({functionid:this.addApiFunction[i],rw_type:this.addstatus})
                }
                console.log(this.addpiFunctions)
                this.$request.post('http://127.0.0.1:8000/api/v1/permission/api/function',addpiFunctions).then((res) => {
                    if (res.data.code == 200) {
                        ElMessage({
                            showClose:true,
                            message:res.data.message,
                            type:'success'
                        })
                        this.load();
                    } else {
                        ElMessage({
                            showClose:true,
                            message:res.data.message,
                            type:'error'
                        })
                    }
                })
            },

            //加载一个api的权限
            loadThisapiFunction() {
                // 获得当前API所拥有的权限
                console.log(this.id)
                this.$request.get('http://127.0.0.1:8000/api/v1/permission/api/status', {
                    params: {
                        id: this.id,
                    },
                }).then((res) => {
                    if (res.data.code == 200) {
                        this.thisapiFunctions = res.data.data.required_functions
                        this.thisapiFunctions1 = res.data.data.required_functions
                        ElMessage({
                            showClose:true,
                            message:res.data.message,
                            type:''
                        })
                    } else {
                        ElMessage({
                            showClose:true,
                            message:res.data.message,
                            type:'error'
                        })
                    }
                })
            },

            //弹出编辑权限对话框
            handleManageFunction(row) {
                this.addstatus =  'r',
                this.id = row.id;
                this.FunctionDialogFormVisible = true;
                this.loadThisapiFunction();
                this.api.id = this.id
                this.api.name = row.name;
                this.api.path = row.path;
                this.api.status = row.status
                this.api.addTime =row.addTime
            },

            // 删除当前API所拥有的某个权限
            delfunction(row) {
                //当前处于this.id
                this.$request.delete('http://127.0.0.1:8000/api/v1/permission/api/function', {
                    params: {
                        id: this.id,
                        functionId: row.id,
                        rw_type:row.rw_type,
                    },
                }).then((res) => {
                    if (res.data.code == 200) {
                        this.$message.success(res.data.message)
                        this.loadThisapiFunction()
                    } else {
                        this.$message.error(res.data.message)
                    }
                })
            },

            cancelEditFunctionInfo() {
                this.FunctionDialogFormVisible = false;
                this.thisapiFunctions = []
                this.thisapiFunctions1 = []
            },
            //检测该权限是否已经在数据库中
            check(row) {
                if (this.thisapiFunctions1.includes(row)) {
                    return true;
                } else {
                    return false;
                }
            },

            //分页查询页面变化
            handleSizeChange(pageSize) {
                //console.log(pageSize)
                this.pageSize = pageSize
                this.load()
            },
            handleCurrentChange(pageNum) {
                this.pageNum = pageNum
                this.load()
                //
            },
        }

    }
</script>

<template>
    <div>
        <div style="text-align: left">
            <el-input v-model="apiname" style="width: 200px;margin-right: 10px ;" suffix-icon="api" placeholder="请输入apiname" />
            <el-input v-model="path" style="width: 200px;margin-right: 10px ;" suffix-icon="api" placeholder="请输入path" />
            <el-button type="primary" style="margin-left: 20px" @click="searchAll()">
                <el-icon><Search /></el-icon>搜索
            </el-button>
            <el-button type="warning" @click="reset()">
                <el-icon><Minus /></el-icon>重置
            </el-button>
        </div>
        <div style="text-align: left ;margin-top: 10px;margin-bottom: 10px">
            <el-button type="primary" @click="handleAdd()">
                <el-icon style="margin-right: 10px">
                    <Star />
                </el-icon>添加新API<i class="el-icon-circle-plus-outline" style="margin-left: 5px" />
            </el-button>
            <el-popconfirm
                    style="margin-left: 5px"
                    confirm-button-text="yes"
                    cancel-button-text="No"
                    icon-color="#626AEF"
                    title="Are you sure to delete this?"
                    @confirm="delBatch()"
            >
                <template #reference>
                    <el-button slot="reference" type="danger">
                        <el-icon style="margin-right: 10px">
                            <CloseBold />
                        </el-icon>批量删除<i class="el-icon-delete" style="margin-left: 5px " />
                    </el-button>
                </template>
            </el-popconfirm>
        </div>
        I
        <el-table :data="tableData" border stripe :header-cell-class-name="headerBg" @selection-change="handleSelectionChange">
            <el-table-column type="selection" align="center" width="40" />
            <el-table-column prop="id" align="center" label="id" width="80"  />
            <el-table-column prop="name" align="center" label="API名称" width="100" />I
            <el-table-column prop="path" align="center" label="path" width="400" />
            <el-table-column prop="addTime" align="center" label="最初添加时间" width="200" />
            <el-table-column align="center" label="编辑API信息" width="110">
                <template #default="{ row, $index }">
                    <el-button type="primary" round @click="handleEditapiInformation(row)">
                        <el-icon style="color: #55e0e5 ;margin-right: 10px">
                            <Edit />
                        </el-icon>编辑
                    </el-button>
                </template>
            </el-table-column>

            <el-table-column align="center" label="操作">
                <template #default="{ row, $index }">
                    <el-button type="success" round @click="handleManageFunction(row)">
                        <el-icon style="margin-right: 10px">
                            <Menu />
                        </el-icon>权限管理
                    </el-button>
                    <el-popconfirm
                            style="margin-left: 5px"
                            confirm-button-text="yes"
                            cancel-button-text="No"
                            icon-color="#626AEF"
                            title="Are you sure to delete this?"
                            @confirm="deleteapi(row.id)"
                    >
                        <template #reference>
                            <el-button slot="reference" type="danger" round >
                                <el-icon style="margin-right: 10px">
                                    <DeleteFilled />
                                </el-icon>删除
                            </el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog v-model="infodialogFormVisible" title="API信息" width="40%">
            <el-form v-model = "api" label-width="80px">
                <el-form-item label="API名" :label-width="formLabelWidth">
                    <el-input v-model="api.name" autocomplete="off" />
                </el-form-item>
                <el-form-item label="path">
                    <el-input v-model="api.path" autocomplete="off" />
                </el-form-item>
                <el-form-item prop="status" label="状态" :label-width="formLabelWidth">
                    <el-radio-group v-model="api.status">
                        <el-radio label='r'>可用</el-radio>
                        <el-radio label='s'>不可用</el-radio>
                    </el-radio-group>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="infodialogFormVisible = false">
                    取 消
                </el-button>
                <el-button type="success" @click="updateapiInfo()">
                    确 定
                </el-button>
            </div>
        </el-dialog>

        <el-dialog v-model="AddapiDialogFormVisible" title="添加新API" width="40%">
            <el-form label-width="80px">
                <el-form-item label="API名" :label-width="formLabelWidth">
                    <el-input v-model="newapi.name" autocomplete="off" />
                </el-form-item>
                <el-form-item label="path" :label-width="formLabelWidth">
                    <el-input v-model="newapi.path"/>
                </el-form-item>
                <el-form-item prop="status" label="状态" :label-width="formLabelWidth">
                    <el-radio-group v-model="newapi.status">
                        <el-radio label='r'>可用</el-radio>
                        <el-radio label='s'>不可用</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="AddapiDialogFormVisible = false">
                    取 消
                </el-button>
                <el-button type="success" @click="confirmHandleAdd()">
                    确 定
                </el-button>
            </div>
        </el-dialog>

        <el-dialog v-model="FunctionDialogFormVisible" title="API权限管理" width="40%">
            <el-form style="text-align: left">
                <el-radio-group v-model="addstatus">
                    <el-radio label='r'>可读</el-radio>
                    <el-radio label='w'>可写</el-radio>
                    <el-radio label='a'>可读写</el-radio>
                </el-radio-group>
                <el-form-item label="管理权限" >
                    <el-tree-select
                            :props = "treeProps"
                            v-model="addApiFunction"
                            value-key="id"
                            :data="allfunctions"
                            multiple
                            :render-after-expand="false"
                            show-checkbox
                            check-strictly
                            check-on-click-node
                    />
                </el-form-item>
            </el-form>

            <el-table :data="thisapiFunctions" style="width: 100%;margin-bottom: 50px" border stripe :header-cell-class-name="headerBg">
                <el-table-column prop="id" align="center" label="FunctionId" />
                <el-table-column prop="name" align="center" label="Name" width="180" />
                <el-table-column prop="key" align="center" label="Key" width="180" />
                <el-table-column prop="status" align="center" label="Status" />
                <el-table-column align="center" label="操作">
                    <template #default="{ row, $index }">
                        <el-popconfirm
                                style="margin-left: 5px"
                                confirm-button-text="yes"
                                cancel-button-text="No"
                                icon-color="#626AEF"
                                title="Are you sure to delete this?"
                                @confirm="delfunction(row)"
                        >
                            <template #reference>
                                <el-button v-if = "check(row)" slot="reference" type="danger" round >
                                    <el-icon style="margin-right: 10px">
                                        <DeleteFilled />
                                    </el-icon>删除
                                </el-button>
                                <el-button v-else slot="reference" type="danger" round disabled>
                                    <el-icon style="margin-right: 10px">
                                        <DeleteFilled />
                                    </el-icon>删除
                                </el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button type="success" @click="addapiInfo()()">
                    确 定
                </el-button>
                <el-button @click="cancelEditFunctionInfo()">
                    退出
                </el-button>
            </div>
        </el-dialog>

        <!--    下面为页面转换按钮 -->
        <div style="padding: 10px 0">
            <el-pagination
                    :current-page="pageNum"
                    :page-sizes="[2, 5, 10, 20]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
            />
        </div>
    </div>
</template>

<style>
    .headerBg{
        background: #55e0e5!important;
    }
</style>

<style lang="scss" scoped>

</style>
