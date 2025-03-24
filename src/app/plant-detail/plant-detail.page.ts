import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { IonicModule } from '@ionic/angular'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-plant-detail',
  templateUrl: './plant-detail.page.html',
  styleUrls: ['./plant-detail.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule] 
})
export class PlantDetailPage implements OnInit {

  planta: any;

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.http.get<any>(`http://192.168.23.128:5000/api/planta/${id}`)
      .subscribe({
        next: (data) => {
          this.planta = data;
        },
        error: (err) => {
          console.error('Error al obtener detalles de la planta:', err);
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

  activarRiego() {
    alert('Riego manual activado para esta planta.');  
  }
  

}
