import { defineStore } from 'pinia'

export const useTaskStore = defineStore({
  id: 'task',
  state: () => {
    return {
      taskStep: [{
        id: 0,
        name: 'ALL',
        style: 'success',
      }, {
        id: 1,
        name: '编撰',
        style: 'success',
      }, {
        id: 2,
        name: '审阅',
        style: 'warning',
      }, {
        id: 3,
        name: '审批',
        style: 'info',
      }, {
        id: 4,
        name: '汇签',
        style: '',
      }, {
        id: 5,
        name: '打回',
        style: 'danger',
      }],
      taskStatus: {
        r: {
          name: '进行中',
          style: 'warning',
        },
        f: {
          name: '已完成',
          style: 'success',
        },
        s: {
          name: '暂停中',
          style: 'danger',
        },
        w: {
          name: '待提交',
          style: 'warning',
        },
      },
      recordStatus: {
        r: {
          name: '审核中',
          style: 'warning',
        },
        f: {
          name: '通过',
          style: 'success',
        },
        s: {
          name: '未通过',
          style: 'danger',
        },
      },
    }
  },
  getters: {

  },
  actions: {

  },
})

