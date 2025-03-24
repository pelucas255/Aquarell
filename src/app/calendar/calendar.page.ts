import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
  standalone: true, 
  imports: [CommonModule, IonicModule, FormsModule],
})
export class CalendarPage implements OnInit {
  years: number[] = [];
  months: string[] = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  dayNames: string[] = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  
  selectedYear: number = new Date().getFullYear(); 
  selectedMonth: number = new Date().getMonth(); 
  calendarDays: number[] = [];

  constructor(private router: Router) {
    this.initYears();
  }

  ngOnInit() {
    this.generateCalendar();
  }

  initYears() {
    const currentYear = new Date().getFullYear();
    for (let i = currentYear - 10; i <= currentYear + 10; i++) {
      this.years.push(i);
    }
  }

  generateCalendar() {
    const firstDay = new Date(this.selectedYear, this.selectedMonth, 1).getDay();
    const daysInMonth = new Date(this.selectedYear, this.selectedMonth + 1, 0).getDate();

    this.calendarDays = new Array(firstDay).fill(null).concat([...Array(daysInMonth).keys()].map(i => i + 1));
  }

  selectDay(day: number) {
    if (day) {
      console.log(`Seleccionaste el día: ${day}/${this.selectedMonth + 1}/${this.selectedYear}`);
    }
  }

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
}

