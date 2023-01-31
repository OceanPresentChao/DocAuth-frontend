<script>
import { ElMessage } from 'element-plus'
import axios from 'axios'
import TreeChart from '@/components/layout/treeNode/treeChart.vue'
export default {
  name: 'NowNewProject',
  components: {
    TreeChart,
  },
  data() {
    let undoneurl="src/assets/undoneTask.png";
    let doneurl="src/assets/doneTask.png";
    return {
      savable: false,
      doneurl:doneurl,
      undoneurl:undoneurl,
      tabIndex: 1,
      editableTabsValue: '1',
      editableTabs: [
        {
          title: 'Phase 1',
          name: '1',
          content: {
            name: '1',
            image_url: undoneurl,
            thisId: 1,
            fartherId: 0,
            startTime: '',
            deadLine: '',
            editPerson: '1',
            investigatePerson: '2',
            ratifyPerson: '3',
            con_signPerson1: '4',
            con_signPerson2: '5',
            taskDescription: '',
            type: 'root',
            class: ['rootNode'],
            children: [],
          },
        },
      ],
      dialogFormVisible: false,
      formLabelWidth: '140px',
      startTime: '',
      deadLine: '',
      form: {
        name: '',
        startTime: '',
        deadLine: '',
        editPerson: '',
        investigatePerson: '',
        ratifyPerson: '',
        con_signPerson1: '',
        con_signPerson2: '',
        type: [],
        resource: '',
        desc: '',
      },
      currentTask: {},
      users: [],
      idnum: 1,
      tag: 0,
      now: '',
      landscape: [],
      contextstyle: {
        display: 'none',
        right: '0px',
        top: '0px',
        left: '0px',
        bottom: '0px',
      },
      employeesApplication: [],

    }
  },

  created() {
    this.userInformationInit()
  },

  methods: {
    saveCurrentProject() {
      const allData = {}
      allData.name = '项目数据'
      const postData = []
      for (const [index, item] of this.editableTabs.entries()) {
        const tmp = index
        postData[index] = []
        this.getChild([item.content], postData[tmp])
        // console.log(postData)
      }
      // console.log('这里是postData', postData)
      allData.phases = postData
      allData.phaseNumber = postData.length
      allData.projectId = this.$route.query.projectId*1
      // console.log('这里是数据', allData)
      this.$request.post('/django/business/saveProject', allData).then((res) => {
        // console.log(res)
      if(res.status === 200){
        ElMessage({
          showClose:true,
          message:'保存成功',
          type:'success'
        })
      }else {
        ElMessage({
          showClose:true,
          message:'保存失败',
          type:'error'
        })
      }
        this.savable = false

      })
      this.$router.push('/projectList')
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
        console.log('这里是users',res)
        console.log('这里是users',res.data)
        this.users = res.data.data.results

      })
    },
    clickNode(node) {
      this.currentTask = node
      this.now = node.thisId
      // console.log(this.currentTask)
      // console.log(this.currentTask)
      // console.log(this.currentTask.name)
      // console.log(this.currentTask.thisId)
      // console.log(this.currentTask.fartherId)
      if (window.event.x + 188 > document.documentElement.clientWidth) {
        this.contextstyle.left = 'unset'
        this.contextstyle.right = `${document.documentElement.clientWidth - window.event.x}px`
      }
      else {
        this.contextstyle.left = `${window.event.x}px`
      }
      if (window.event.y + 166 > document.documentElement.clientHeight) {
        this.contextstyle.top = 'unset'
        this.contextstyle.bottom = `${document.documentElement.clientHeight - window.event.y}px`
      }
      else {
        this.contextstyle.top = `${window.event.y}px`
      }
      this.contextstyle.display = 'block'
    },
    shutDown() {
      this.contextstyle.display = 'none'
    },
    deleteNode() {
      this.tag = 0
      for (const item of this.editableTabs) {
        if (item.name === this.editableTabsValue) {
          this.findChild([item.content])
          break
        }
      }
      this.shutDown()
    },
    // delete find
    findChild(array) {
      // tag is confusing do not care it.it tag has deleted!
      if (this.tag === 1)
        return
      for (const i in array) {
        if (array[i].thisId === this.now) {
          this.tag = 1
          if (array[i].type === 'root') {
            ElMessage({
              showClose: true,
              message: 'cannot delete root',
              type: 'error',
            })
            return
          }
          array.splice(i, 1)
          // console.log(array)
          // console.log(this.)
        }
        if (this.tag === 1)
          return
        if (array[i].children) {
          if (this.tag === 1)
            return
          this.findChild(array[i].children)
          if (this.tag === 1)
            return
        }
      }
    },
    addNode() {
      this.tag = 0
      for (const item of this.editableTabs) {
        if (item.name === this.editableTabsValue) {
          this.addreal([item.content])
          break
        }
      }
      // this.addreal([this.data])
      this.shutDown()
    },
    addreal(array) {
      for (const i in array) {
        // console.log(array[i].name);
        if (array[i].thisId === this.now) {
          // console.log('findit');
          this.tag = 1
          this.idnum = this.idnum + 1
          const undoneurl = this.undoneurl
          array[i].children.push({
            name: this.idnum,
            thisId: this.idnum,
            fartherId: array[i].thisId,
            image_url: undoneurl,
            startTime: '',
            deadLine: '',
            editPerson: '',
            investigatePerson: '',
            ratifyPerson: '',
            con_signPerson1: '',
            con_signPerson2: '',
            taskDescription: '',
            children: [],
          })
        }
        if (this.tag === 1)
          return
        if (array[i].children) {
          if (this.tag === 1)
            return
          this.addreal(array[i].children)
          if (this.tag === 1)
            return
        }
      }
    },
    applyEmployees() {
      this.dialogFormVisible = true
      this.contextstyle.display = 'none'
    },
    confirmOneTaskApplication() {
      const judgeValidity = {}
      const duplicateApplication = []
      const hash = {}
      judgeValidity.editPerson = this.currentTask.editPerson
      judgeValidity.investigatePerson = this.currentTask.investigatePerson
      judgeValidity.ratifyPerson = this.currentTask.ratifyPerson
      judgeValidity.con_signPerson1 = this.currentTask.con_signPerson1
      judgeValidity.con_signPerson2 = this.currentTask.con_signPerson2

      for (const key in judgeValidity) {
        if (hash[judgeValidity[key]]) {
          // console.log(judgeValidity[key])
          duplicateApplication.push(key)
        }
        hash[judgeValidity[key]] = true
      }
      if (duplicateApplication !== undefined && duplicateApplication.length > 0) {
        // 发生冲突项目不可提交
        this.savable = false
        this.currentTask.image_url = this.undoneurl
        // console.log('发生冲突的小朋友',duplicateApplication)
        for (const item of duplicateApplication) {
          ElMessage({
            showClose: true,
            message: `${item}发生冲突` + '请重新分配',
            type: 'error',
          })
        }
        this.dialogFormVisible = true
      }
      else {
        ElMessage({
          showClose: true,
          message: '分配成功',
          type: 'success',
        })
        this.dialogFormVisible = false
        this.currentTask.image_url = this.doneurl
        console.log('这里是即将提交的表单信息', this.currentTask)
        this.examSavable()
      }
    },
    // 检查项目全分配完了
    examSavable() {
      // console.log(this.editableTabs);
      for (const item of this.editableTabs) {
        if (this.examComplete([item.content]) === false) {
          this.savable = false
          return
        }
      }
      this.savable = true
    },
    examComplete(array) {
      for (const i in array) {
        if (array[i].image_url === this.undoneurl)
          return false

        if (array[i].children) {
          if (this.examComplete(array[i].children) === false) {
            // console.log(array[i]);
            return false
          }
        }
      }
      return true
    },
    // this exam is uesd for save project and pack the information
    getChild(array, Data) {
      // console.log("why!!!!!")
      // console.log(Data)
      // console.log("No!!!")
      // console.log(array)
      for (const i in array) {
        Data.push({
          thisId: array[i].thisId,
          name: array[i].name,
          fatherID: array[i].fartherId,
          staffs: [
            array[i].editPerson,
            array[i].investigatePerson,
            array[i].ratifyPerson,
            array[i].con_signPerson1,
            array[i].con_signPerson2,
          ],
          startTime: array[i].startTime,
          deadTime: array[i].deadLine,
          taskDescription: array[i].taskDescription,
        },
        )
        if (array[i].children)
          this.getChild(array[i].children, Data)
      }
    },
    addTab(targetName) {
      this.idnum = this.idnum + 1
      const newTabName = `${++this.tabIndex}`
      this.editableTabs.push({
        title: `Phase ${this.tabIndex}`,
        name: newTabName,
        content: {
          name: `${this.idnum}`,
          image_url: this.undoneurl,
          thisId: this.idnum,
          fartherId: 0,
          startTime: '',
          deadLine: '',
          editPerson: '1',
          investigatePerson: '2',
          ratifyPerson: '3',
          con_signPerson1: '4',
          con_signPerson2: '5',
          taskDescription: '',
          children: [],
          type: 'root',
        },
      })
      this.editableTabsValue = newTabName
    },
    removeTab(targetName) {
      const tabs = this.editableTabs
      let activeName = this.editableTabsValue
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            const nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab)
              activeName = nextTab.name
          }
        })
      }
      this.editableTabsValue = activeName
      this.editableTabs = tabs.filter(tab => tab.name !== targetName)
      this.tabIndex--
      let ct = 1
      for (const item of this.editableTabs) {
        item.title = `Phase ${ct}`
        ct++
      }
    },
  },
}
</script>

<template>
  <div id="nowNewProject">
    <div style="margin-bottom: 20px">
      <el-button size="large" type="primary" @click="addTab(editableTabsValue)">
        新增阶段
      </el-button>
      <el-button size="large" type="success" :disabled="!savable" @click="saveCurrentProject(editableTabsValue)">
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
        <TreeChart :json="item.content" :class="{ landscape: 1 }" @click-node="clickNode" />
      </el-tab-pane>
    </el-tabs>

    <!-- here is clicked menu      -->
    <div class="gl_prs_ctn" :style="[contextstyle]">
      <ul class="gl_prs_li">
        <li>
          <el-button type="primary" @click="addNode">
            添加子分支
          </el-button>
        </li>
        <li>
          <el-button type="success" @click="applyEmployees">
            任务安排
          </el-button>
        </li>
        <li>
          <el-button type="danger" @click="deleteNode">
            删除分支
          </el-button>
        </li>
        <li>
          <el-button type="info" @click="shutDown">
            关闭此栏
          </el-button>
        </li>
      </ul>
    </div>
    <!-- people arrange -->
    <el-dialog v-model="dialogFormVisible" title="任务创建">
      <el-form :model="currentTask">
        <el-form-item label="任务名称" :label-width="formLabelWidth">
          <el-input v-model="currentTask.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="任务持续时间" :label-width="formLabelWidth">
          <el-date-picker
            v-model="currentTask.startTime"
            type="datetime"
            placeholder="任务开始时间"
            style="margin-right: 50px"
          />
          <el-date-picker
            v-model="currentTask.deadLine"
            type="datetime"
            placeholder="任务截止时间"
          />
        </el-form-item>
        <el-form-item label="编" :label-width="formLabelWidth">
          <el-select v-model="currentTask.editPerson" value-key="id" :popper-append-to-body="false" placeholder="请选择人员" effect="dark">
            <el-option v-for="item in users" :key="item.id" :label="item.username" :value="item.id" style="width: 100% ;color: #55e0e5" />
          </el-select>
        </el-form-item>
        <el-form-item label="审" :label-width="formLabelWidth">
          <el-select v-model="currentTask.investigatePerson" placeholder="请选择人员" effect="dark">
            <el-option v-for="item in users" :key="item.id" :label="item.username" :value="item.id" style="width: 100% ;color: #55e0e5" />
          </el-select>
        </el-form-item>
        <el-form-item label="批" :label-width="formLabelWidth">
          <el-select v-model="currentTask.ratifyPerson" placeholder="请选择人员" effect="dark">
            <el-option v-for="item in users" :key="item.id" :label="item.username" :value="item.id" style="width: 100% ;color: #55e0e5" />
          </el-select>
        </el-form-item>
        <el-form-item label="会签" :label-width="formLabelWidth">
          <el-select v-model="currentTask.con_signPerson1" placeholder="请选择人员1" style="margin-right: 50px ;" effect="dark">
            <el-option v-for="item in users" :key="item.id" :label="item.username" :value="item.id" style="width: 100% ;color: #55e0e5" />
          </el-select>
          <el-select v-model="currentTask.con_signPerson2" placeholder="请选择人员2" effect="dark">
            <el-option v-for="item in users" :key="item.id" :label="item.username" :value="item.id" style="width: 100% ;color: #55e0e5" />
          </el-select>
        </el-form-item>
        <el-form-item label="任务内容概述" :label-width="formLabelWidth">
          <el-input v-model="currentTask.taskDescription" type="textarea" />
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

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 0px;
    }
</style>

<style scoped>
    .dialog-footer button:first-child {
        margin-right: 10px;
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

