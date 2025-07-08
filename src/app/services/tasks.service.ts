import { Injectable } from '@angular/core';
import { taskForm } from '../types/types';
import { DbService } from './db.service';

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

  // async addTask(task: ITask) {
  //   try {
  //     await this.dbService.add('tasks', task);
  //     console.log('Пользователь добавлен');
  //   } catch (error) {
  //     console.error('Ошибка при добавлении:', error);
  //   }
  // }

  // async getTask() {
  //   try {
  //     const task = await this.dbService.get('tasks', 1);
  //     console.log('Полученный пользователь:', task);
  //   } catch (error) {
  //     console.error('Ошибка при получении:', error);
  //   }
  // }

  // async getTasks() {
  //   try {
  //     const tasks = await this.dbService.getAll('tasks');
  //     console.log('Все пользователи:', tasks);
  //   } catch (error) {
  //     console.error('Ошибка при получении всех:', error);
  //   }
  // }

  constructor(private dbService: DbService) { }
}
