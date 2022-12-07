<template>
  <div>
    <div style="text-align: left">
      <el-input style="width: 200px;margin-right: 10px ;" suffix-icon="el-icon-search" placeholder="请输入名字" v-model="username"></el-input>
      <el-input style="width: 200px;margin-right: 10px" suffix-icon="el-icon-phone" placeholder="请输入电话号" v-model="phone"></el-input>
      <el-select v-model="membership" placeholder="请选择会员等级">
        <el-option label="普通会员" value="普通会员"></el-option>
        <el-option label="白银会员" value="白银会员"></el-option>
        <el-option label="黄金会员" value="黄金会员"></el-option>
        <el-option label="铂金会员" value="铂金会员"></el-option>
        <el-option label="钻石会员" value="钻石会员"></el-option>
        <el-option label="超级大会员" value="超级大会员"></el-option>
      </el-select>
      <el-button type="primary" @click="load" style="margin-left: 20px">搜索</el-button>
      <el-button type="warning" @click="reset">重置</el-button>
    </div>

    <div style="text-align: left ;margin-top: 10px;margin-bottom: 10px">
      <el-button type="primary" @click="handleAdd">注册新用户<i class="el-icon-circle-plus-outline" style="margin-left: 5px"></i></el-button>
      <el-button type="danger" slot="reference">批量删除<i class="el-icon-delete" style="margin-left: 5px "></i></el-button>
      <el-button type="primary" @click="exp" style="margin-left: 5px">导出 <i class="el-icon-top"></i></el-button>
      <el-upload action="http://localhost:8081/user/import" :show-file-list="false" accept="xlsx" :on-success="handleExcelImportSuccess" style="display: inline-block">
        <el-button type="primary" style="margin-left: 5px">导入 <i class="el-icon-bottom"></i></el-button>
      </el-upload>
    </div>


    <el-table :data="tableData" border stripe :header-cell-class-name="headerBg" @selection-change="handleSelectionChange">>
      <el-table-column type="selection" align="center" width="40"></el-table-column>
      <el-table-column prop="userid" align="center" label="用户ID" width="120"></el-table-column>
      <el-table-column prop="username" align="center" label="用户名" width="100"></el-table-column>
      <el-table-column prop="phone" align="center" label="电话号" width="120"></el-table-column>
      <el-table-column prop="gender" align="center" label="性别" width="50"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="120"></el-table-column>
      <el-table-column prop="regdate" align="center" label="注册日期" width="200"></el-table-column>
      <el-table-column prop="membership" align="center" label="会员等级" width="80"></el-table-column>
      <el-table-column prop="account" align="center" label="账户余额" width="70"></el-table-column>
      <el-table-column align="center" label="编辑用户信息" width="90">
<!--        <template slot-scope="scope">-->
          <el-button size="mini" type="primary" @click="handleEditPersonalInformation(scope.row)">编辑</el-button>
<!--        </template>-->
      </el-table-column>

      <el-table-column align="center" label="操作" >
<!--        <template slot-scope="scope">-->
          <el-button size="mini" type="primary" @click="handleEdit(scope.row)">充值</el-button>
<!--          <el-popconfirm-->
<!--                  style="margin-left: 5px"-->
<!--                  confirm-button-text='确定'-->
<!--                  cancel-button-text='我再想想'-->
<!--                  icon="el-icon-info"-->
<!--                  icon-color="red"-->
<!--                  title="确认删除此记录？"-->
<!--                  @confirm="del(scope.row.userid)"-->
<!--          >-->
            <el-button size="mini" type="danger" slot="reference" >删除</el-button>
<!--          </el-popconfirm>-->
<!--        </template>-->
      </el-table-column>


    </el-table>



    <!--    下面为页面转换按钮-->
    <div style="padding: 10px 0">
      <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pageNum"
              :page-sizes="[2, 5, 10, 20]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
      </el-pagination>
    </div>

  </div>

</template>

<script>
  export default {
    name: "UserManage",
    data() {
      return {
        username:'',
        tableData: [
          {
            "userid": 10,
            "username": "dasdsa",
            "phone": '6465464654',
            "email": 'sdsadsa@qq.com',
            "regdate" :'2022-11-24 21:14:31.000000'
          },
          {
            "userid": 10,
            "username": "dasdsa",
            "phone": '6465464654',
            "email": 'sdsadsa@qq.com',
            "regdate" :'2022-11-24 21:14:31.000000'
          },
          {
            "userid": 10,
            "username": "dasdsa",
            "phone": '6465464654',
            "email": 'sdsadsa@qq.com',
            "regdate" :'2022-11-24 21:14:31.000000'
          },
          {
            "userid": 10,
            "username": "dasdsa",
            "phone": '6465464654',
            "email": 'sdsadsa@qq.com',
            "regdate" :'2022-11-24 21:14:31.000000'
          },
          {
            "userid": 10,
            "username": "dasdsa",
            "phone": '6465464654',
            "email": 'sdsadsa@qq.com',
            "regdate" :'2022-11-24 21:14:31.000000'
          },
        ],
        total: 0,
        pageNum: 1,
        pageSize: 5,

        userName: "",
        nickname: "",
        phone: "",
        email: "",
        address: "",

        realName: "",
        salary: "",
        position: "",


        authorityKey:'',
        menuData:[],
        form: {},
        multipleSelection:[],
        dialogFormVisible: false,
        menuDialogVis:false,
        formLabelWidth:"120",
        props:{
          label:'name'
        },
        expends:[],
        checks:[],
        roleId:0,
        roleFlag:'',

        headerBg: 'headerBg',

      }
    },

    created() {

      // this.load()

    },

    methods:{
      selectMenu(role){

        this.roleId  = role.id
        this.menuDialogVis =  true
        console.log(role.authorityKey+"这里是该角色的权限键值")
        this.roleFlag =role.authorityKey

        this.request.get("/menu" , {
          params:{
            name:"",
          }
        }).then(res=>{
          this.menuData = res
          this.expends = this.menuData.map(v=>v.id)

        })
        this.request.get("/employee/rolemenu/" + this.roleId).then(res=>{
          this.checks = res.data
          this.menuDialogVis = true

          this.request.get("/menu/ids").then(r =>{
            const ids = r.data
            ids.forEach(id => {
              if (!this.checks.includes(id)) {
                this.$refs.tree.setChecked(id, false)
              }
            })
          })

        })

      },

      reset(){
        this.position ="",
                this.salary = "",
                this.realName ="",
                this.load()
      },
      handleAdd(){
        this.dialogFormVisible = true
        this.form = {}
      },
      handleEdit(row){

        this.form = row
        this.dialogFormVisible = true
      },
      deleteEmployee(id){
        this.request.delete("/employee/"+ id).then(res =>{
          if(res){
            this.$message.success("删除成功")
            this.dialogFormVisible = false
            this.load()
          }
          else{
            this.$message.error("删除失败")
          }

        })
      },
      load(){
        this.request.get("/employee/page" , {
          params:{
            pageNum: this.pageNum ,
            pageSize: this.pageSize,

            position: this.position,
            salary: this.salary,
            // realName: this.realName,
          }
        }).then(res=>{
          // console.log(res)
          this.tableData = res.records
          this.total = res.total
        })

      },

      save(){
        this.request.post("/employee" , this.form).then(res =>{
          //console.log(res)
          if(res){
            this.$message.success("保存成功")
            this.dialogFormVisible = false
            this.load()
          }
          else{
            this.$message.error("保存失败")
          }

        })

      },

      handleSizeChange(pageSize){
        //console.log(pageSize)
        this.pageSize = pageSize
        // this.load()
      },
      handleCurrentChange(pageNum){
        // console.log(pageNum)
        this.pageNum = pageNum
        // this.load()
      },
      delBatch(){
        let ids = this.multipleSelection.map(v => v.id) //将对象数组变成纯ID的数组
        console.log(this.multipleSelection)
        this.request.post("/employee/del/batch" ,ids).then(res =>{

          console.log(res)

          if(res){
            this.$message.success("批量辞退成功")
            this.dialogFormVisible = false
            this.load()
          }
          else{
            this.$message.error("批量辞退失败")
          }

        })

      },
      handleSelectionChange(val){

        this.multipleSelection = val

      },
      exp(){
        window.open("http://localhost:9099/employee/export")
      },
      handleExcelImportSuccess(){
        this.$message.success("导入成功")
        this.load()
      },

      saveRoleMenu(){
        // console.log(this.$refs.tree.getCheckedNodes());
        this.request.post("/employee/rolemenu/" + this.roleId ,  this.$refs.tree.getCheckedKeys()).then(res =>{

          if(res){

            this.$message.success("权限绑定成功")
            this.menuDialogVis = false

            console.log(this.roleFlag)
            if(this.roleFlag === 'MANAGER'){
              this.$store.commit("logout")
            }
          }else {
            this.$message.error("权限绑定失败")
          }

        })
      },

    }



  }



</script>

<style>
  .headerBg{
    background: #55e0e5!important;
  }
</style>



<!--<script>-->
<!--export default {-->
<!--  setup() {-->
<!--    return {}-->
<!--  },-->
<!--}-->
<!--</script>-->

<!--<template>-->
<!--  <h1>用户管理</h1>-->
<!--  <div />-->
<!--</template>-->

<!--<style lang="scss" scoped>-->

<!--</style>-->
