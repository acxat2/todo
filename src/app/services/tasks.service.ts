import { Injectable } from '@angular/core';
import { taskForm } from '../types/types';

export type status = 'выполнена' | 'не выполнена'
export interface ITask {
  id: number
  title: string
  description: string
  status: status
}

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private data: ITask[] = [
    {
      id: 1,
      title: "Task 1",
      description: 'Задача 1',
      status: 'не выполнена'
    },
    {
      id: 2,
      title: "Task 2",
      description: 'Задача 2',
      status: 'выполнена'
    },
    {
      id: 3,
      title: "Task 3",
      description: 'Задача 3',
      status: 'не выполнена'
    },
    {
      id: 4,
      title: "Task 4",
      description: 'Задача 4',
      status: 'не выполнена'
    },
  ]


  public changeStatus(id: number) {
    this.data.forEach(n => {
      if (n.id == id) {
        n.status === 'выполнена' ? n.status = 'не выполнена' : n.status = 'выполнена';
      }
    })
  }

  public addTask(event: taskForm) {
    const task: ITask = {
      id: 5,
      title: event.title,
      description: event.description,
      status: event.status
    };
    this.data.push(task)
  }

  public getTasks(): ITask[] | [] {
    return this.data;
  }

  public getTask(id: number) {
    return this.data.find(n => n.id == id)
  }

  public deleteTask(id: number) {
    const index = this.data.findIndex(n => n.id == id)
    this.data.splice(index, 1)
    console.log(this.data);
  }

  constructor() { }
}
