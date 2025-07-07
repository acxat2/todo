import { Injectable, OnInit } from '@angular/core';
import { ITask } from './tasks.service';
import { taskForm } from '../types/types';

@Injectable({
  providedIn: 'root'
})

export class DbService {
  private dbName = 'todobase';
  private dbVersion = 1;
  private db: IDBDatabase | null = null;


}


  // let openRequest = indexedDB.open('todobase');
  // let db!: IDBDatabase;
  // let store!: IDBObjectStore;






