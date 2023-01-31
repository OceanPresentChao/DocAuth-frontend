<template>
    <div id="nowNewProject">
        <el-radio-group v-model="tabPosition" style="margin-bottom: 15px">
            <el-radio-button label="top">top</el-radio-button>
            <el-radio-button label="right">right</el-radio-button>
            <el-radio-button label="bottom">bottom</el-radio-button>
            <el-radio-button label="left">left</el-radio-button>
        </el-radio-group>
        <el-button style="margin-left: 15px ;margin-top: 8px " size="" type = "success" @click="flashCurrentProject">
            刷新当前项目
        </el-button>
        <el-button style="margin-left: 15px ;margin-top: 8px " size="" type = "primary" @click="handleChangeProjectInfo">
            修改项目基本信息
        </el-button>
<!--        <el-button style="margin-left: 15px ;margin-top: 8px " size="" type = "primary" @click="lockPhase">-->
<!--            测试函数-->
<!--        </el-button>-->




        <!--项目总览树        -->
        <el-tabs
                v-model="editableTabsValue"
                type="card"
                class="tabs"
                :tab-position="tabPosition"
                style="height: 1500px"
                @tab-click="changePhase"
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



        <!--功能选择框-->
        <div class="gl_prs_ctn" :style='[contextstyle]'>
            <ul class='gl_prs_li'>
                <li ><el-button type="primary" @click="enterTheNode">进入任务</el-button></li>
                <li ><el-button type="success" @click="applyEmployees">重新编排</el-button></li>
                <li ><el-button type="info" @click="shutDown">关闭此栏</el-button></li>
            </ul>
        </div>

        <!--任务基本信息修改-->
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
                    <el-input v-model="project1.name" autocomplete="off" />
                </el-form-item>
                <el-form-item label="项目概述" :label-width="formLabelWidth">
                    <el-input v-model="project1.desc" autocomplete="off" />
                </el-form-item>

                <el-form-item label="启动"  :label-width="formLabelWidth" >
                        <el-switch  v-model="project1.status" active-color="#13ce66" inactive-color="#ccc" />
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

        <el-dialog v-model="tipsVisible" title="Tips" width="30%">
            <el-form  label-width="80px">
                <el-form-item label="任务状态1" :label-width="formLabelWidth" style="text-align: left">
                    <el-image :src="doingurl" style="height: 40px ;width: 50px"></el-image>
                    <div style="margin-left: 5px "> ----> </div>
                    <div style="margin-left: 5px ">
                        此任务正在进行
                    </div>
                </el-form-item>
                <el-form-item label="任务状态2" :label-width="formLabelWidth">
                    <el-image :src="doneurl" style="height: 40px;width: 50px"></el-image>
                    <div style="margin-left: 5px "> ----> </div>
                    <div style="margin-left: 5px ">
                        此任务已经完成
                    </div>
                </el-form-item>
                <el-form-item label="任务状态3" :label-width="formLabelWidth">
                    <el-image :src="stopurl" style="height: 40px;width: 50px"></el-image>
                    <div style="margin-left: 5px "> ----> </div>
                    <div style="margin-left: 5px ">
                        此任务暂时停止
                    </div>
                </el-form-item>
                <el-form-item label="任务状态4" :label-width="formLabelWidth">
                    <el-image :src="undoneurl" style="height: 40px ;width: 50px"></el-image>
                    <div style="margin-left: 5px "> ----> </div>
                    <div style="margin-left: 5px ">
                        此任务还未开始
                    </div>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="info" @click="tipsVisible = false">
                    下次不再提醒
                </el-button>
                <el-button type="success" @click="tipsVisible=false">
                    朕知道了
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
            let undoneurl="src/assets/undoneTask.png";
            let doneurl="src/assets/doneTask.png";
            let doingurl="src\\assets\\doingTask.jpg"
            let stopurl ="src/assets/stopTask.jpg"
            return {
                tipsVisible:false,
                doneurl:doneurl,
                undoneurl:undoneurl,
                doingurl:doingurl,
                stopurl:stopurl,
                tabPosition: 'left',
                tabIndex :1,
                editableTabsValue: 'Phase 1',
                editableTabs:[],
                currentPhaseIndex: 1,
                dialogFormVisible:false,
                currentProjectId:7,
                //修改项目信息对话框
                ProjectInfoChange:false,
                formLabelWidth:'140px',
                startTime:'',
                deadLine:'',
                currentTask:{},
                users:[],
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
            this.tipsVisible = true
            this.load()
            this.userInformationInit()
        },
        methods: {
            //*****项目初始话模块<
            load(){
                console.log('这里是传递来的参数',this.$route.query)
                this.editableTabs =  []
                this.processingDataFromBackEnd=[]
                this.$request.get('/django/business/getTasksFromTheProject',{
                    params:{
                        projectId : this.$route.query.projectId*1
                    }
                }).then(res=>{
                    this.processingDataFromBackEnd = res.data.data
                    // console.log( this.processingDataFromBackEnd ,'这里是后端返回的数据')
                    // console.log('这里是待处理的后端返回的数据',typeof this.processingDataFromBackEnd)
                    for(let item of this.processingDataFromBackEnd) {
                        // console.log('检查阶段里面的内容', item.phaseTasks)
                        this.addTabInefficiency(item)
                    }
                    console.log('[Info][EditTabs]',this.editableTabs)
                    this.lockPhase()
                })

                // this.addTabInefficiency(this.processingDataFromBackEnd[0])
            },
            flashCurrentProject(){
                // console.log(this.editableTabs)
                this.load()
                ElMessage({
                    showClose:true,
                    message:'刷新成功',
                    type:'success'
                })
            },
            userInformationInit(){
                this.users = []
                this.$request.get("/django/user/list",{
                    params:{
                        page: 1,
                        page_size:999999999,
                        userName : null,
                        phone : null,
                        role : null
                    }}).then(res=>{
                    console.log('[users]',res)
                    // console.log('这里是users',res.data.results)
                    this.users = res.data.data.results

                })
            },
            lockPhase(){
                console.log('[DETECT][EditTabs]',this.editableTabs)
                for(let item of this.editableTabs ){
                    if(this.judgePhaseCompleted([item.content])=== false){
                        this.editableTabsValue = item.name
                        return
                    }
                }
            },
              //这个地方想到了更优的算法，后续有时间会写高效的hash建树方法
            addTabInefficiency(phase){
                // console.log(phase,'这里是待处理的一维阶段数据')
                let taskNum = phase.task__number
                let phaseTaskList = phase.phaseTasks
                // console.log('这里是阶段名称',phase.phaseName)
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
                // console.log('注意了这里事tabname',tabContent.name)
                tabContent.thisId = rootNode.thisId
                tabContent.startTime = rootNode.startTime
                tabContent.deadLine = rootNode.deadLine
                tabContent.taskDescription = rootNode.desc
                tabContent.image_url = this.transStatusToImage(rootNode.status)
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
                // console.log(tab.content,'这里是处理后的tab 阶段')
                // console.log(phaseTaskList)
                // console.log(phaseTaskList.shift())
                this.editableTabs.push(tab)
                // this.editableTabsValue = '3'
            },
            transStatusToImage(status){
                if(status === 's')
                    return this.stopurl
                if(status === 'r')
                    return this.doingurl
                if(status === 'w')
                    return this.undoneurl
                if(status === 'f')
                    return  this.doneurl
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
                        tmpNode.image_url = this.transStatusToImage(child.status)
                        item.children.push(tmpNode)
                    }
                    if(item.children){
                        this.findNodeAndAddItsChild(child,fartherId,item.children)
                    }
                }

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
            //****>


            //***项目元信息函数快 <
            getProjectInfo()
            {
                this.$request.get('/django/business/project/Info',{
                    params:{
                        projectId:this.currentProjectId
                    }
                }).then((res)=>{
                    console.log(res.data)
                    if(res.data.code==200)
                    {
                        this.project1 = res.data.data[0]
                        this.convertStatus()
                        console.log(this.project1)
                        ElMessage({
                            showClose:true,
                            message:res.data.message,
                            type:'success'
                        })
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
                this.$request.put('/django/business/project/',{
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
                this.project1.status = this.project1.status === 'r';
            },
            //*****>



            //*****项目相信信息操作辅助模块<
            changePhase(tab,event){
                // console.log('[LOG][CURRENT][TAB]',tab.props.name)
                // console.log('[LOG][CURRENT][tabList]',this.editableTabs)
                this.currentPhaseIndex = tab.props.name.slice(5)* 1
                // console.log('[LOG][CURRENT][index]',this.currentPhaseIndex)
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
            clickNode: function(node){
                console.log('这里是当前被选择的结点',node)
                this.currentTask = node
                this.now = node.name
                // console.log('这里是当前任务',this.currentTask)
                // console.log('这里是当前任务名',this.currentTask.name)
                // console.log('这里是当前任务的相对id',this.currentTask.thisId)
                // console.log('这里是当前任务的父任务id',this.currentTask.fartherId)
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
                        // console.log('findit');
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
            //*****>


            //*** <判断用户是否合法进入该任务（上一阶段是否全部完成，其父结点是否全部完成）的函数块
            enterTheNode(){
                this.tag =0;
                // console.log('[DETECT][phase]',this.examPhaseIfCompleted())
                // console.log('[DETECT][fatherTask]',this.examFatherTasksIfCompleted())
                if(this.examPhaseIfCompleted() && this.examFatherTasksIfCompleted() ){
                    //下面转到朝海波负责的任务详情页或编辑页
                    console.log('[router]',this.currentTask.id)
                    this.$router.push({path:`/task/${this.currentTask.id}`})
                    ElMessage({
                        showClose:true,
                        message: '进入成功',
                        type: 'success'
                    })
                }else {
                    ElMessage({
                        showClose:true,
                        message: '无效操作，请完成上一阶段所有任务或该任务的父任务',
                        type: 'error'
                    })
                }

                // console.log(this.examFatherTasksIfCompleted())
                this.shutDown();
            },
            examPhaseIfCompleted(){
                let index = this.currentPhaseIndex-1;
                if(index === 0)
                    return true
                //检查上一阶段是否全部完成
                index -= 1
                let testPhase = this.editableTabs[index]
                // console.log('[Index]',index)
                // console.log('[test][Phase]',testPhase)
                return this.judgePhaseCompleted([testPhase.content])
                // this.judgePhaseCompleted([testPhase.content])
            },
            judgePhaseCompleted(judgePhase){
                console.log('[BUG][phase]',judgePhase)

                for(let  item in judgePhase){
                    // console.log('[BUG][item]',judgePhase[item])
                    // console.log('[BUG][item.image]',judgePhase[item].image_url)
                    // console.log('[BUG][doneurl]',this.doneurl)
                    // console.log('[BUG][judge]',this.doneurl === judgePhase[item].image_url )
                    if(judgePhase[item].image_url !== this.doneurl){
                        return false
                    }
                    if(judgePhase[item].children){
                        if(this.judgePhaseCompleted(judgePhase[item].children) === false)
                            return false
                    }
                }
                return  true
            },
               //有更高效的父节点检检查扫描算法，先用最显然的方法做检查
            examFatherTasksIfCompleted(){
                let index = this.currentPhaseIndex-1;
                // //检查这一阶段该任务的父任务是否全部完成
                let testPhase = this.editableTabs[index]
                // console.log('[Index]',index)
                // console.log('[current][Task]',this.currentTask)
                // console.log('[current][PhaseContent]',testPhase.content)
                // let tmp = this.getTaskById(this.currentTask.fartherId,[testPhase.content])
                // console.log('[current][fatherId]',tmp.thisId)
                let node = this.currentTask
                while(1){
                    if(node.fartherId === 0){
                        return node.image_url === this.doneurl;
                    }
                    node = this.getTaskById(node.fartherId,[testPhase.content])
                    if(node.image_url !== this.doneurl ){
                        return false
                    }
                }

                // return this.judgePhaseCompleted([testPhase.content])
            },
            getTaskById(taskId,array){
                for(let item of array){
                    if(item.thisId === taskId){
                        return item
                    }
                    if(item.children){
                        return this.getTaskById(taskId,item.children)
                    }
                }
                return null;
            },
            //*****>


            //*****修改当前任务模块<
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
                        // console.log(judgeValidity[key])
                        duplicateApplication.push(key)
                    }
                    hash[judgeValidity[key]] = true
                }
                if (duplicateApplication !== undefined && duplicateApplication.length >0){
                    // console.log('发生冲突的小朋友',duplicateApplication)
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
                this.$request.post("/django/business/saveTask",taskData).then(res=>{
                    console.log(res)
                })
            },
            //*****>






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






