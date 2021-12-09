import { ICatalogElement } from 'src/app/interfaces/catalog-element';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IFormElement } from 'src/app/interfaces/form-element';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  private baseUrl = 'http://localhost:8000/catalog';

  constructor(private http: HttpClient) { }

  getAllCatalogElement(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}`)
  }
  
  getCatalogElement(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createCatalogElement(catalogElement: IFormElement, file: File): Observable<any> {
    const data: FormData = new FormData();
    var details = JSON.stringify(catalogElement);
    data.append('catalogElement', details)
    data.append('file', file, file.name);

    return this.http.post(`${this.baseUrl}`, data);
  }

  deleteCatalogElement(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

}
