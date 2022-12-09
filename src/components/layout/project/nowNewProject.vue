<template>
    <div id="nowNewProject">

        <TreeChart :json="data" :class="{landscape: 1}" @click-node="clickNode" />
        <div class="gl_prs_ctn" :style='[contextstyle]'>
            <ul class='gl_prs_li'>
                <li ><el-button type="primary" @click="addNode">添加子分支 </el-button></li>
                <li ><el-button type="success" @click="applyEmployees">人员安排</el-button></li>
                <li ><el-button type="danger"  @click="deleteNode">删除分支</el-button></li>
                <li ><el-button type="info" @click="shutDown">关闭此栏</el-button></li>
            </ul>
        </div>

        <el-dialog v-model="dialogFormVisible" title="人员安排">
            <el-form :model="form">
                <el-form-item label="任务名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off" />
                </el-form-item>
                <el-form-item label="任务持续时间" :label-width="formLabelWidth" >
                <el-date-picker
                        v-model="startTime"
                        type="datetime"
                        placeholder="任务开始时间"
                        style="margin-right: 50px"
                />
               <el-date-picker
                            v-model="deadLine"
                            type="datetime"
                            placeholder="任务截止时间"
                />
                </el-form-item>
                <el-form-item label="编" :label-width="formLabelWidth">
                    <el-select value-key="userid" v-model="form.editPerson" :popper-append-to-body='false' placeholder="请选择人员" effect="dark">
                        <el-option v-for="item in users" :label="item.username" :key="item.userid" :value="item.userid" style="width: 100% ;color: #55e0e5"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="审" :label-width="formLabelWidth">
                    <el-select v-model="form.investigatePerson" placeholder="请选择人员" effect="dark">
                        <el-option v-for="item in users" :label="item.username" :key="item.userid" :value="item.userid" style="width: 100% ;color: #55e0e5"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="批" :label-width="formLabelWidth">
                    <el-select v-model="form.ratifyPerson" placeholder="请选择人员" effect="dark">
                        <el-option v-for="item in users" :label="item.username" :key="item.userid" :value="item.userid" style="width: 100% ;color: #55e0e5"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="会签" :label-width="formLabelWidth" >
                    <el-select v-model="form.con_signPerson1" placeholder="请选择人员1" style="margin-right: 50px ;" effect="dark">
                        <el-option v-for="item in users" :label="item.username" :key="item.userid" :value="item.userid" style="width: 100% ;color: #55e0e5"></el-option>
                    </el-select>
                    <el-select v-model="form.con_signPerson2" placeholder="请选择人员2" effect="dark">
                        <el-option v-for="item in users" :label="item.username" :key="item.userid" :value="item.userid" style="width: 100% ;color: #55e0e5"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="任务内容概述" :label-width="formLabelWidth">
                    <el-input v-model="form.desc" type="textarea" />
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

    export default {
        name: 'nowNewProject',
        components: {
            TreeChart
        },
        data() {
            return {
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
                    },],

                idnum:5,
                tag:0,
                now:'',
                landscape: [],
                data: {
                    name: 'root',
                    image_url: "https://static.refined-x.com/static/avatar.jpg",
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
                },
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
                this.now = node.name
                //console.log(node.name)
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
                if(this.now==='root') return
                this.tag =0;
                this.findChild([this.data])
                this.shutDown();
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
            addNode(){
                this.tag =0;
                this.addreal([this.data])
                this.shutDown();
            },
            addreal(array){
                for(let i in array)
                {
                    //console.log(array[i].name);
                    if(array[i].name === this.now){
                        console.log('findit');
                        this.tag = 1;
                        this.idnum=this.idnum+1;
                        array[i].children.push({
                            name: this.idnum,
                            image_url: "https://static.refined-x.com/static/avatar.jpg",
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
                console.log(this.form)
                this.dialogFormVisible = false
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
