import { Component, OnInit } from '@angular/core';
import { AlertController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule, RouterLink]
})
export class RegistroPage implements OnInit {

  formularioRegistro: FormGroup;
  isLoading = false;

  constructor(
    public fb: FormBuilder, 
    public alertControl: AlertController,
    private authService: AuthService,
    private router: Router
  ) {
    this.formularioRegistro = this.fb.group({
      'nombre': new FormControl("", Validators.required),
      'correo': new FormControl("", [Validators.required, Validators.email]),
      'password': new FormControl("", Validators.required),
      'confirmPassword': new FormControl("", Validators.required)
    });
  }

  ngOnInit() {
  }

  async registrar() {
    console.log('Formulario:', this.formularioRegistro.value);
    console.log('Formulario válido:', this.formularioRegistro.valid);
    
    // Verificar si el formulario es válido
    if (this.formularioRegistro.invalid) {
      const alert = await this.alertControl.create({
        header: 'Aviso',
        subHeader: 'Datos Incompletos',
        message: 'Por favor completa todos los campos correctamente',
        buttons: ['Aceptar']
      });
      await alert.present();
      return;
    }

    // Verificar que las contraseñas coinciden
    const formu = this.formularioRegistro.value;
    if (formu.password !== formu.confirmPassword) {
      const alert = await this.alertControl.create({
        header: 'Error',
        message: 'Las contraseñas no coinciden',
        buttons: ['Aceptar']
      });
      await alert.present();
      return;
    }

    // Preparar datos para enviar al backend
    const userData = {
      name: formu.nombre,
      email: formu.correo,
      password: formu.password
    };

    console.log('Enviando datos al backend:', userData);
    this.isLoading = true;

    // Enviar datos al backend
    this.authService.register(userData).subscribe({
      next: async (response) => {
        this.isLoading = false;
        console.log('Respuesta del servidor:', response);
        
        // Mostrar mensaje de éxito
        const alert = await this.alertControl.create({
          header: 'Éxito',
          message: 'Registro completado correctamente',
          buttons: ['Aceptar']
        });
        await alert.present();
        
        // Navegar a la página de login
        this.router.navigate(['/login']);
      },
      error: async (error) => {
        this.isLoading = false;
        console.error('Error en registro:', error);
        
        // Mostrar mensaje de error
        const alert = await this.alertControl.create({
          header: 'Error',
          message: error.error?.message || 'Ocurrió un error durante el registro',
          buttons: ['Aceptar']
        });
        await alert.present();
      }
    });
  }
}