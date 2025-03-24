import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
<<<<<<< HEAD
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';


=======
import { IonicModule, AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';

>>>>>>> 142f90fa4ffbc47ea1bba189e6281f666543ab02
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true, 
<<<<<<< HEAD
  imports: [CommonModule, IonicModule, FormsModule,],
})
export class LoginPage {
  email = '';
  password = '';

  constructor(private router: Router, private authService: AuthService) {}

  login() {
    const credentials = {
      email: this.email,
      password: this.password
    };

    this.authService.login(credentials).subscribe({
      next: (res: any) => {
        console.log('🔓 Usuario autenticado:', res);
        localStorage.setItem('token', res.token);
        localStorage.setItem('nombre', res.nombre);
        this.router.navigate(['/home']);
      },
      error: (err: any) => {
        alert(err.error.message || 'Error al iniciar sesión');
        console.error(err);
      }
    });
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  recoverPassword() {
  }
}
=======
  imports: [CommonModule, IonicModule, ReactiveFormsModule, RouterModule]
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  isLoading = false;
  
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private alertController: AlertController
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void { 
    console.log('LoginPage inicializado'); 
  }

  login() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const credentials = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      };
      
      console.log('Intentando iniciar sesión con:', { email: credentials.email });
      
      this.authService.login(credentials).subscribe({
        next: (response) => {
          console.log('Inicio de sesión exitoso:', response);
          
          // Guardar información del usuario en localStorage si es necesario
          if (response.user) {
            localStorage.setItem('usuario', JSON.stringify({
              id: response.user.id,
              nombre: response.user.nombre,
              email: response.user.email
            }));
          }
          
          this.isLoading = false;
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error('Error en inicio de sesión:', error);
          this.isLoading = false;
          
          let mensaje = 'Error al iniciar sesión';
          
          if (error.message.includes('400')) {
            mensaje = 'Credenciales inválidas';
          } else if (error.message.includes('404')) {
            mensaje = 'El usuario no existe';
          }
          
          this.mostrarAlerta('Error', mensaje);
        }
      });
    } else {
      this.mostrarAlerta('Formulario inválido', 'Por favor complete todos los campos correctamente');
    }
  }

  async mostrarAlerta(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['ACEPTAR']
    });

    await alert.present();
  }

  goToRegister() {
    this.router.navigate(['/registro']);
  }

  recoverPassword() {
    // Implementación futura para recuperar contraseña
  }
}
>>>>>>> 142f90fa4ffbc47ea1bba189e6281f666543ab02
