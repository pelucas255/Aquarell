import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; // ajusta la ruta si es necesario
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
})
export class RegisterPage {
  nombre = '';
  email = '';
  password = '';
  confirmar = '';

  constructor(private router: Router, private authService: AuthService) {}

  register() {
    if (this.password !== this.confirmar) {
      alert('Las contraseñas no coinciden');
      return;
    }

    const userData = {
      nombre: this.nombre,
      email: this.email,
      password: this.password
    };

    this.authService.register(userData).subscribe({
      next: res => {
        console.log('✅ Usuario registrado', res);
        alert('Usuario registrado correctamente');
        this.router.navigate(['/login']);
      },
      error: err => {
        console.error('❌ Error en el registro:', err);
        alert('Hubo un error al registrar');
      }
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
