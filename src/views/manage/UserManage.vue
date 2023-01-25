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
      test: 'nihaoadsasdfssdfsfsdada',
      userName: '',
      headerBg: 'headerBg',
      roleSelction: 'wseber',
      tableData: [
        {
          userid: 10,
          username: 'dasdsa',
          phone: '6465464654',
          email: 'sdsadsa@qq.com',
          regdate: '2022-11-24 21:14:31.000000',
          password: 'sasdsasadas',
          gender: '男',
          role: ['wseber'],
          enable: true,
        },
        {
          userid: 10,
          username: 'dasdsa',
          phone: '6465464654',
          email: 'sdsadsa@qq.com',
          regdate: '2022-11-24 21:14:31.000000',
          password: 'sasdsasadas',
          gender: '男',
          role: ['wseber'],
          enable: true,
        },
        {
          userid: 10,
          username: 'dasdsa',
          phone: '6465464654',
          email: 'sdsadsa@qq.com',
          regdate: '2022-11-24 21:14:31.000000',
          password: 'sasdsasadas',
          gender: '男',
          enable: true,
        },
        {
          userid: 10,
          username: 'dasdsa',
          phone: '6465464654',
          email: 'sdsadsa@qq.com',
          regdate: '2022-11-24 21:14:31.000000',
          password: 'sasdsasadas',
          gender: '男',
          enable: true,
        },
        {
          userid: 10,
          username: 'dasdsa',
          phone: '6465464654',
          email: 'sdsadsa@qq.com',
          regdate: '2022-11-24 21:14:31.000000',
          password: 'sasdsasadas',
          gender: '男',
          enable: true,
        },
        {
          userid: 10,
          username: 'dasdsa',
          phone: '6465464654',
          email: 'sdsadsa@qq.com',
          regdate: '2022-11-24 21:14:31.000000',
          password: 'sasdsasadas',
          gender: '男',
          role: ['wseber'],
          enable: true,
        },
      ],
      total: 0,
      pageNum: 1,
      pageSize: 5,
      nickname: '',
      phone: '',
      email: '',
      form: {},
      loginForm: {},
      formLabelWidth: '80px',
      infodialogFormVisible: false,
      loginDialogFormVisible: false,
      authDialogFormVisible: false,
      genders: ['男', '女', '未知'],
      roles: ['项目经理', '老板', '普通员工', '总经理', 'wseber'],
      role: [],
      allFunctions: [
        {
          id: 1,
          name: '修改个人信息',
          key: 'modifyPersonalInformation',
          status: '已启用',
        },
        {
          id: 2,
          name: '创建项目',
          key: 'modifyPersonalInformation',
        },
        {
          id: 3,
          name: '删除用户',
          key: 'modifyPersonalInformation',
          status: '已启用',

        },
        {
          id: 4,
          name: '修改用户信息',
          key: 'modifyPersonalInformation',
          status: '已启用',
        },
        {
          id: 5,
          name: '嘤嘤嘤',
          key: 'modifyPersonalInformation',
          status: '已启用',
        },
      ], // 全部可选的功能权限

      thisUserFunctions: [
        {
          id: 1,
          name: '修改个人信息',
          key: 'modifyPersonalInformation',
          status: 1,
          enable: true,
        },
        {
          id: 2,
          name: '创建项目',
          key: 'modifyPersonalInformation',
          status: 1,
          enable: true,
        },
        {
          id: 3,
          name: '删除用户',
          key: 'modifyPersonalInformation',
          status: 1,
          enable: true,

        }], // 该用户已经拥有的权限

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

    // this.load()

  },

  methods: {
    selectMenu(role) {
      this.roleId = role.id
      this.menuDialogVis = true
      console.log(`${role.authorityKey}这里是该角色的权限键值`)
      this.roleFlag = role.authorityKey

      this.$request.get('/menu', {
        params: {
          name: '',
        },
      }).then((res) => {
        this.menuData = res
        this.expends = this.menuData.map(v => v.id)
      })
      this.$request.get(`/employee/rolemenu/${this.roleId}`).then((res) => {
        this.checks = res.data
        this.menuDialogVis = true

        this.$request.get('/menu/ids').then((r) => {
          const ids = r.data
          ids.forEach((id) => {
            if (!this.checks.includes(id))
              this.$refs.tree.setChecked(id, false)
          })
        })
      })
    },

    changeValue(value) {
      console.log('value', value)
      console.log(this.test, 'thie.test')
    },

    reset() {
      this.userName = ''
      this.phone = ''
      // let f  = new FormData()
      // f.append("current",1);
      // f.append("size", 2);
      // f.append("tableName", 3);
      // console.log(f)
      // this. ="",
      // this.load()
    },
    saveLoginInfor() {
      this.$request.post('/api/v1/user/', this.loginForm).then((res) => {
        if (res.code === 219) {
          this.$message.success('注册成功')
          this.dialogFormVisible = false
          this.load()
        }
        else {
          this.$message.error('注册失败')
        }
      })
    },
    handleEditPersonalInformation(row) {
      this.form = row
      console.log(row)
      this.infodialogFormVisible = true
    },
    handleAdd() {
      this.loginDialogFormVisible = true
      this.form = {}
    },
    handleEdit() {

    },
    handleManageAuthority(row) {
      this.userid = row.userid
      this.role = row.role
      // 获得当前用户所拥有的角色
      this.$request.get('/api/v1/permission/role/', {
        Params: {
          id: this.userid,
        },
      }).then((res) => {
        this.role = res
        console.log(res)
      })

      // 得到所有给该用户开小灶的权限
      this.$request.get('/api/v1/permission/extra/function/', {
        Params: {
          id: this.userid,
        },
      }).then((res) => {
        this.thisUserFunctions = res
      })
      this.authDialogFormVisible = true
    },
    saveAuthorityInfor() {
      const data = {}
      data.userId = this.userid
      data.extraFunctionList = []
      let tmp = {}
      for (const item of this.thisUserFunctions) {
        tmp.id = item.id
        tmp.enable = item.enable
        data.extraFunctionList.push(tmp)
        tmp = {}
      }
      console.log('这是数据', data)
      this.$request.put('/api/v1/permission/extra/function/', data).then((res) => {
        if (res.code === 219) {
          this.$message.success('保存成功')
          this.dialogFormVisible = false
          this.load()
        }
        else {
          this.$message.error('保存失败')
        }
      })
      console.log(this.thisUserFunctions)
      this.authDialogFormVisible = false
    },
    load() {
      // 请求分页查询
      this.$request.get('/api/v1/user/list', {
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          userName: this.userName,
          phone: this.phone,
          role: this.role,
        },
      }).then((res) => {
        console.log(res)
        this.tableData = res.records
        this.total = res.total
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
    handleSizeChange(pageSize) {
      console.log(pageSize)
      this.pageSize = pageSize
      this.load()
    },
    handleCurrentChange(pageNum) {
      console.log(pageNum)
      this.pageNum = pageNum
      this.load()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    delBatch() {
      const ids = this.multipleSelection.map(v => v.id) // 将对象数组变成纯ID的数组
      console.log(this.multipleSelection)
      console.log(ids)
      this.$request.delete('/api/v1/user/ids', {
        params: {
          ids,
        },
      }).then((res) => {
        console.log(res)
        if (res) {
          this.$message.success('批量辞退成功')
          this.dialogFormVisible = false
          this.load()
        }
        else {
          this.$message.error('批量辞退失败')
        }
      })
    },
    deleteUser(id) {
      this.$request.delete(`/api/v1/user/${id}`).then((res) => {
        if (res) {
          this.$message.success('删除成功')
          this.dialogFormVisible = false
          this.load()
        }
        else {
          this.$message.error('删除失败')
        }
      })
    },
    update() {
      console.log(this.form)
      // this.$request.post("/api/v1/user/"+this.form.userid , this.form).then(res =>{
      //   if(res.code === 223){
      //     this.$message.success("保存成功")
      //     this.dialogFormVisible = false
      //     this.load()
      //   }
      //   else{
      //     this.$message.error("保存失败")
      //   }
      //
      // })
    },
    changeEnable(row) {},

    exp() {
      window.open('http://localhost:9099/employee/export')
    },
    handleExcelImportSuccess() {
      this.$message.success('导入成功')
      this.load()
    },

    saveRoleMenu() {
      // console.log(this.$refs.tree.getCheckedNodes());
      this.request.post(`/employee/rolemenu/${this.roleId}`, this.$refs.tree.getCheckedKeys()).then((res) => {
        if (res) {
          this.$message.success('权限绑定成功')
          this.menuDialogVis = false

          console.log(this.roleFlag)
          if (this.roleFlag === 'MANAGER')
            this.$store.commit('logout')
        }
        else {
          this.$message.error('权限绑定失败')
        }
      })
    },

  },

}
</script>

<template>
  <div>
    <div style="text-align: left">
      <el-input v-model="userName" style="width: 200px;margin-right: 10px ;" suffix-icon="User" placeholder="请输入名字" />
      <el-input v-model="phone" style="width: 200px;margin-right: 10px" suffix-icon="Iphone" placeholder="请输入电话号" />
      <el-select v-model="roleSelction" clearable placeholder="请选择想要查询的角色" style="width:200px">
        <el-option v-for="(item) in roles" :value="item" />
      </el-select>
      <el-button type="primary" style="margin-left: 20px" @click="load">
        <el-icon><Search /></el-icon>搜索
      </el-button>
      <el-button type="warning" @click="reset">
        <el-icon><Minus /></el-icon>重置
      </el-button>
    </div>
    <div style="text-align: left ;margin-top: 10px;margin-bottom: 10px">
      <el-button type="primary" @click="handleAdd">
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

    <el-table :data="tableData" border stripe :header-cell-class-name="headerBg" @selection-change="handleSelectionChange">
      >
      <el-table-column type="selection" align="center" width="40" />
      <el-table-column prop="userid" align="center" label="用户ID" width="80"  />
      <el-table-column prop="username" align="center" label="用户名" width="100" />
      <el-table-column prop="phone" align="center" label="电话号"  />
      <el-table-column prop="gender" align="center" label="性别" width="50" />
      <el-table-column prop="email" align="center" label="邮箱" width="150" />
      <el-table-column prop="regdate" align="center" label="注册日期"  />
      <el-table-column label="启用" align="center" width="100">
        <template #default="{ row, $index }">
          <el-switch v-model="row.enable" active-color="#13ce66" inactive-color="#ccc" @change="changeEnable(row)" />
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
            @confirm="deleteUser(row.userid)"
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

    <el-dialog v-model="infodialogFormVisible" title="用户信息" width="40%">
      <el-form label-width="80px">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off" />
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="form.role" multiple clearable placeholder="请选择角色" style="width: 100% ;color: #42b983" effect="dark">
            <el-option v-for=" item in roles" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="用户ID" :label-width="formLabelWidth">
          <el-input v-model="form.userid" autocomplete="off" :disabled="true" />
        </el-form-item>
        <el-form-item label="电话号" :label-width="formLabelWidth">
          <el-input v-model="form.phone" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" :disabled="true">
          <el-input v-model="form.password" autocomplete="off" />
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
        <el-button type="success" @click="update">
          确 定
        </el-button>
      </div>
    </el-dialog>

    <el-dialog v-model="loginDialogFormVisible" title="注册新用户" width="40%">
      <el-form label-width="80px">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="loginForm.username" autocomplete="off" />
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

    <el-dialog v-model="authDialogFormVisible" title="用户权限管理" width="40%">
      <el-form style="text-align: left">
        <el-form-item label="管理角色">
          <el-select v-model="role" class="el-scrollbar" multiple clearable :popper-append-to-body="false" placeholder="请选择角色" style="width:100% " effect="dark">
            <el-option v-for=" item in roles" :value="item" style="width: 100% ;color: #55e0e5" />
          </el-select>
        </el-form-item>
        <!--        <el-form-item label="管理功能" > -->
        <!--          <el-select value-key = "id"   clearable v-model="selectedFunctions"   :popper-append-to-body='false' @change="changeValue" placeholder="请选择想额外赋予该用户的功能权限" style="width:100% " effect="dark"> -->
        <!--            <el-option v-for="item in allFunctions" :lable="item.name" :key="item.id" :value="item" style="width: 100% ;color: #55e0e5"></el-option> -->
        <!--            <el-option v-for="item in allFunctions" :label="item.name" :key="item.id" :value="item" style="width: 100% ;color: #55e0e5"></el-option> -->
        <!--          </el-select> -->
        <!--                  <el-button type="primary" @click="addThisUserAuth" size="large">增加权限</el-button> -->
        <!--        </el-form-item> -->
        <el-form-item label="管理功能">
          <el-select v-model="thisUserFunctions" value-key="id" multiple clearable :popper-append-to-body="false" placeholder="请选择想额外赋予该用户的功能权限" style="width:100% " effect="dark" @change="changeValue">
            <el-option v-for="item in allFunctions" :key="item.id" :label="item.name" :value="item" style="width: 100% ;color: #55e0e5" />
          </el-select>
        </el-form-item>
      </el-form>

      <el-table :data="thisUserFunctions" style="width: 100%;margin-bottom: 50px" border stripe :header-cell-class-name="headerBg">
        <el-table-column prop="id" align="center" label="AuthorityId" />
        <el-table-column prop="name" align="center" label="Name" width="180" />
        <el-table-column prop="key" align="center" label="Key" width="180" />
        <el-table-column prop="status" align="center" label="Status" />
        <el-table-column align="center" label="仅禁用此用户的此权限">
          <template #default="{ row, $index }">
            <el-switch v-model="row.enable" active-color="#13ce66" inactive-color="#ccc" @change="changeEnable(row)" />
            <!--              <el-button  type="danger" round slot="reference" ><el-icon style="margin-right: 10px ;size: A4"><DeleteFilled /></el-icon>收回权限</el-button> -->
          </template>
        </el-table-column>
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

</style>

<style scoped>
  .headerBg{
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

<style lang="scss">
  .el-select {
    width: 115px;
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
  .el-input-group > .el-input__inner {
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
  .el-select-dropdown__list {
    padding: 5px;
    text-align: center;
    //修改单个的选项的样式
    .el-select-dropdown__item {
      padding: 0 0.2rem 0 0.2rem;
      color: #ffff;
      font-size: 16px;
    }
    .el-select-dropdown__item.selected {
      color: #ffff;
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
    color: #ffff !important;
    font-size: 16px;
  }
  // 修改鼠标选中输入框时输入框的颜色
  input.el-input__inner:focus {
    border-color: #fff;
  }
</style>
