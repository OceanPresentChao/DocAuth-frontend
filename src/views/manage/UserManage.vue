

<template>
  <div>
    <div style="text-align: left">
      <el-input v-model="userName" style="width: 200px;margin-right: 10px ;" suffix-icon="User" placeholder="请输入名字" />
      <el-input v-model="phone" style="width: 200px;margin-right: 10px" suffix-icon="Iphone" placeholder="请输入电话号" />
      <el-select class="selectStyle" value-key="id"  v-model="roleSelection" clearable placeholder="请选择想要查询的角色" :popper-append-to-body='false' effect=dark style="width:200px ">
        <el-option class="selectStyle1" v-for=" item in allRoles" :key="item.roleId" :label="item.rolename" :value="item" style="width: 100% ;color: #55e0e5;text-align: center" />
      </el-select>
      <el-button type="primary" style="margin-left: 20px" @click="likeSerach">
        <el-icon><Search /></el-icon>搜索
      </el-button>
      <el-button type="warning" @click="reset">
        <el-icon><Minus /></el-icon>重置
      </el-button>
    </div>

    <!-- 多个按钮栏   -->
    <div style="text-align: left ;margin-top: 10px;margin-bottom: 10px">
      <el-button type="primary" @click="handleLogin">
        <el-icon style="margin-right: 10px">
          <Star />
        </el-icon>注册新用户<i class="el-icon-circle-plus-outline" style="margin-left: 5px" />
      </el-button>
      <el-popconfirm
              style="margin-left: 5px"
              confirm-button-text="yes"
              cancel-button-text="No"
              icon-color="#626AEF"
              title="Are you sure to delete this?"
              @confirm="delBatch"
      >
        <template #reference>
          <el-button slot="reference" type="danger">
            <el-icon style="margin-right: 10px">
              <CloseBold />
            </el-icon>批量删除<i class="el-icon-delete" style="margin-left: 5px " />
          </el-button>
        </template>
      </el-popconfirm>
      <el-button type="primary" style="margin-left: 15px" @click="exp">
        导出 <i class="el-icon-top" />
      </el-button>
      <el-upload action="http://localhost:8081/user/import" :show-file-list="false" accept="xlsx" :on-success="handleExcelImportSuccess" style="display: inline-block">
        <el-button type="primary" style="margin-left: 15px">
          导入 <i class="el-icon-bottom" />
        </el-button>
      </el-upload>
    </div>

    <!-- 表格   -->
    <el-table :data="tableData" border stripe :header-cell-class-name="headerBg" @selection-change="handleSelectionChange">
      >
      <el-table-column type="selection" align="center" width="40" />
      <el-table-column prop="id" align="center" label="用户ID" width="100"  sortable />
      <el-table-column prop="username" align="center" label="用户名" width="100"  sortable />
      <el-table-column prop="phone" align="center" label="电话号" width="100"   sortable/>
      <el-table-column prop="gender" align="center" label="性别" width="70" />
      <el-table-column prop="email" align="center" label="邮箱" width="150"  sortable/>
      <el-table-column prop="date_joined" align="center" label="注册日期"  sortable  />
      <el-table-column label="启用" align="center" width="100">
        <template #default="{ row, $index }">
          <el-switch v-model="row.is_active" active-color="#13ce66" inactive-color="#ccc" @change="changeEnable(row)" />
        </template>
      </el-table-column>
      <el-table-column align="center" label="编辑用户信息" width="100">
        <template #default="{ row, $index }">
          <el-button type="primary" round @click="handleEditPersonalInformation(row)">
            <el-icon style="color: #55e0e5 ;margin-right: 10px">
              <Edit />
            </el-icon>编辑
          </el-button>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作">
        <template #default="{ row, $index }">
          <el-button type="success" round @click="handleManageAuthority(row)">
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
            @confirm="deleteUser(row.id)"

          >
            <template #reference>
              <el-button slot="reference" type="danger" round>
                <el-icon style="margin-right: 10px">
                  <DeleteFilled />
                </el-icon>删除
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 信息修改   -->
    <el-dialog v-model="infodialogFormVisible" title="用户信息" width="40%">
<!--      <Avatar style="width: 20px ; height: 10px;margin-top: 2px" />-->
      <el-form label-width="80px">
        <el-form-item label="用户ID" :label-width="formLabelWidth">
          <el-input v-model="form.id" autocomplete="off" :disabled="true" />
        </el-form-item>
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off" />
        </el-form-item>
        <el-form-item label="真实姓名" :label-width="formLabelWidth" :disabled="true">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="电话号" :label-width="formLabelWidth">
          <el-input v-model="form.phone" autocomplete="off" />
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-select v-model="form.gender" clearable placeholder="请选择性别" style="width: 100% " popper-class="selectFrom">
            <el-option v-for="(item) in genders" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="infodialogFormVisible = false">
          取 消
        </el-button>
        <el-button type="success" @click="saveuserInfor">
          确 定
        </el-button>
      </div>
    </el-dialog>
    <!-- 注册   -->
    <el-dialog v-model="loginDialogFormVisible" title="注册新用户" width="40%">
      <el-form label-width="80px">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="loginForm.username" autocomplete="off" />
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="loginForm.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" :disabled="true">
          <el-input v-model="loginForm.password" autocomplete="off" />
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-select v-model="loginForm.gender" clearable placeholder="请选择性别" style="width: 100%">
            <el-option v-for="(item) in genders" :key="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="电话号" :label-width="formLabelWidth">
          <el-input v-model="loginForm.phone" autocomplete="off" />
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="loginForm.email" autocomplete="off" />
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="loginDialogFormVisible = false">
          取 消
        </el-button>
        <el-button type="success" @click="saveLoginInfor">
          确 定
        </el-button>
      </div>
    </el-dialog>
    <!-- 角色权限管理   -->
    <el-dialog v-model="authDialogFormVisible" title="用户权限管理" width="50%">
      <el-form style="text-align: left">
        <el-form-item label="管理角色">
          <el-select v-model="thisUserRoles" value-key="roleId"  class="el-scrollbar" multiple clearable :popper-append-to-body="false" placeholder="请选择角色" style="width:100% " effect="dark">
            <el-option v-for=" item in allRoles" :key="item.roleId" :label="item.rolename" :value="item" style="width: 100% ;color: #55e0e5 ;text-align: center" />
          </el-select>
        </el-form-item>
        <el-form-item label="管理功能">
          <el-select v-model="thisUserFunctions" value-key="id" multiple clearable :popper-append-to-body="false" placeholder="请选择想额外赋予该用户的功能权限" style="width:100% " effect="dark" @change="changeValue">
            <el-option v-for="item in allFunctions" :key="item.id" :label="item.name" :value="item" style="width: 100% ;color: #55e0e5 ;text-align: center" />
          </el-select>
        </el-form-item>
      </el-form>

      <el-table :data="thisUserFunctions" style="width: 100%;margin-bottom: 50px" border stripe :header-cell-class-name="headerBg">
        <el-table-column prop="id" align="center" label="AuthorityId" width="100"/>
        <el-table-column prop="name" align="center" label="Name" width="180" />
        <el-table-column prop="key" align="center" label="Key" width="180" />
        <el-table-column prop="status" align="center" label="Status" />
        <el-table-column prop="parent" align="center" label="Parent" />
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button type="success" @click="saveAuthorityInfor">
          确 定
        </el-button>
        <el-button @click="authDialogFormVisible = false">
          退出
        </el-button>
      </div>
    </el-dialog>
    <!--    下面为页面转换按钮 -->
    <div style="padding: 10px 0">
      <el-pagination

        :current-page="page"
        :page-sizes="[2, 5, 10, 20]"
        :page-size="page_size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
  import { Apple, Edit,  Loading, Menu, Search, Share } from '@element-plus/icons-vue'
  import { InfoFilled } from '@element-plus/icons-vue'


  export default {

    name: 'UserManage',

    components: {
      Search,
      Loading,
      Edit,
      Share,
      Apple,
      InfoFilled,
      Menu,
    },
    data() {
      return {
        userName: '',
        roleSelection: null,
        phone: '',
        headerBg: 'headerBg',
        tableData: [],
        total: 0,
        page: 1,
        page_size: 5,
        nickname: '',
        email: '',
        form: {},
        loginForm: {},
        formLabelWidth: '80px',
        infodialogFormVisible: false,
        loginDialogFormVisible: false,
        authDialogFormVisible: false,
        genders: ['男', '女', '未知'],
        allRoles: [],
        allFunctions: [], // 全部可选的功能权限
        thisUserRoles: [],  //该用户已分配的角色
        thisUserFunctions: [], // 该用户已经拥有的权限

        membership: '',
        realName: '',
        position: '',
        authorityKey: '',
        menuData: [],
        multipleSelection: [],
        menuDialogVis: false,
        props: {
          label: 'name',
        },
        expends: [],
        checks: [],
        roleId: 0,
        roleFlag: '',

      }
    },
    created() {
      this.load()
      this.initRoles()
      this.initFunctions()
    },
    methods: {
      changeValue(value) {
        console.log('value', value)
      },
      reset() {
        this.userName = ''
        this.phone = ''
        this.roleSelection = null
        this.load()
      },
      saveLoginInfor() {
        this.$request.post('/django/user', this.loginForm).then((res) => {
          console.log(res)
          if (res.status === 201) {
            ElMessage({
              showClose:true,
              message:'注册成功',
              type:'success'
            })
            this.loginDialogFormVisible = false
            this.load()
          }
          else {
            ElMessage({
              showClose:true,
              message:'注册失败',
              type:'error'
            })
          }
        })
      },
      //多条件模糊查询
      likeSerach(){
        this.$request.get('/django/user/like',{
          params:{
            userName: this.userName,
            phone: this.phone,
            role: this.transferLikeSerachOfRole(this.roleSelection),
            pageNum: this.page,
            pageSize: this.page_size,
          }
        }).then(res=>{
          this.tableData = res.data.data.records
          // console.log('[DETECT][like]',res.data)
        })
      },
      transferLikeSerachOfRole(detect){
        if(detect === null){
          return ''
        }else{
          return detect.rolename
        }
      },
      load() {
        // 请求分页查询
        this.$request.get('/django/user/list', {
          params: {
            page: this.page,
            page_size:this.page_size,
            userName: null,
            phone: null,
            role: null,
          },
        }).then((res) => {
          // console.log('[Infor][Page]',res)
          this.tableData = res.data.data.results
          this.total = res.data.data.count
        })
      },
      deleteUser(id) {
        this.$request.delete('/django/user/one',{
          params: {
                    id : id
          }
        }).then(res => {
          if (res.status === 200) {
            ElMessage({
              showClose:true,
              message:'删除成功',
              type:'success'
            })
            this.dialogFormVisible = false
            this.load()
          }
          else {
            ElMessage({
              showClose:true,
              message:'删除失败',
              type:'error'
            })
          }
          // console.log(res)
        })
      },
      handleLogin() {
        this.loginDialogFormVisible = true
        this.form = {}
      },
      handleEditPersonalInformation(row) {
        this.form = row
        console.log(row)
        this.infodialogFormVisible = true
      },
      handleSizeChange(pageSize) {
        console.log(pageSize)
        this.page_size = pageSize
        this.load()
      },
      handleCurrentChange(pageNum) {
        console.log(pageNum)
        this.page = pageNum
        this.load()
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      initRoles(){
        this.allRoles = []
        let roleParam = {}
        roleParam.pageNum = 1;
        roleParam.pageSize = 99999;
        roleParam.roleName = '';
        // console.log(roleParam)
        this.$request.get('/django/permission/role/list',{
          params:{
            pageSize: roleParam.pageSize,
            pageNum : roleParam.pageNum,
            roleName : roleParam.roleName
          }
        }).then(res=>{
          console.log(res)
          this.allRoles = res.data.data.records
          console.log('[DETECT][Roles]',res.data.data.records)
        })
      },
      delBatch() {
        const ids = this.multipleSelection.map(v => v.id) // 将对象数组变成纯ID的数组
        console.log(this.multipleSelection)
        console.log(ids)
        this.$request.delete('/django/user/ids', {
          params: {
            ids,
          },
        }).then((res) => {
          console.log(res)
          if (res.data.code === 200) {
            ElMessage({
              showClose :true,
              message : '辞退成功',
              type:'success'
            })
            this.load()
          }
          else {
            ElMessage({
              showClose :true,
              message : '辞退成功',
              type:'error'
            })
          }
          this.load()
        })
      },
      saveuserInfor() {
        // console.log('[DETECT][saveUser]',this.form)
        let tmp = this.form
        this.$request.put("/django/user/upduser",this.form).then(res =>{
          console.log('[DETECT][res]',res)
          if(res.data.code === 200){
            ElMessage({
                showClose : true,
                message : res.data.message,
                type :'success'
            })
            this.load()
          }
          else{
              ElMessage({
                  showClose : true,
                  message : '修改失败',
                  type :'error'
              })
          }
          this.infodialogFormVisible = false
        })
      },
      handleManageAuthority(row) {
        this.id = row.id
        this.role = row.role
        console.log('[id]',this.id)
        //获得当前用户所拥有的角色
        this.$request.get('/django/permission/user/role', {
          params:{
            userid: this.id
          }
        }).then(res => {
          this.thisUserRoles = res.data.data.roles
          console.log('[INFOR][userRoles]',res)

        })
        // 得到所有给该用户开小灶的权限
        this.$request.get('/django/permission/user/function', {
          params: {
            userId: this.id,
          },
        }).then((res) => {
          this.thisUserFunctions = res.data.data.functions
          console.log('[INFOR][userFuntion]',res)
        })
        this.authDialogFormVisible = true
      },
      initFunctions(){
            this.$request.get('/django/permission').then(res=>{
                this.allFunctions = []
                // console.log('[Infor][res]',res.data.data)
                this.allFunctions = res.data.data
                // console.log('[Infor][allFuntions]',this.allFunctions)
            })
        },
      saveAuthorityInfor() {
        const data = {}
        data.userId = this.id
        data.extraFunctionList = []
        data.rolesList = []
        // console.log('[userFunctions]',this.thisUserFunctions)
        // console.log('[userRoles]',this.thisUserRoles)
        let tmp = {}
        for (const item of this.thisUserFunctions) {
          tmp.id = item.id
          tmp.enable = item.enable
          data.extraFunctionList.push(tmp)
          tmp = {}
        }
        tmp ={}
        for(const item of this.thisUserRoles){
          tmp.id = item.roleId
          tmp.name = item.roleName
          tmp.enable = item.enable
          data.rolesList.push(tmp)
          tmp = {}
        }
        console.log('[Info][saveAuth]', data)
        let dataOfFuntions={}
        dataOfFuntions.userId = data.userId
        dataOfFuntions.extraFunctionList = data.extraFunctionList
        //更新小灶信息
        this.$request.put('/django/permission/user/function', dataOfFuntions).then(res => {
          // console.log('[Function]',res)
          if (res.status === 200) {
            ElMessage({
              showClose :true,
              message : '开小灶成功',
              type:'success'
            })
            this.load()
          }
          else {
            ElMessage({
              showClose :true,
              message : '系统错误，开小灶失败',
              type:'error'
            })
          }
        })
        //更新用户角色信息
        let dataOfRoles={}
        dataOfRoles.userId = data.userId
        dataOfRoles.roleIds = data.rolesList.map(v => v.id)
        this.$request.put('/django/permission/user/role',dataOfRoles).then(res=>{
          // console.log('[DETECT][saveRoles]',res)
          if (res.status === 200) {
            ElMessage({
              showClose :true,
              message : '角色分配成功',
              type:'success'
            })
            this.load()
          }
          else {
            ElMessage({
              showClose :true,
              message : '系统错误，角色分配失败',
              type:'error'
            })
          }
        })
        // console.log('[Param][userRoles]',dataOfRoles)
        // console.log('[Param][userFunctions]',dataOfFuntions)
        this.authDialogFormVisible = false
      },



      changeEnable(row) {},


      exp() {
        // window.open()
      },
      handleExcelImportSuccess() {
        this.$message.success('导入成功')
        this.load()
      },



    },

  }
</script>




<style scoped >
  :deep(.headerBg){
    background: #55e0e5!important;
  }
</style>

<style lang="scss" scoped>
  .searchBox {
    position: absolute;
    top: 40px;
    right: 50px;
  }
  .body ::v-deep .el-input__inner{
    background-color: rgba(255, 255, 255, 0.247);
  }
</style>

<style lang="scss" scoped>
  .el-select {
    width: 150px;
  }
  .input-with-select .el-input-group__prepend {
    background: rgba(10, 30, 55, 0.7);
    box-shadow: 0 4px 4px rgba(49, 49, 49, 0.5);
  }
  .el-input-group {
    line-height: normal;
    display: inline-table;
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    // height: 46px;
    .el-input-group__append,
    .el-input-group__prepend {
      /*background-color: rgba(10, 30, 55, 0.7);*/
    }
  }
  .el-input__inner {
    /*background: rgba(10, 30, 55, 0.7);*/
  }
  // 修改下拉菜单背景颜色
  .el-scrollbar {
    background: #1d2f46;
    border-radius: 6px;
  }
  //下拉背景
  .el-card.is-hover-shadow:focus,
  .el-card.is-hover-shadow:hover,
  .el-color-picker__panel,
  .el-menu--popup,
  .el-message-box,
  .el-picker-panel .el-time-panel,
  .el-picker__popper.el-popper[role='tooltip'],
  .el-popover.el-popper,
  .el-select-v2__popper.el-popper[role='tooltip'],
  .el-select__popper.el-popper[role='tooltip'],
  .el-table-filter {
    opacity: 0.8;
    border-radius: 6px;
  }
  .el-popper__arrow {
    display: none;
  }
  .el-select-dropdown__item {
    color: #fff;
  }
  //修改输入框背景颜色
  .el-input-group.el-input__inner {
    box-shadow: 0px 4px 4px rgba(49, 49, 49, 0.5);
    background: rgba(10, 30, 55, 0.7);
    width: 260px;
    height: 46px;
    border-left: 0;
    border-right: 0;
    font-size: 14px;
  }
  .el-input-group--prepend .el-input__inner,
  .el-input-group__append {
    background: rgba(10, 30, 55, 0.7);
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
  .el-input-group__append {
    border-left: 0;
  }
  .el-select-dropdown__wrap,
  .el-scrollbar__wrap,
  .el-scrollbar__wrap--hidden-default {
    background: rgba(10, 30, 55, 0.7);
  }
  //修改输入框字体
  .el-input-group--append .el-input__inner,
  .el-input-group__prepend {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.67);
  }
  //修改下拉框的字体
  .el-select-dropdown__list{
    padding: 5px;
    text-align: center;
    //修改单个的选项的样式
    .el-select-dropdown__item {
      padding: 0 0.2rem 0 0.2rem;
      color: rgba(10, 30, 55, 0.7);
      font-size: 16px;
    }
    .el-select-dropdown__item.selected {
      color: rgba(10, 30, 55, 0.7);
    }
    //item选项的hover样式
    .el-select-dropdown__item.hover,
    .el-select-dropdown__item:hover {
      background-color: #67b784;
    }
  }
  // 修改下拉箭头左侧字体大小颜色
  .el-input-group__append button.el-button,
  .el-input-group__append div.el-select .el-input__inner,
  .el-input-group__append div.el-select:hover .el-input__inner,
  .el-input-group__prepend button.el-button,
  .el-input-group__prepend div.el-select .el-input__inner,
  .el-input-group__prepend div.el-select:hover .el-input__inner {
    color: #ffff ;
    font-size: 16px;
  }
  // 修改鼠标选中输入框时输入框的颜色
  :deep(input.el-input__inner:focus) {
    border-color: #fff;
  }
</style>
