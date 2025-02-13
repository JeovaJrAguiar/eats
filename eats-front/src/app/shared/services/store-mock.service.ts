import { Injectable } from '@angular/core';
import mockStoreData from './../../../assets/data-business/data-store-mock-classification.json';

@Injectable({
  providedIn: 'root'
})
export class StoreMockService {
  private stores: any[] = mockStoreData.lojas;

  constructor() {}

  getStores(): any[] {
    return this.stores;
  }

  getStoreById(id: number): any | undefined {
    return this.stores.find(store => store.id === id);
  }

  getStoreByName(name: string): any | undefined {
    return this.stores.find(store => store.nome.toLowerCase() === name.toLowerCase());
  }

  getDishesByStoreId(id: number): any[] {
    const store = this.getStoreById(id);
    return store ? store.pratos : [];
  }

  getDishesByCategory(category: string): any[] {
    return this.stores.flatMap(store => store.pratos).filter(prato => prato.categoria.toLowerCase() === category.toLowerCase());
  }
}
