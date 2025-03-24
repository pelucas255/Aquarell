import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { PlantaService } from '../services/planta.service';
import { HttpClient } from '@angular/common/http';

interface OpcionPlanta {
  nombre: string;
  humedadMinima: number;
  tiempoRiego: number;
}


@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
  standalone: true, 
  imports: [CommonModule, IonicModule, FormsModule],
})
export class AddPage implements OnInit {

  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;

  imagenPrevia: string | ArrayBuffer = ''; 
  plantaSeleccionada: OpcionPlanta | 'personalizado' = 'personalizado';
  opcionesPlantas = [
    { nombre: 'Rosa', humedadMinima: 40, tiempoRiego: 10 },
    { nombre: 'Cactus', humedadMinima: 20, tiempoRiego: 5 },
    { nombre: 'Orquídea', humedadMinima: 50, tiempoRiego: 15 },
  ];
  
  nombrePersonalizado: string = '';
  humedadMinimaPersonalizada: number | null = null;
  tiempoRiegoPersonalizado: number | null = null;
  sensorIdPersonalizado: string = '';
  sensorId: string = '';



  constructor(private router: Router, private plantaService: PlantaService, private http: HttpClient) {}

  logout() {
    console.log('Cerrando sesión...');
    localStorage.clear();
    this.router.navigate(['/login']).then(() => {
      location.reload(); 
    });
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

  seleccionarImagen() {
    if (this.fileInput) {
      this.fileInput.nativeElement.click();
    }
  }

  cargarImagen(event: any) {
    const archivo = event.target.files[0];
    if (archivo) {
      const lector = new FileReader();
      lector.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target && e.target.result) {
          this.imagenPrevia = e.target.result;
        }
      };
      lector.readAsDataURL(archivo);
    }
  }

  verificarSeleccion() {
    if (this.plantaSeleccionada !== 'personalizado') {
      const planta = this.opcionesPlantas.find(p => p.nombre === this.plantaSeleccionada);
      if (planta) {
        this.humedadMinimaPersonalizada = planta.humedadMinima;
        this.tiempoRiegoPersonalizado = planta.tiempoRiego;
      }
    } else {
      this.humedadMinimaPersonalizada = null;
      this.tiempoRiegoPersonalizado = null;
    }
  }

  guardarPlanta() {
    const nombre = this.plantaSeleccionada === 'personalizado'
    ? this.nombrePersonalizado
    : (this.plantaSeleccionada as OpcionPlanta).nombre;
  
    const humedadMinima = this.humedadMinimaPersonalizada;
    const tiempoRiego = this.tiempoRiegoPersonalizado;
    const idSensor = this.sensorId;
  
    const nuevaPlanta = {
      nombre,
      humedadMinima,
      tiempoRiego,
      imagen: this.imagenPrevia,
      sensorId: idSensor
    };
  
    console.log('📦 Enviando planta:', nuevaPlanta);
  
    this.http.post('http://192.168.23.128:5000/api/planta/agregar', nuevaPlanta)
      .subscribe({
        next: (res: any) => {
          alert('✅ Planta registrada exitosamente');
          this.router.navigate(['/home']);
        },
        error: (err: any) => {
          console.error('❌ Error al registrar planta:', err);
          alert('Hubo un error al registrar la planta');
        }
      });
  }

  ngOnInit() {}

}
