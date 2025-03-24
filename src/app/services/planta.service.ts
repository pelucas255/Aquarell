import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PlantaService {
  private apiUrl = 'http://192.168.23.128:5000/api/planta';

  constructor(private http: HttpClient) {}

  agregarPlanta(planta: any) {
    return this.http.post(`${this.apiUrl}/agregar`, planta);
  }

  obtenerPlantas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }
}
