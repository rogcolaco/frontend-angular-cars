import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../app/Car';

@Injectable({
  providedIn: 'root'
})

export class CarService {

  baseURL = 'https://bdtc2-3002837.glitch.me/api';

  getCars(): Observable<Car[]>{
    return this.http.get<Car[]>(this.baseURL + '/cars');
  }

  getCar(id: string): Observable<Car>{
    return this.http.get<Car>(this.baseURL + '/cars/' + id);
  }

  addCar(car: {model: string, color: string, plate: string, km: number}): Observable<any>{
    let body = new HttpParams();
    body = body.set('model', car.model);
    body = body.set('color', car.color);
    body = body.set('plate', car.plate);
    body = body.set('km', String(car.km));
    return this.http.post(this.baseURL + '/cars', body, {observe: 'response'});
  }

  update(car: {model: string, color: string, plate: string, km: number}, id: string): Observable<any>{
    let body = new HttpParams();
    body = body.set('model', car.model);
    body = body.set('color', car.color);
    body = body.set('plate', car.plate);
    body = body.set('km', String(car.km));
    return this.http.put(this.baseURL + '/cars/' + id, body, {observe: 'response'});
  }

  delete(id: string): Observable<any>{
    return this.http.delete(this.baseURL + '/cars/' + id, {observe: 'response'});
  }

  constructor(private http: HttpClient) { }
}