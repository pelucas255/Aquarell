import { Injectable } from '@angular/core';
<<<<<<< HEAD
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
=======
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
>>>>>>> 142f90fa4ffbc47ea1bba189e6281f666543ab02

@Injectable({
  providedIn: 'root'
})
export class AuthService {
<<<<<<< HEAD
  private apiUrl = 'http://192.168.23.128:5000/api/auth';

  constructor(private http: HttpClient) {}

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

}
=======
  private apiUrl = 'http://localhost:3000/api';
  private token: string | null = null;

  constructor(private http: HttpClient) {
    // Recuperar el token del almacenamiento local si existe
    this.token = localStorage.getItem('token');
  }

  register(userData: any): Observable<any> {
    console.log('Enviando datos de registro:', userData);
    return this.http.post(`${this.apiUrl}/register`, userData)
      .pipe(
        tap((response: any) => {
          console.log('Respuesta del servidor:', response);
          if (response && response.token) {
            this.setToken(response.token);
          }
        }),
        catchError(this.handleError)
      );
 
    }

  login(credentials: {email: string, password: string}): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap((response: any) => {
          if (response && response.token) {
            this.setToken(response.token);
          }
        }),
        catchError(this.handleError)
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.token = null;
  }

  getToken(): string | null {
    return this.token;
  }

  private setToken(token: string): void {
    localStorage.setItem('token', token);
    this.token = token;
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  getProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/profile`, {
      headers: {
        'x-auth-token': this.token || ''
      }
    }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Error detallado:', error);
    
    let errorMessage = 'Ocurrió un error desconocido';
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      errorMessage = `Código de error: ${error.status}, ` +
                    `Mensaje: ${error.error?.message || error.statusText}`;
    }
    
    return throwError(() => new Error(errorMessage));
  }
}
>>>>>>> 142f90fa4ffbc47ea1bba189e6281f666543ab02
