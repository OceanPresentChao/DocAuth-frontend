export interface IProject {
  id: number
  name: string
  desc?: string
  status: string
  addTime: string
}

export interface ITask {
  id: number
  phase: number
  project: string
  name: string
  desc: string
  status: 'r' | 's' | 'f'
  step: 1 | 2 | 3 | 4
  members: any[]
  addTime: string
  startTime: string
  deadLine: string
}

export interface IRecord {
  id: number
  task: string
  name: string
  project: string
  user: string
  type: 1 | 2 | 3 | 4 | 5
  status: 'r' | 's' | 'f'
  content: string
  addTime: string
}
