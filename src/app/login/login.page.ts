import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true, 
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
