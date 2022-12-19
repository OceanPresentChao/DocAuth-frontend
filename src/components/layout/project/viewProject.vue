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
                <li ><el-button type="primary" @click="enterTheNode">进入任务 </el-button></li>
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
            let undoneurl="data:image/jpeg;base64,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";
            let doneurl="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fgss0.baidu.com%2F7Po3dSag_xI4khGko9WTAnF6hhy%2Fzhidao%2Fpic%2Fitem%2Fb999a9014c086e06c230311107087bf40bd1cbd4.jpg&refer=http%3A%2F%2Fgss0.baidu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1673779229&t=037e162f8fce2b6db5f25fe434983dfd";
            return {
                doneurl:doneurl,
                undoneurl:undoneurl,
                tabPosition: 'left',
                tabIndex :1,
                editableTabsValue: '1',
                editableTabs:[],
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
                        username: "zqx",
                        phone: '6465464654',
                        email: 'sdsadsa@qq.com',
                        regdate :'2022-11-24 21:14:31.000000',
                        password:'sasdsasadas',
                        gender:'女',
                        enable:true,
                    },
                    {
                        userid: 6,
                        username: "fxx",
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
                employeesApplication:[],
                processingDataFromBackEnd:[],
                test:[]
            }
        },

        created() {
            this.load()
        },
        methods: {
            transferToOperatorName(operatorType){
              if(operatorType === 1)
                  return "editPerson"
              if(operatorType === 2)
                  return "investigatePerson"
              if(operatorType === 3)
                  return "ratifyPerson"
              if(operatorType === 4)
                  return "con_signPerson1"
              if(operatorType === 5)
                  return "con_signPerson2"
            },
            load(){
                this.editableTabs =  [
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
                ]
                this.processingDataFromBackEnd = [
                        {
                            "phaseName": "phase 3",
                            "phaseTasks": [
                                {
                                    "task__name": "分北况事备",
                                    "task__thisId": 1,
                                    "task__id": 1,
                                    "task__thisFarther": 0
                                },
                                {
                                    "task__name": "必满论白",
                                    "task__thisId": 2,
                                    "task__id": 2,
                                    "task__thisFarther": 1
                                },
                                {
                                    "task__name": "因般体",
                                    "task__thisId": 3,
                                    "task__id": 3,
                                    "task__thisFarther": 1
                                },
                                {
                                    "task__name": "结把三",
                                    "task__thisId": 4,
                                    "task__id": 4,
                                    "task__thisFarther": 2
                                },
                            ],
                            "task__number": 4
                        },
                        {
                            "phaseName": "phase 4",
                            "phaseTasks": [
                                {
                                    "task__name": "活进上部流",
                                    "task__thisId": 5,
                                    "task__id": 5,
                                    "task__thisFarther": 0
                                }
                            ],
                            "task__number": 1
                        },
                        {
                            "phaseName": "phase 5",
                            "phaseTasks": [
                                {
                                    "task__name": "到人段见",
                                    "task__thisId": 6,
                                    "task__id": 6,
                                    "task__thisFarther": 0
                                },
                                {
                                    "task__name": "连自白活格",
                                    "task__thisId": 7,
                                    "task__id": 7,
                                    "task__thisFarther": 6
                                },
                                {
                                    "task__name": "长学状次身对",
                                    "task__thisId": 8,
                                    "task__id": 8,
                                    "task__thisFarther": 7
                                },
                                {
                                    "task__name": "清极时方",
                                    "task__thisId": 9,
                                    "task__id": 9,
                                    "task__thisFarther": 8
                                },
                                {
                                    "task__name": "wser",
                                    "task__thisId": 10,
                                    "task__id": 10,
                                    "task__thisFarther": 6
                                },
                                {
                                    "task__name": "jucy",
                                    "task__thisId": 11,
                                    "task__id": 11,
                                    "task__thisFarther": 8
                                },
                                {
                                    "task__name": "zqx",
                                    "task__thisId": 13,
                                    "task__id": 13,
                                    "task__thisFarther": 11
                                },
                                {
                                    "task__name": "caobo",
                                    "task__thisId": 12,
                                    "task__id": 12,
                                    "task__thisFarther": 7
                                },
                            ],
                            "task__number": 8
                        },
                    ]
                this.$request.get('http://localhost:13500/api/v1/business/getTasksFromTheProject',{
                    params:{
                        projectId : 2
                    }
                }).then(res=>{
                    this.processingDataFromBackEnd = res.data
                    console.log( this.processingDataFromBackEnd ,'这里是后端返回的数据')
                    // console.log('这里是待处理的后端返回的数据',typeof this.processingDataFromBackEnd)
                    for(let item of this.processingDataFromBackEnd) {
                        console.log('检查阶段里面的内容', item.phaseTasks)
                        this.addTabInefficiency(item)
                    }
                })
                 // this.addTabInefficiency(this.processingDataFromBackEnd[0])
            },
            //这个地方想到了更优的算法，后续有时间会写高效的hash建树方法
            addTabInefficiency(phase){
                console.log(phase,'这里是待处理的一维阶段数据')
                let taskNum = phase.task__number
                let phaseTaskList = phase.phaseTasks
                let tab = {
                    title: phase.phaseName,
                    name: phase.phaseName,
                    content: {
                        name: '',
                        image_url: this.undoneurl,
                        thisId:  1,
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
                }
                let tabContent = tab.content
                let rootNode =  phaseTaskList.find(item => item.task__thisFarther === 0)
                let openList = []
                let ct = 0;

                openList.push(rootNode)
                // console.log(rootNode,'这里是rootNode')
                // console.log(taskNum,'本阶段的任务数')
                // console.log(tabContent,'本阶段的任务数')
                tabContent.name = rootNode.task__name
                tabContent.thisId = rootNode.task__thisId

                while(taskNum > 1){
                    let tmp = openList[0]
                    openList.shift()
                    for(let item of phaseTaskList){
                        // console.log(item,tmp.task__thisId)
                        if(item.task__thisFarther === tmp.task__thisId){
                            this.findNodeAndAddItsChild(item,tmp.task__thisId,[tabContent])
                            openList.push(item)
                            taskNum --
                        }
                    }
                }
                console.log(tab.content,'这里是处理后的tab 阶段')
                // console.log(phaseTaskList)
                // console.log(phaseTaskList.shift())
                this.editableTabs.push(tab)
                this.editableTabsValue = '3'
            },
            findNodeAndAddItsChild(child,fartherId,array){
                // console.log('**************************************')
                // console.log(array,'这里是元素')
                for(let item of array){
                    // console.log('这里在插入结点',item.thisId,fartherId)
                    if(item.thisId === fartherId){
                        let tmpNode ={
                            name: child.task__name,
                            image_url: this.undoneurl,
                            thisId:  child.task__thisId,
                            fartherId: child.task__thisFarther,
                            startTime: child.task__startTime,
                            deadLine: child.task__deadLine,
                            editPerson: '',
                            investigatePerson: '',
                            ratifyPerson: '',
                            con_signPerson1: '',
                            con_signPerson2:'',
                            taskDescription:child.task__desc,
                            children: [],
                            type:"node",
                        }
                        for(let person of child.AssignedPersons){
                            tmpNode[this.transferToOperatorName(person.type)] = person.user__username
                        }
                        item.children.push(tmpNode)
                    }
                    if(item.children){
                        this.findNodeAndAddItsChild(child,fartherId,item.children)
                    }
                }

            },
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

