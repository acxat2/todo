type status = 'выполнена' | 'не выполнена';

export interface ITask {
  id: number
  status: status
  description: string
  title: string
}

export type taskForm = {
  title: string,
  description: string,
  status: status
}
