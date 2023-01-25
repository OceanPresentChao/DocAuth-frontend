<template>

    <div id="nowNewProject">
        <div style="margin-bottom: 20px">
            <el-button size="large" type = "primary" @click="addTab(editableTabsValue)">
                新增阶段
            </el-button>
            <el-button size="large" type = "success" @click="saveCurrentProject(editableTabsValue)" :disabled="!savable">
                保存当前项目
            </el-button>
        </div>
        <el-tabs
                v-model="editableTabsValue"
                type="card"
                class="demo-tabs"
                closable
                @tab-remove="removeTab"
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

        <!-- here is clicked menu      -->
        <div class="gl_prs_ctn" :style='[contextstyle]'>
            <ul class='gl_prs_li'>
                <li ><el-button type="primary" @click="addNode">添加子分支 </el-button></li>
                <li ><el-button type="success" @click="applyEmployees">任务安排</el-button></li>
                <li ><el-button type="danger"  @click="deleteNode">删除分支</el-button></li>
                <li ><el-button type="info" @click="shutDown">关闭此栏</el-button></li>
            </ul>
        </div>
        <!--people arrange -->
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
    import axios from "axios";
    export default {
        name: 'nowNewProject',
        components: {
            TreeChart
        },
        data() {
            let undoneurl="data:image/jpeg;base64,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";
            let doneurl="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fgss0.baidu.com%2F7Po3dSag_xI4khGko9WTAnF6hhy%2Fzhidao%2Fpic%2Fitem%2Fb999a9014c086e06c230311107087bf40bd1cbd4.jpg&refer=http%3A%2F%2Fgss0.baidu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1673779229&t=037e162f8fce2b6db5f25fe434983dfd";
            return {
                savable:false,
                doneurl:doneurl,
                undoneurl:undoneurl,
                tabIndex :1,
                editableTabsValue: '1',
                editableTabs: [
                        {
                            title: 'Phase 1',
                            name: '1',
                            content: {
                                name: '1',
                                image_url: undoneurl,
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
                                type:'root',
                                //class: ["rootNode"],
                                children: [
                                    {
                                        name: '2',
                                        image_url: undoneurl,
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
                                        image_url: undoneurl,
                                        thisId : 3,
                                        fartherId : 1,
                                        children: [
                                            {
                                                name: '4',
                                                image_url: undoneurl,
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
                                                image_url: undoneurl,
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
                                                image_url: undoneurl,
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
                        }
                    ],
                dialogFormVisible:false,
                formLabelWidth:'140px',
                startTime:'',
                deadLine:'',
                form:{
                    name: '',
                    startTime: '',
                    deadLine: '',
                    editPerson: '',
                    investigatePerson: '',
                    ratifyPerson: '',
                    con_signPerson1: '',
                    con_signPerson2:'',
                    type: [],
                    resource: '',
                    desc: '',
                },
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
                        phone: '6465464654',
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
                /*data: {
                    name: 'root',
                    image_url: "https://static.refined-x.com/static/avatar.jpg",
                    type:"root",
                    //class: ["rootNode"],
                    children: [
                        {
                            name: '1',
                            image_url: "https://static.refined-x.com/static/avatar.jpg",
                            children:[],
                        },
                        {
                            name: '2',
                            image_url: "https://static.refined-x.com/static/avatar.jpg",
                            children: [
                                {
                                    name: '3',
                                    image_url: "https://static.refined-x.com/static/avatar.jpg",
                                    children:[],
                                },
                                {
                                    name: '4',
                                    image_url: "https://static.refined-x.com/static/avatar.jpg",
                                    children:[],
                                },
                                {
                                    name: '5',
                                    image_url: "https://static.refined-x.com/static/avatar.jpg",
                                    children:[],
                                }
                            ]
                        }
                    ]
                },*/
                contextstyle: {
                    display: 'none',
                    right: '0px',
                    top: '0px',
                    left: '0px',
                    bottom: '0px',
                },
                employeesApplication:[],

            }
        },
        methods: {
            clickNode: function(node){
                this.currentTask = node
                this.now = node.thisId
                //console.log(this.currentTask)
                //console.log(this.currentTask)
                //console.log(this.currentTask.name)
                //console.log(this.currentTask.thisId)
                //console.log(this.currentTask.fartherId)
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
            deleteNode(){
                this.tag =0;
                for(let item of this.editableTabs){
                    if(item.name === this.editableTabsValue){
                        this.findChild([item.content])
                        break;
                    }
                }
                this.shutDown();
            },
            //delete find
            findChild(array){
                //tag is confusing do not care it.it tag has deleted!
                if(this.tag === 1) return;
                for(let i in array)
                {
                    if(array[i].thisId === this.now){
                        this.tag = 1;
                        if(array[i].type === 'root'){
                            ElMessage({
                                showClose:true,
                                message:'cannot delete root',
                                type:'error'
                            })
                            return;
                        };
                        array.splice(i,1);
                        //console.log(array)
                        // console.log(this.)
                    }
                    if(this.tag === 1) return;
                    if(array[i].children){
                        if(this.tag === 1) return;
                        this.findChild(array[i].children);
                        if(this.tag === 1) return;
                    }
                }
            },
            addNode(){
                this.tag =0;
                for(let item of this.editableTabs){
                    if(item.name === this.editableTabsValue){
                        this.addreal([item.content])
                        break
                    }
                }
                // this.addreal([this.data])
                this.shutDown();
            },
            addreal(array){
                for(let i in array)
                {
                    //console.log(array[i].name);
                    if(array[i].thisId === this.now){
                        //console.log('findit');
                        this.tag = 1;
                        this.idnum=this.idnum+1;
                        let undoneurl=this.undoneurl;
                        array[i].children.push({
                            name: this.idnum,
                            thisId : this.idnum,
                            fartherId : array[i].thisId ,
                            image_url: undoneurl,
                            startTime: '',
                            deadLine: '',
                            editPerson: '',
                            investigatePerson: '',
                            ratifyPerson: '',
                            con_signPerson1: '',
                            con_signPerson2:'',
                            taskDescription:'',
                            children:[],
                        });

                    }
                    if(this.tag === 1) return;
                    if(array[i].children){
                        if(this.tag === 1) return;
                        this.addreal(array[i].children);
                        if(this.tag === 1) return;
                    }
                }
            },
            applyEmployees(){
                this.dialogFormVisible = true
                this.contextstyle.display='none'
            },
            confirmOneTaskApplication(){
                //console.log(this.currentTask)
                //console.log(this.editableTabs)
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
                        //console.log(judgeValidity[key])
                        duplicateApplication.push(key)
                    }
                    hash[judgeValidity[key]] = true
                }
                if (duplicateApplication !== undefined && duplicateApplication.length >0){
                    //发生冲突项目不可提交
                    this.savable =false;
                    this.currentTask.image_url= this.undoneurl;
                    //console.log('发生冲突的小朋友',duplicateApplication)
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
                    this.dialogFormVisible = false;
                    this.currentTask.image_url= this.doneurl;
                    this.examSavable();
                }
            },
            //检查项目全做完了
            examSavable(){
                //console.log(this.editableTabs);
                for(let item of this.editableTabs){
                    if(this.examComplete([item.content]) ===false){
                        this.savable = false;
                        return;
                    }
                }
                //console.log("why");
                this.savable =true;
            },
            examComplete(array){
                for(let i in array)
                {
                    if(array[i].image_url === this.undoneurl){
                        return false;
                    }
                    if(array[i].children){
                        if(this. examComplete(array[i].children)===false){
                            //console.log(array[i]);
                           return false;
                        }
                    }
                }

               return true;
            },
            exp(){
                let postData= [];
                for(let [index,item] of this.editableTabs.entries()){
                    var tmp = "phase"+index;
                    postData["phase"+index]=[];
                    if(index===1){
                        console.log("postData1111111111")
                    }
                    this.getChild([item.content],postData[tmp])
                    //console.log(postData)
                    break;
                }
                console.log(postData)
            },
            saveCurrentProject(){
                let postData= [];
                for(let [index,item] of this.editableTabs.entries()){
                    var tmp = "phase"+index;
                    postData["phase"+index]=[];
                    postData["startTime"]=item.content.startTime;
                    postData["deadLine"]=item.content.deadLine;
                    postData["taskDescription"]=item.content.taskDescription;
                    this.getChild([item.content],postData[tmp])

                }
                axios.post("/api/v1/business/saveProject",
                    {postData})
                    .then(function (response) {
                        console.log(response);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                //console.log(postData)

            },
            //this exam is uesd for save project and pack the information
            getChild(array,Data){
               // console.log("why!!!!!")
                //console.log(Data)
                //console.log("No!!!")
                //console.log(array)
                for(let i in array)
                {
                    Data.push({
                        thisId:array[i].thisId,
                        name:array[i].name,
                        fatherID:array[i].fartherId,
                        staffs:[
                            array[i].editPerson,
                            array[i].investigatePerson,
                            array[i].ratifyPerson,
                            array[i].con_signPerson1,
                            array[i].con_signPerson2,
                        ]
                    }
                    )
                    if(array[i].children){
                        this.getChild(array[i].children,Data);
                    }
                }
                //console.log("Data")
                //console.log(Data)
            },


            addTab(targetName){
                this.idnum = this.idnum+1;
                let newTabName = ++this.tabIndex + '';
                this.editableTabs.push({
                    title: 'Phase ' + this.tabIndex,
                    name: newTabName,
                    content: {
                        name: this.idnum + "",
                        image_url: this.undoneurl,
                        thisId:  this.idnum,
                        fartherId: 0,
                        startTime: '',
                        deadLine: '',
                        editPerson: '',
                        investigatePerson: '',
                        ratifyPerson: '',
                        con_signPerson1: '',
                        con_signPerson2:'',
                        taskDescription:'',
                        children: [],
                        type:"root",
                        },
                })
                this.editableTabsValue = newTabName
            },
            removeTab(targetName){
                let tabs = this.editableTabs
                let activeName = this.editableTabsValue
                if (activeName === targetName) {
                    tabs.forEach((tab, index) => {
                        if (tab.name === targetName) {
                            let nextTab = tabs[index + 1] || tabs[index - 1]
                            if (nextTab) {
                                activeName = nextTab.name
                            }
                        }
                    })
                }
                this.editableTabsValue = activeName
                this.editableTabs = tabs.filter((tab) => tab.name !== targetName)
                this.tabIndex--
                let ct = 1
                for(let item of this.editableTabs){
                    item.title = 'Phase ' + ct
                    ct++
                }
            }
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
        height: 180px;
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
</style>

<style scoped>
    .dialog-footer button:first-child {
        margin-right: 10px;
    }
</style>

