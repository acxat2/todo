import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ITask, taskForm } from '../types/types';

@Injectable({
  providedIn: 'root'
})

export class DbService {
  private dbName = 'todobase';
  private storeName = 'tasks';
  private dbVersion = 1;
  private initial: boolean = false;
  public dbInitialized = new Subject<boolean>();
  private db: IDBDatabase | null = null;
  public task$: Subject<ITask | null> = new Subject<ITask | null>()
  public tasks$: Subject<ITask[] | []> = new Subject<ITask[] | []>()

  constructor() {
      this.initDatabase();
    }

  public isActive(): boolean {
    return this.initial
  }

  private initDatabase(): void {
    const request = indexedDB.open(this.dbName, this.dbVersion);

    request.onupgradeneeded = () => {
      const db = request.result;

      if (!db.objectStoreNames.contains(this.storeName)) {
        const obgectStore = db.createObjectStore(this.storeName, { keyPath: 'id', autoIncrement: true });
        obgectStore.createIndex('title', 'title');
        obgectStore.createIndex('description', 'description');
      }
    };

    request.onsuccess = () => {
      this.db = request.result;
      this.dbInitialized.next(true)
      this.initial = true
    };

    request.onerror = () => {
      console.error('Ошибка при открытии БД:', request.error);
    };
  }

  public add(data: taskForm) {
      const transaction = this.db!.transaction([this.storeName], 'readwrite');
      const objectStore = transaction.objectStore(this.storeName);

      const request = objectStore.add(data);

      transaction.oncomplete = () => {
        this.getAll();
      }
      request.onerror = () => console.error(request.error);
  }

  public get(key: number) {
      const transaction = this.db!.transaction([this.storeName], 'readonly');
      const objectStore = transaction.objectStore(this.storeName);
      const request = objectStore.get(key);

      request.onsuccess = () => {
        const matching = request.result
        if (matching !== undefined ) {
          this.task$.next(matching)
        }
      };
      request.onerror = () => console.error(request.error);
  }

  public getAll<T>() {
      const transaction = this.db!.transaction([this.storeName], 'readonly');
      const objectStore = transaction.objectStore(this.storeName);
      const request = objectStore.getAll();

      request.onsuccess = () => {
        this.tasks$.next(request.result || [])
      };
      request.onerror = () => console.error(request.error);
  }

  public update<T>(task: ITask): void {
      const transaction = this.db!.transaction([this.storeName], 'readwrite');
      const objectStore = transaction.objectStore(this.storeName);
      const request = objectStore.put(task);

      request.onsuccess = () => this.getAll();
      request.onerror = () => console.error(request.error);
  }

  public toggleStatus(task: ITask): void {
    const transaction = this.db!.transaction([this.storeName], 'readwrite');
    const objectStore = transaction.objectStore(this.storeName);

    task.status === 'не выполнена' ? task.status = 'выполнена' : task.status = 'не выполнена'
    const request = objectStore.put(task);

    request.onsuccess = () => {};
    request.onerror = () => console.error(request.error);
  }

  public delete(key: number) {
      const transaction = this.db!.transaction([this.storeName], 'readwrite');
      const objectStore = transaction.objectStore(this.storeName);

      const request = objectStore.delete(key);

      request.onsuccess = () => {this.getAll()};
      request.onerror = () => console.error(request.error);
  }
}
