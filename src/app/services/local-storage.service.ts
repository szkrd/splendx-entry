import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {
  private serviceId = 'splendx';
  private key: string;
  private available = true;
  private memStore: string;

  constructor(key: string) {
    this.key = `${this.serviceId}:${key}`;
  }

  getItem(): string | null {
    if (this.memStore !== undefined) {
      return this.memStore;
    }
    return window.localStorage.getItem(this.key);
  }

  setItem(value: string): void {
    this.memStore = value;
    if (!this.available) {
      return;
    }
    try {
      window.localStorage.setItem(this.key, value);
      const same = this.getItem();
      if (value !== same) {
        this.available = false;
      }
    } catch (err) {
      this.available = false;
    }
  }
}
