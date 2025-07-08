import { Injectable } from '@angular/core';
import { taskForm } from '../types/types';
import { StorageService } from './storage.service';

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
  private keyStorage = 'tasks';
  private data: ITask[] = []


  public changeStatus(id: number) {
    this.data.forEach(n => {
      if (n.id == id) {
        n.status === 'выполнена' ? n.status = 'не выполнена' : n.status = 'выполнена';
      }
    })
    this.saveData();
  }

  public addTask(event: taskForm) {
    const task: ITask = {
      id: Date.now(),
      title: event.title,
      description: event.description,
      status: event.status
    };
    this.data.push(task)
    this.saveData();
  }

  public getTasks(): ITask[] | [] {
    return this.data;
  }

  public getTask(id: number) {
    return this.data.find(n => n.id == id)
  }

  public deleteTask(id: number) {
    const index = this.data.findIndex(n => n.id == id)
    this.data.splice(index, 1);
    this.saveData();
  }

  constructor(private storage: StorageService) {
    const res = storage.getFromStorage(this.keyStorage);
    if (res) {
      this.data = JSON.parse(res);
    }
  }

  private saveData() {
    this.storage.saveToStorage(this.keyStorage, JSON.stringify(this.data))
  }
}
