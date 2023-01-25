<script>
export default {
  name: 'PermissionManage',

  data() {
    return {
      roleid:'',//角色id
      rolename:'',//角色姓名
      rstatus:'',//角色状态
      role:[],//某个角色



      //所有权限
      allfunctions:[
        {
          label: '创建',
          options: [
            {
              id: 1,
              name: '创建项目',
              key:'',
              status: true,
              key: ' ',
              parent:'0',
              addTime:'  '
            },
            {
              id: 2,
              name: '创建用户',
              key:'',
              status: true,
              key: ' ',
              parent:'0',
              addTime:'  '
            },
          ],
        },
        {
          label: '批阅',
          options: [
            {
              id: 11,
              name: '编',
              key:'',
              status: true,
              key: ' ',
              parent:'1',
              addTime:'  '
            },
            {
              id: 12,
              name:'审批',
              key:' ',
              status: true,
              key: ' ',
              parent:'1',
              addTime:'  '
            },
            {
              id: 13,
              name: '汇签',
              key:'',
              status: true,
              key: ' ',
              parent:'1',
              addTime:'  '
            },
          ],
        },
      ],

      tableData: [
        {
          roleid: 10,
          rolename: '项目经理',
          status: true,
          desc: ' sasdsfgdsfhd',
          addTime: '2022-1-25'
        },
        {
          roleid: 10,
          rolename: '项目经理',
          status: true,
          desc: ' ',
          addTime: '2022-1-25 21:00'
        },
        {
          roleid: 10,
          rolename: '项目经理',
          status: true,
          desc: ' ',
          addTime: '2022-1-25 21:00'
        },
        {
          roleid: 10,
          rolename: '项目经理',
          status: true,
          desc: ' ',
          addTime: '2022-1-25'
        },
        {
          roleid: 10,
          rolename: '项目经理',
          status: true,
          desc: ' ',
          addTime: '2022-1-25'
        },
        {
          roleid: 10,
          rolename: '项目经理',
          status: true,
          desc: ' ',
          addTime: '2022-1-25'
        },
      ],
      thisRoleFunctions:[],
      thisRoleFunctions1:[],
      newRole:{},
      AddRoleDialogFormVisible:false,
      FunctionDialogFormVisible:false,
      infodialogFormVisible:false,
    }
  },
  methods :{

    //加载所有角色
    load()
    {

    },
    reset()
    {

    },
    handleAdd()
    {
      this.AddRoleDialogFormVisible = true;
    },
    //
    delBatch()
    {

    },
    handleEditRoleInformation(row)
    {
      this.infodialogFormVisible = true;
    },
    loadThisRoleFunction()
    {
      // 获得当前角色所拥有的权限
      this.$request.get('/api/v1/permission/', {
        Params: {
          id: this.roleid,
        },
      }).then((res) => {
        this.thisRoleFunctions = res
        this.thisRoleFunctions1 = res
        console.log(res)
      })
    },
    handleManageFunction(row)
    {
      this.roleid = row.roleid;
      this.FunctionDialogFormVisible = true;
      this.loadThisRoleFunction();
    },
    handleConfirm()
    {
      this.FunctionDialogFormVisible = false;
      //当前处于this.roleid

      let List = [];
      for(let i = 0;i < this.thisRoleFunctions.length;i++)
      {
        List.push(this.thisRoleFunctions[i].id);
      }

      this.$request.put('/api/v1/permission/role/updfunction', {
        Params: {
          roleId: this.roleid,
          functionList: List,
        },
      }).then((res) => {
        //this.role = res
        console.log(res)
      })

    },

    // 删除当前角色所拥有的某个权限
    delfunction(row)
    {
      //当前处于this.roleid
      this.$request.delete('/api/v1/permission/role/delfunction', {
        Params: {
          roleId: this.roleid,
          functionId:row.id,
        },
      }).then((res) => {
        //this.role = res
        console.log(res)
      })
      this.loadThisRoleFunction();
    },
    cancelEditFunctionInfo()
    {
      FunctionDialogFormVisible = false;
      this.thisRoleFunctions = []
      this.thisRoleFunctions1  = []
    },
    //检测该权限是否已经在数据库中
    check(row)
    {
      if(this.thisRoleFunctions1.includes(row))
      {
        return true;
      }
      else
      {
        return false;
      }
    },

  },

}
</script>

<template>
  <div>
    <div style="text-align: left">
      <el-input v-model="roleName" style="width: 200px;margin-right: 10px ;" suffix-icon="Role" placeholder="请输入" />
      <el-button type="primary" style="margin-left: 20px" @click="load()">
        <el-icon><Search /></el-icon>搜索
      </el-button>
      <el-button type="warning" @click="reset()">
        <el-icon><Minus /></el-icon>重置
      </el-button>
    </div>
    <div style="text-align: left ;margin-top: 10px;margin-bottom: 10px">
      <el-button type="primary" @click="handleAdd()">
        <el-icon style="margin-right: 10px">
          <Star />
        </el-icon>添加新角色<i class="el-icon-circle-plus-outline" style="margin-left: 5px" />
      </el-button>
      <el-popconfirm
              style="margin-left: 5px"
              confirm-button-text="yes"
              cancel-button-text="No"
              icon-color="#626AEF"
              title="Are you sure to delete this?"
              @confirm="delBatch()"
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
      <el-table-column prop="roleid" align="center" label="角色ID" width="80"  />
      <el-table-column prop="rolename" align="center" label="角色名称" width="100" />
      <el-table-column label="启用" align="center" width="100">
        <template #default="{ row, $index }">
          <el-switch v-model="row.status" active-color="#13ce66" inactive-color="#ccc" @change="changeStatus(row)" />
        </template>
      </el-table-column>
      <el-table-column prop="desc" align="center" label="概述" width="400" />
      <el-table-column prop="addTime" align="center" label="最初添加时间" width="200" />
      <el-table-column align="center" label="编辑角色信息" width="110">
        <template #default="{ row, $index }">
          <el-button type="primary" round @click="handleEditRoleInformation(row)">
            <el-icon style="color: #55e0e5 ;margin-right: 10px">
              <Edit />
            </el-icon>编辑
          </el-button>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作">
        <template #default="{ row, $index }">
          <el-button type="success" round @click="handleManageFunction(row)">
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
                  @confirm="deleteRole(row.roleid)"
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

    <el-dialog v-model="infodialogFormVisible" title="角色信息" width="40%">
      <el-form label-width="80px">
        <el-form-item label="角色名" :label-width="formLabelWidth">
          <el-input v-model="form.rolename" autocomplete="off" />
        </el-form-item>
        <el-form-item label="概述">
          <el-input v-model="form.rolename" autocomplete="off" />
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

    <el-dialog v-model="AddRoleDialogFormVisible" title="添加新角色" width="40%">
      <el-form label-width="80px">
        <el-form-item label="角色名" :label-width="formLabelWidth">
          <el-input v-model="newRole.rolename" autocomplete="off" />
        </el-form-item>
        <el-form-item label="概述" :label-width="formLabelWidth">
          <el-input v-model="newRole.desc"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="AddRoleDialogFormVisible = false">
          取 消
        </el-button>
        <el-button type="success" @click="saveAddRole()">
          确 定
        </el-button>
      </div>
    </el-dialog>

    <el-dialog v-model="FunctionDialogFormVisible" title="角色权限管理" width="40%">
      <el-form style="text-align: left">

        <el-form-item label="管理权限" >
          <el-select v-model="thisRoleFunctions"  value-key="id" class="el-scrollbar" multiple clearable :popper-append-to-body="false" placeholder="请选择权限" style = "width:100%" effect="dark">
            <el-option-group
                    v-for="group in allfunctions"
                    :key="group.options"
                    :label="group.label">
              <el-option
                      v-for="item in group.options"
                      :key = "item.id"
                      :label = "item.name"
                      :value="item"/>
            </el-option-group>
          </el-select>
        </el-form-item>
      </el-form>

      <el-table :data="thisRoleFunctions" style="width: 100%;margin-bottom: 50px" border stripe :header-cell-class-name="headerBg">
        <el-table-column prop="id" align="center" label="FunctionId" />
        <el-table-column prop="name" align="center" label="Name" width="180" />
        <el-table-column prop="key" align="center" label="Key" width="180" />
        <el-table-column prop="status" align="center" label="Status" />
        <el-table-column align="center" label="操作">
          <template #default="{ row, $index }">
            <el-popconfirm
                    style="margin-left: 5px"
                    confirm-button-text="yes"
                    cancel-button-text="No"
                    icon-color="#626AEF"
                    title="Are you sure to delete this?"
                    @confirm="delfunction(row)"
            >
              <template #reference>
                <el-button v-if = "check(row)" slot="reference" type="danger" round >
                  <el-icon style="margin-right: 10px">
                    <DeleteFilled />
                  </el-icon>删除
                </el-button>
                <el-button v-else slot="reference" type="danger" round disabled>
                  <el-icon style="margin-right: 10px">
                    <DeleteFilled />
                  </el-icon>删除
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button type="success" @click="handleConfirm()">
          确 定
        </el-button>
        <el-button @click="cancelEditFunctionInfo()">
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

<style lang="scss" scoped>

</style>
