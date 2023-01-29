<template>
    <div id="nowNewProject">
        <el-radio-group v-model="tabPosition" style="margin-bottom: 5px">
            <el-radio-button label="top">top</el-radio-button>
            <el-radio-button label="right">right</el-radio-button>
            <el-radio-button label="bottom">bottom</el-radio-button>
            <el-radio-button label="left">left</el-radio-button>
        </el-radio-group>
        <el-button style="margin-left: 15px ;margin-top: 8px " size="" type = "success" @click="flashCurrentProject()">
            刷新当前项目
        </el-button>
        <el-button style="margin-left: 15px ;margin-top: 8px " size="" type = "primary" @click="handleChangeProjectInfo()">
            修改项目基本信息
        </el-button>

        <el-tabs
                v-model="editableTabsValue"
                type="card"
                class="demo-tabs"
                :tab-position="tabPosition"
                style="height: 1500px"
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
                <li ><el-button type="primary" @click="enterTheNode">进入任务</el-button></li>
                <li ><el-button type="success" @click="applyEmployees">重新编排</el-button></li>
                <li ><el-button type="info" @click="shutDown">关闭此栏</el-button></li>
            </ul>
        </div>

        <el-dialog v-model="dialogFormVisible" title="任务修改">
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
                    <el-select value-key="id" v-model="this.currentTask.editPerson" :popper-append-to-body='false' placeholder="请选择人员" effect="dark">
                        <el-option v-for="item in users" :label="item.username" :key="item.id" :value="item.id" style="width: 100% ;color: #55e0e5;text-align: center"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="审" :label-width="formLabelWidth">
                    <el-select v-model="this.currentTask.investigatePerson" placeholder="请选择人员" effect="dark">
                        <el-option v-for="item in users" :label="item.username" :key="item.id" :value="item.id" style="width: 100% ;color: #55e0e5;text-align: center"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="批" :label-width="formLabelWidth">
                    <el-select v-model="this.currentTask.ratifyPerson" placeholder="请选择人员" effect="dark">
                        <el-option v-for="item in users" :label="item.username" :key="item.id" :value="item.id" style="width: 100% ;color: #55e0e5;text-align: center"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="会签" :label-width="formLabelWidth" >
                    <el-select v-model="this.currentTask.con_signPerson1" placeholder="请选择人员1" style="margin-right: 50px ;" effect="dark">
                        <el-option v-for="item in users" :label="item.username" :key="item.id" :value="item.id" style="width: 100% ;color: #55e0e5 ;text-align: center"></el-option>
                    </el-select>
                    <el-select v-model="this.currentTask.con_signPerson2" placeholder="请选择人员2" effect="dark">
                        <el-option v-for="item in users" :label="item.username" :key="item.id" :value="item.id" style="width: 100% ;color: #55e0e5;text-align: center"></el-option>
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

<!--项目基本信息对话框-->
        <el-dialog v-model="ProjectInfoChange" title="项目基本信息" width="40%">
            <el-form  label-width="80px">
                <el-form-item label="项目名" :label-width="formLabelWidth">
                    <el-input v-model="project.name" autocomplete="off" />
                </el-form-item>
                <el-form-item label="项目概述" :label-width="formLabelWidth">
                    <el-input v-model="project.desc" autocomplete="off" />
                </el-form-item>

                <el-form-item label="启动"  :label-width="formLabelWidth" >
                        <el-switch  v-model="project.status" active-color="#13ce66" inactive-color="#ccc" />
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="ProjectInfoChange = false">
                    取 消
                </el-button>
                <el-button type="success" @click="updateProjectInfo()">
                    确 定
                </el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import TreeChart from "@/components/layout/treeNode/treeChart.vue";
    import { ElMessage } from 'element-plus'
    export default {
        name: 'viewProject',
        thisId:0,
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
                editableTabsValue: 'Phase 1',
                editableTabs:[],
                dialogFormVisible:false,

                //修改项目信息对话框
                ProjectInfoChange:false,
                formLabelWidth:'140px',
                startTime:'',
                deadLine:'',
                currentTask:{},
                users:[
                    {
                        id: 1,
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
                        id: 2,
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
                        id: 3,
                        username: "oceanPresent",
                        phone: '6465464654',
                        email: 'sdsadsa@qq.com',
                        regdate :'2022-11-24 21:14:31.000000',
                        password:'sasdsasadas',
                        gender:'男',
                        enable:true,
                    },
                    {
                        id: 4,
                        username: "xvHao",
                        phone: '6465464654',
                        email: 'sdsadsa@qq.com',
                        regdate :'2022-11-24 21:14:31.000000',
                        password:'sasdsasadas',
                        gender:'男',
                        enable:true,
                    },
                    {
                        id: 5,
                        username: "zqx",
                        phone: '6465464654',
                        email: 'sdsadsa@qq.com',
                        regdate :'2022-11-24 21:14:31.000000',
                        password:'sasdsasadas',
                        gender:'女',
                        enable:true,
                    },
                    {
                        id: 6,
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
                test:[],
                project:{},
                project1:{}


            }
        },

        created() {
            this.load()
            this.userInformationInit()
        },
        methods: {

            load(){
                this.editableTabs =  []
                this.processingDataFromBackEnd=[]
                this.$request.get('http://localhost:13500/api/v1/business/getTasksFromTheProject',{
                    params:{
                        projectId : 7
                    }
                }).then(res=>{
                    this.processingDataFromBackEnd = res.data.data
                    // console.log( this.processingDataFromBackEnd ,'这里是后端返回的数据')
                    // console.log('这里是待处理的后端返回的数据',typeof this.processingDataFromBackEnd)
                    for(let item of this.processingDataFromBackEnd) {
                        // console.log('检查阶段里面的内容', item.phaseTasks)
                        this.addTabInefficiency(item)
                    }
                    // console.log('这里是初始化的项目数据',this.editableTabs)
                })
                // this.addTabInefficiency(this.processingDataFromBackEnd[0])
            },
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
            transferUserNameToId(trans){
                for(let user of this.users){
                    if(trans === user.username){
                        // console.log('这里是发生改变的trans',trans)
                        return user.id
                    }
                }
            },
            judgeIfModifyEmployeesAndTransfer() {
                if (typeof this.currentTask.editPerson === 'string') {
                    this.currentTask.editPerson = this.transferUserNameToId(this.currentTask.editPerson)
                    // console.log('这里是发生改变的职位', this.currentTask.editPerson)
                }
                if (typeof this.currentTask.investigatePerson === 'string') {
                    this.currentTask.investigatePerson = this.transferUserNameToId(this.currentTask.investigatePerson)
                }
                if (typeof this.currentTask.ratifyPerson === 'string') {
                    this.currentTask.ratifyPerson =  this.transferUserNameToId(this.currentTask.ratifyPerson)
                }
                if (typeof this.currentTask.con_signPerson1 === 'string') {
                   this.currentTask.con_signPerson1 =  this.transferUserNameToId(this.currentTask.con_signPerson1)
                }
                if (typeof this.currentTask.con_signPerson2 === 'string') {
                    this.currentTask.con_signPerson2 =  this.transferUserNameToId(this.currentTask.con_signPerson2)
                }

            },

            userInformationInit(){
                this.users = []
                this.$request.get("http://localhost:13500/api/v1/user/list/",{
                    params:{
                          page: 1,
                          page_size:999999999,
                          userName : null,
                          phone : null,
                          role : null
                }}).then(res=>{
                    console.log('这里是users',res)

                    console.log('这里是users',res.data.results)
                    this.users = res.data.results

                })
            },

            //这个地方想到了更优的算法，后续有时间会写高效的hash建树方法
            addTabInefficiency(phase){
                console.log(phase,'这里是待处理的一维阶段数据')
                let taskNum = phase.task__number
                let phaseTaskList = phase.phaseTasks
                console.log('这里是阶段名称',phase.phaseName)
                let tab = {
                    title: phase.phaseName,
                    name: phase.phaseName,
                    content: {
                        id: -1,
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
                let rootNode =  phaseTaskList.find(item => item.thisFarther === 0)
                let openList = []
                let ct = 0;

                openList.push(rootNode)
                // console.log(rootNode,'这里是rootNode')
                // console.log(taskNum,'本阶段的任务数')
                // console.log(tabContent,'本阶段的任务数')

                //对本阶段根结点初始化
                tabContent.id = rootNode.id;
                tabContent.name = rootNode.name
                console.log('注意了这里事tabname',tabContent.name)
                tabContent.thisId = rootNode.thisId
                tabContent.startTime = rootNode.startTime
                tabContent.deadLine = rootNode.deadLine
                tabContent.taskDescription = rootNode.desc
                for(let rp of rootNode.AssignedPersons){
                    tabContent[this.transferToOperatorName(rp.duty)] = rp.user__username
                }

                while(taskNum > 1){
                    let tmp = openList[0]
                    openList.shift()
                    for(let item of phaseTaskList){
                        // console.log(item,tmp.task__thisId)
                        if(item.thisFarther === tmp.thisId){
                            this.findNodeAndAddItsChild(item,tmp.thisId,[tabContent])
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
                            id: child.id,
                            name: child.name,
                            image_url: this.undoneurl,
                            thisId:  child.thisId,
                            fartherId: child.thisFarther,
                            startTime: child.startTime,
                            deadLine: child.deadLine,
                            editPerson: '',
                            investigatePerson: '',
                            ratifyPerson: '',
                            con_signPerson1: '',
                            con_signPerson2:'',
                            taskDescription:child.desc,
                            children: [],
                            type:"node",
                        }
                        for(let person of child.AssignedPersons){
                            tmpNode[this.transferToOperatorName(person.duty)] = person.user__username
                        }
                        item.children.push(tmpNode)
                    }
                    if(item.children){
                        this.findNodeAndAddItsChild(child,fartherId,item.children)
                    }
                }

            },
            clickNode: function(node){
                console.log('这里是当前被选择的结点',node)
                this.currentTask = node
                this.now = node.name
                console.log('这里是当前任务',this.currentTask)
                console.log('这里是当前任务名',this.currentTask.name)
                console.log('这里是当前任务的相对id',this.currentTask.thisId)
                console.log('这里是当前任务的父任务id',this.currentTask.fartherId)
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
                // console.log('这是当前的任务啊1',this.currentTask)

                // console.log('这里是类型',typeof this.currentTask.editPerson === 'string')
                this.judgeIfModifyEmployeesAndTransfer()

                // console.log('这是当前的任务啊2',this.currentTask)
                // console.log(this.editableTabs)
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
                    // this.console('这里是即将提交的表单信息',this.currentTask)
                    this.saveCurrentTask()

                }
            },
            saveCurrentTask(){
                let taskData = {}
                taskData["id"] = this.currentTask.id
                taskData["name"] = this.currentTask.name
                taskData["thisId"] = this.currentTask.thisId
                taskData["thisFarther"] = this.currentTask.fartherId
                taskData["startTime"] = this.currentTask.startTime
                taskData["deadLine"] = this.currentTask.deadLine
                taskData["desc"] = this.currentTask.taskDescription
                taskData["staffs"] = []
                taskData["staffs"].push(this.currentTask.editPerson)
                taskData["staffs"].push(this.currentTask.investigatePerson)
                taskData["staffs"].push(this.currentTask.ratifyPerson)
                taskData["staffs"].push(this.currentTask.con_signPerson1)
                taskData["staffs"].push(this.currentTask.con_signPerson2)
                this.$request.post("http://127.0.0.1:13500/api/v1/business/saveTask",taskData).then(res=>{
                    console.log(res)
                })
            },
            flashCurrentProject(){
                console.log(this.editableTabs)
                this.load()
                ElMessage({
                    showClose:true,
                    message:'刷新成功',
                    type:'success'
                })
            },

            getProjectInfo()
            {
                this.$request.get('/api/v1/business/project/Info/',{
                    params:{
                        projectId:4
                    }
                }).then((res)=>{
                    if(res.code==200)
                    {
                        this.convertStatus()
                        //this.project1 = res.data
                    }
                    else
                    {
                        ElMessage({
                            showClose:true,
                            message:res.message,
                            type:'error'
                        })
                    }
                })
            },
            handleChangeProjectInfo()
            {
                this.getProjectInfo()
                this.ProjectInfoChange = true
                //this.$message.error('失败')
            },
            updateProjectInfo() {

                if(this.project.status==true)
                {
                    this.project.status = 'r'
                }
                else{
                    this.project.status = 's'
                }
                //this.project.projectId = id
                this.$request.put('http://127.0.0.1:8000/api/v1/business/project/',{
                    body:{
                        "projectId":this.project.projectId,
                        "name":this.project.name,
                        "desc":this.project.desc,
                        "status":this.project.status,
                    }
                }).then((res) => {
                    if (res.code == 200) {
                        ElMessage({
                            showClose:true,
                            message:res.message,
                            type:'success'
                        })
                        this.load();
                    } else {
                        ElMessage({
                            showClose:true,
                            message:res.message,
                            type:'error'
                        })
                    }
                })
            },
            convertStatus(){
                if(this.project.status=='r')
                {
                    this.project.status = true
                }
                else{
                    this.project.status = false
                }
            }


        }
    }
</script>




<style>

</style>

<style scoped>
    .dialog-footer button:first-child {
        margin-right: 10px;
    }
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






