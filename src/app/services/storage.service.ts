import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class StorageService {

  public saveToStorage(key: string, data: string): void {
    localStorage.setItem(key, data)
  }

  public getFromStorage(key: string): string | null {
    return localStorage.getItem(key);
  }

  public clearStorage(): void {
    localStorage.clear();
  }
}
