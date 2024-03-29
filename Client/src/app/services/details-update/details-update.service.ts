import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Details } from 'src/app/model/details.model';

@Injectable({
  providedIn: 'root'
})
export class DetailsUpdateService {

  private baseUrl = 'http://localhost:8082/details';

  constructor(private http : HttpClient) {}

  getElementDetails(id : number) : Observable<any> {
    return this.http.get(`http://localhost:8082/details/${id}`);
  }

  updateElementDetails(id : number, details : Details): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${id}`, details);
  }

}
