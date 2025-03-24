import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PlantaService } from '../services/planta.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {

  plantas: any[] = [];
  humedad = 45;
  temperatura = 23;
  aguaRestante = 34;

  constructor(private router: Router, private http: HttpClient, private plantaService: PlantaService) {}

  ngOnInit() {
    this.cargarPlantas();
  }

  cargarPlantas() {
    this.plantaService.obtenerPlantas().subscribe({
      next: (data) => {
        this.plantas = data;
      },
      error: (err) => {
        console.error('Error al cargar plantas:', err);
      }
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']).then(() => location.reload());
  }

  home() {
    this.router.navigate(['/home']);
  }

  add() {
    this.router.navigate(['/add']);
  }

  calendar() {
    this.router.navigate(['/calendar']);
  }

  verPlanta(planta: any) {
    this.router.navigate(['/plant-detail', planta._id]);
  }
  

}
