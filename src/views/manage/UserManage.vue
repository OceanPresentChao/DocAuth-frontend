<template>
  <div>
    <div style="text-align: left">
      <el-input style="width: 200px;margin-right: 10px ;" suffix-icon="el-icon-search" placeholder="请输入名字" v-model="userName"></el-input>
      <el-input style="width: 200px;margin-right: 10px" suffix-icon="el-icon-phone" placeholder="请输入电话号" v-model="phone"></el-input>
      <el-select clearable v-model="role" placeholder="请选择想要查询的角色"  style= “width:100%”>
          <el-option v-for="(item) in roles" :value="item"></el-option>
      </el-select>
      <el-button type="primary" @click="load" style="margin-left: 20px">搜索</el-button>
      <el-button type="warning" @click="reset">重置</el-button>
    </div>

    <div style="text-align: left ;margin-top: 10px;margin-bottom: 10px">
      <el-button type="primary" @click="handleAdd">注册新用户<i class="el-icon-circle-plus-outline" style="margin-left: 5px"></i></el-button>
      <el-popconfirm
              style="margin-left: 5px"
              confirm-button-text='yes'
              cancel-button-text='No'
              :icon="InfoFilled"
              icon-color="#626AEF"
              title="Are you sure to delete this?"
              @confirm="delBatch">
       <template #reference>
         <el-button type="danger" slot="reference">批量删除<i class="el-icon-delete" style="margin-left: 5px "></i></el-button>
       </template>
      </el-popconfirm>
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
      <el-table-column align="center" label="编辑用户信息" width="150">
        <template #default="{row,$index}">
          <el-button  type="primary" round @click="handleEditPersonalInformation(row)">编辑</el-button>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" >
        <template #default="{row,$index}">
          <el-button  type="success" round @click="handleEdit(row)">权限管理</el-button>
          <el-popconfirm
                  style="margin-left: 5px"
                  confirm-button-text='yes'
                  cancel-button-text='No'
                  :icon="InfoFilled"
                  icon-color="#626AEF"
                  title="Are you sure to delete this?"
                  @confirm="deleteUser(row.userid)"
          >
            <template #reference>
              <el-button  type="danger" round slot="reference" >删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>


    </el-table>

    <el-dialog title="用户信息"  v-model="infodialogFormVisible" width="40%">
      <el-form label-width="80px">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-select clearable v-model="form.role" placeholder="请选择角色" style="width: 100%">
            <el-option v-for="(item,i) in roles" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户ID" :label-width="formLabelWidth" >
          <el-input v-model="form.userid" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="电话号" :label-width="formLabelWidth">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" :disabled="true">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-select clearable v-model="form.gender" placeholder="请选择性别" style="width: 100%">
            <el-option v-for="(item) in genders" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="infodialogFormVisible = false">取 消</el-button>
        <el-button type="success" @click="save">确 定</el-button>
      </div>
    </el-dialog>


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
  import * as ElementPlusIconsVue from '@element-plus/icons-vue'
  export default {
    name: "UserManage",
    data() {
      return {
        userName:'',
        tableData: [
          {
            userid: 10,
            username: "dasdsa",
            phone: '6465464654',
            email: 'sdsadsa@qq.com',
            regdate :'2022-11-24 21:14:31.000000',
            password:'sasdsasadas',
            gender:'男',

          },
          {
            userid: 10,
            username: "dasdsa",
            phone: '6465464654',
            email: 'sdsadsa@qq.com',
            regdate :'2022-11-24 21:14:31.000000',
            password:'sasdsasadas',
            gender:'男',
          },
          {
            userid: 10,
            username: "dasdsa",
            phone: '6465464654',
            email: 'sdsadsa@qq.com',
            regdate :'2022-11-24 21:14:31.000000',
            password:'sasdsasadas',
            gender:'男',
          },
          {
            userid: 10,
            username: "dasdsa",
            phone: '6465464654',
            email: 'sdsadsa@qq.com',
            regdate :'2022-11-24 21:14:31.000000',
            password:'sasdsasadas',
            gender:'男',
          },
          {
            userid: 10,
            username: "dasdsa",
            phone: '6465464654',
            email: 'sdsadsa@qq.com',
            regdate :'2022-11-24 21:14:31.000000',
            password:'sasdsasadas',
            gender:'男',
          },
        ],
        total: 0,
        pageNum: 1,
        pageSize: 5,
        nickname: "",
        phone: "",
        email: "",
        form: {},
        formLabelWidth:'80px',
        infodialogFormVisible: false,
        genders:['男','女','未知'],
        roles:['1','2','3'],
        role:'',


        membership:'',


        realName: "",
        position: "",


        authorityKey:'',
        menuData:[],
        multipleSelection:[],
        dialogFormVisible: false,
        menuDialogVis:false,
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
        this.userName =""
        this.phone = ""
        // this. ="",
        // this.load()
      },
      handleEditPersonalInformation(row){
        this.form = row
        console.log(row)
        this.infodialogFormVisible = true;

      },
      handleAdd(){
        this.dialogFormVisible = true
        this.form = {}
      },
      handleEdit(row){

        this.form = row
        this.dialogFormVisible = true
      },
      load(){
        //请求分页查询
        this.request.get("/api/v1/user/list",{
          params: {
            pageNum : this.pageNum,
            pageSize : this.pageSize,
            userName : this.userName,
            phone: this.phone,
            membership: this.membership,
          }
        }).then(res => {
          console.log(res)
          this.tableData=res.records
          this.total=res.total
        })
        // //浪费流量，需要后续优化
        // this.request.get("/employee").then(res =>{
        //
        //   // let arr1 = this.unique(res.data.rows)
        //   let flag =  this.unique(res.data.map(v => v.authorityKey))
        //   this.roles = flag
        //   console.log("这里是roles")
        //   console.log(this.roles)
        //
        // })
      },

      handleSizeChange(pageSize){
        console.log(pageSize)
        this.pageSize = pageSize
        this.load()
      },
      handleCurrentChange(pageNum){
        console.log(pageNum)
        this.pageNum = pageNum
        this.load()
      },
      handleSelectionChange(val){

        this.multipleSelection = val

      },
      delBatch(){
        let ids = this.multipleSelection.map(v => v.id) //将对象数组变成纯ID的数组
        console.log(this.multipleSelection)
        console.log(ids)
        this.request.delete("/api/v1/user/ids" ,{
          params: {
            ids : ids,
          }
        }).then(res =>{
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
      deleteUser(id){
        this.request.delete("/api/v1/user/"+ id).then(res =>{
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

      update(){
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
