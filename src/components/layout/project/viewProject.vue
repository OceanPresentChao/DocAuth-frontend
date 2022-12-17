<template>
    <el-radio-group v-model="tabPosition" style="margin-bottom: 5px">
        <el-radio-button label="top">top</el-radio-button>
        <el-radio-button label="right">right</el-radio-button>
        <el-radio-button label="bottom">bottom</el-radio-button>
        <el-radio-button label="left">left</el-radio-button>
    </el-radio-group>
    <div id="nowNewProject">
        <el-tabs
                v-model="editableTabsValue"
                type="card"
                class="demo-tabs"
                :tab-position="tabPosition"
                style="height: 1000px"
        >
            <el-tab-pane
                    v-for="item in editableTabs"
                    :key="item.name"
                    :label="item.title"
                    :name="item.name"
            >
                <TreeChart :json="item.content" :class="{landscape: 1}" @click-node="clickNode" />
            </el-tab-pane>
        </el-tabs>

        <div class="gl_prs_ctn" :style='[contextstyle]'>
            <ul class='gl_prs_li'>
                <li ><el-button type="primary" @click="">进入任务 </el-button></li>
                <li ><el-button type="success" @click="applyEmployees">重新编排</el-button></li>
                <li ><el-button type="info" @click="shutDown">关闭此栏</el-button></li>
            </ul>
        </div>

        <el-dialog v-model="dialogFormVisible" title="人员安排">
            <el-form :model="this.currentTask">
                <el-form-item label="任务名称" :label-width="formLabelWidth">
                    <el-input v-model="this.currentTask.name" autocomplete="off" />
                </el-form-item>
                <el-form-item label="任务持续时间" :label-width="formLabelWidth" >
                    <el-date-picker
                            v-model="this.currentTask.startTime"
                            type="datetime"
                            placeholder="任务开始时间"
                            style="margin-right: 50px"
                    />
                    <el-date-picker
                            v-model="this.currentTask.deadLine"
                            type="datetime"
                            placeholder="任务截止时间"
                    />
                </el-form-item>
                <el-form-item label="编" :label-width="formLabelWidth">
                    <el-select value-key="userid" v-model="this.currentTask.editPerson" :popper-append-to-body='false' placeholder="请选择人员" effect="dark">
                        <el-option v-for="item in users" :label="item.username" :key="item.userid" :value="item.userid" style="width: 100% ;color: #55e0e5"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="审" :label-width="formLabelWidth">
                    <el-select v-model="this.currentTask.investigatePerson" placeholder="请选择人员" effect="dark">
                        <el-option v-for="item in users" :label="item.username" :key="item.userid" :value="item.userid" style="width: 100% ;color: #55e0e5"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="批" :label-width="formLabelWidth">
                    <el-select v-model="this.currentTask.ratifyPerson" placeholder="请选择人员" effect="dark">
                        <el-option v-for="item in users" :label="item.username" :key="item.userid" :value="item.userid" style="width: 100% ;color: #55e0e5"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="会签" :label-width="formLabelWidth" >
                    <el-select v-model="this.currentTask.con_signPerson1" placeholder="请选择人员1" style="margin-right: 50px ;" effect="dark">
                        <el-option v-for="item in users" :label="item.username" :key="item.userid" :value="item.userid" style="width: 100% ;color: #55e0e5"></el-option>
                    </el-select>
                    <el-select v-model="this.currentTask.con_signPerson2" placeholder="请选择人员2" effect="dark">
                        <el-option v-for="item in users" :label="item.username" :key="item.userid" :value="item.userid" style="width: 100% ;color: #55e0e5"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="任务内容概述" :label-width="formLabelWidth">
                    <el-input v-model="this.currentTask.taskDescription" type="textarea" />
                </el-form-item>

            </el-form>
            <template #footer>
      <span class="dialog-footer">
        <el-button type="danger" @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmOneTaskApplication">
          确认
        </el-button>
      </span>
            </template>
        </el-dialog>


    </div>
</template>

<script>
    import TreeChart from "@/components/layout/treeNode/treeChart.vue";
    import { ElMessage } from 'element-plus'
    export default {
        name: 'viewProject',
        components: {
            TreeChart
        },
        data() {
            return {
                tabPosition: 'left',
                tabIndex :1,
                editableTabsValue: '1',
                editableTabs: [
                    {
                        title: 'Phase 1',
                        name: '1',
                        content: {
                            name: '1',
                            image_url: "https://static.refined-x.com/static/avatar.jpg",
                            thisId : 1,
                            fartherId : 0,
                            startTime: '',
                            deadLine: '',
                            editPerson: '',
                            investigatePerson: '',
                            ratifyPerson: '',
                            con_signPerson1: '',
                            con_signPerson2:'',
                            taskDescription:'',
                            //class: ["rootNode"],
                            children: [
                                {
                                    name: '2',
                                    image_url: "https://static.refined-x.com/static/avatar.jpg",
                                    thisId : 2 ,
                                    fartherId : 1 ,
                                    startTime: '',
                                    deadLine: '',
                                    editPerson: '',
                                    investigatePerson: '',
                                    ratifyPerson: '',
                                    con_signPerson1: '',
                                    con_signPerson2:'',
                                    taskDescription:'',
                                    children:[],
                                },
                                {
                                    name: '3',
                                    image_url: "https://static.refined-x.com/static/avatar.jpg",
                                    thisId : 3,
                                    fartherId : 1,
                                    children: [
                                        {
                                            name: '4',
                                            image_url: "https://static.refined-x.com/static/avatar.jpg",
                                            thisId : 4,
                                            fartherId : 3,
                                            startTime: '',
                                            deadLine: '',
                                            editPerson: '',
                                            investigatePerson: '',
                                            ratifyPerson: '',
                                            con_signPerson1: '',
                                            con_signPerson2:'',
                                            taskDescription:'',
                                            children:[],
                                        },
                                        {
                                            name: '5',
                                            image_url: "https://static.refined-x.com/static/avatar.jpg",
                                            thisId : 5,
                                            fartherId : 3,
                                            startTime: '',
                                            deadLine: '',
                                            editPerson: '',
                                            investigatePerson: '',
                                            ratifyPerson: '',
                                            con_signPerson1: '',
                                            con_signPerson2:'',
                                            taskDescription:'',
                                            children:[],
                                        },
                                        {
                                            name: '6',
                                            image_url: "https://static.refined-x.com/static/avatar.jpg",
                                            thisId : 6,
                                            fartherId : 3,
                                            startTime: '',
                                            deadLine: '',
                                            editPerson: '',
                                            investigatePerson: '',
                                            ratifyPerson: '',
                                            con_signPerson1: '',
                                            con_signPerson2:'',
                                            taskDescription:'',
                                            children:[],
                                        }
                                    ]
                                }
                            ]
                        },
                    },
                    {
                        title: 'Phase 2',
                        name: '2',
                        content: {
                            name: '7',
                            image_url: "https://static.refined-x.com/static/avatar.jpg",
                            thisId : 7,
                            fartherId : 0,
                            startTime: '',
                            deadLine: '',
                            editPerson: '',
                            investigatePerson: '',
                            ratifyPerson: '',
                            con_signPerson1: '',
                            con_signPerson2:'',
                            taskDescription:'',
                            //class: ["rootNode"],
                            children: [
                                {
                                    name: '8',
                                    image_url: "https://static.refined-x.com/static/avatar.jpg",
                                    thisId : 8 ,
                                    fartherId : 7 ,
                                    startTime: '',
                                    deadLine: '',
                                    editPerson: '',
                                    investigatePerson: '',
                                    ratifyPerson: '',
                                    con_signPerson1: '',
                                    con_signPerson2:'',
                                    taskDescription:'',
                                    children:[],
                                },
                                {
                                    name: '9',
                                    image_url: "https://static.refined-x.com/static/avatar.jpg",
                                    thisId : 9,
                                    fartherId : 7,
                                    children: []
                                }
                            ]
                        },
                    }
                ],
                dialogFormVisible:false,
                formLabelWidth:'140px',
                startTime:'',
                deadLine:'',
                currentTask:{},
                users:[
                    {
                        userid: 1,
                        username: "wser",
                        phone: '6465464654',
                        email: 'sdsadsa@qq.com',
                        regdate :'2022-11-24 21:14:31.000000',
                        password:'sasdsasadas',
                        gender:'男',
                        role:['wseber'],
                        enable:true,
                    },
                    {
                        userid: 2,
                        username: "jucy",
                        phone: '6465464654',
                        email: 'sdsadsa@qq.com',
                        regdate :'2022-11-24 21:14:31.000000',
                        password:'sasdsasadas',
                        gender:'男',
                        role:['wseber'],
                        enable:true,
                    },
                    {
                        userid: 3,
                        username: "oceanPresent",
                        phone: '6465464654sdfsfds',
                        email: 'sdsadsa@qq.com',
                        regdate :'2022-11-24 21:14:31.000000',
                        password:'sasdsasadas',
                        gender:'男',
                        enable:true,
                    },
                    {
                        userid: 4,
                        username: "xvHao",
                        phone: '6465464654',
                        email: 'sdsadsa@qq.com',
                        regdate :'2022-11-24 21:14:31.000000',
                        password:'sasdsasadas',
                        gender:'男',
                        enable:true,
                    },
                    {
                        userid: 5,
                        username: "qingXiao",
                        phone: '6465464654',
                        email: 'sdsadsa@qq.com',
                        regdate :'2022-11-24 21:14:31.000000',
                        password:'sasdsasadas',
                        gender:'男',
                        enable:true,
                    },
                ],
                idnum:6,
                tag:0,
                now:'',
                landscape: [],
                contextstyle: {
                    display: 'none',
                    right: '0px',
                    top: '0px',
                    left: '0px',
                    bottom: '0px',
                },
                employeesApplication:[]
            }
        },
        methods: {
            clickNode: function(node){
                this.currentTask = node
                this.now = node.name
                console.log(this.currentTask)
                console.log(this.currentTask.name)
                console.log(this.currentTask.thisId)
                console.log(this.currentTask.fartherId)
                if(window.event.x + 188 > document.documentElement.clientWidth){
                    this.contextstyle.left = 'unset';
                    this.contextstyle.right = document.documentElement.clientWidth - window.event.x + 'px';
                }else{
                    this.contextstyle.left = window.event.x + 'px';
                }
                if(window.event.y + 166 > document.documentElement.clientHeight){
                    this.contextstyle.top = 'unset';
                    this.contextstyle.bottom = document.documentElement.clientHeight - window.event.y + 'px';
                }else{
                    this.contextstyle.top = window.event.y + 'px';
                }
                this.contextstyle.display = 'block';
            },
            shutDown(){
                this.contextstyle.display='none';
            },

            //delete find
            findChild(array){
                if(this.tag === 1) return;
                for(let i in array)
                {
                    //console.log(array[i].name);
                    if(array[i].name === this.now){
                        console.log('findit');
                        this.tag = 1;
                        array.splice(i,1);
                    }
                    if(this.tag === 1) return;
                    if(array[i].children){
                        if(this.tag === 1) return;
                        this.findChild(array[i].children);
                        if(this.tag === 1) return;
                    }
                }
            },
            enterTheNode(){
                this.tag =0;
                //下面转到朝海波负责的任务详情页或编辑页
                this.shutDown();
            },

            applyEmployees(){
                this.dialogFormVisible = true
                this.contextstyle.display='none'
            },
            confirmOneTaskApplication(){
                console.log(this.currentTask)
                console.log(this.editableTabs)
                let judgeValidity = {}
                let duplicateApplication = []
                let hash={}
                judgeValidity["editPerson"] = this.currentTask["editPerson"]
                judgeValidity["investigatePerson"] = this.currentTask["investigatePerson"]
                judgeValidity["ratifyPerson"] =this.currentTask["ratifyPerson"]
                judgeValidity["con_signPerson1"] = this.currentTask["con_signPerson1"]
                judgeValidity["con_signPerson2"] = this.currentTask["con_signPerson2"]

                for (let key in judgeValidity){
                    if(hash[judgeValidity[key]])
                    {
                        console.log(judgeValidity[key])
                        duplicateApplication.push(key)
                    }
                    hash[judgeValidity[key]] = true
                }
                if (duplicateApplication !== undefined && duplicateApplication.length >0){
                    console.log('发生冲突的小朋友',duplicateApplication)
                    for (let item of duplicateApplication)
                        ElMessage({
                            showClose:true,
                            message:item + '发生冲突' +'请重新分配',
                            type:'error'
                        })
                    this.dialogFormVisible = true
                }
                else{
                    ElMessage({
                        showClose:true,
                        message:'分配成功',
                        type:'success'
                    })
                    this.dialogFormVisible = false
                }
            },
            saveCurrentProject(){
                console.log(this.editableTabs)
                ElMessage({
                    showClose:true,
                    message:'保存成功',
                    type:'success'
                })
            },




        }
    }
</script>




<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
    .gl_prs_ctn{
        width: 188px;
        background: rgb(255, 255, 255);
        box-shadow: rgba(0, 0, 0, 0.075) 0px 1px 1px inset, rgba(102, 175, 233, 0.6) 0px 0px 8px;
        z-index: 99999;
        position: fixed;
        padding: 10px;
        box-sizing: content-box;
        height: 135px;
    }
    .gl_prs_li{padding: unset;margin: unset;}
    .gl_prs_li>li{
        cursor: pointer;
        list-style: none;
        border-bottom: 1px solid #efefef;
        padding: 7px 10px;
    }
    li:last-child { border: unset }
    #tagli:hover{
        background: #ccc;
        color: #fff;
    }
    /*下面被注释的部分是调整tab内容大小的*/
    /*.demo-tabs > .el-tabs__content {*/
    /*    padding: 32px;*/
    /*    color: #6b778c;*/
    /*    font-size: 32px;*/
    /*    font-weight: 600;*/
    /*}*/

    .el-tabs--right .el-tabs__content,
    .el-tabs--left .el-tabs__content {
        height: 100%;
    }
    .el-tabs--bottom .el-tabs__content {
        height: 100%;
    }
    .el-tabs--top .el-tabs__content {
        height: 100%;
    }
</style>

<style scoped>
    .dialog-footer button:first-child {
        margin-right: 10px;
    }
</style>

