import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

interface CalendarDate {
  day: number;
  active: boolean;
}

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class CalendarioPage implements OnInit {
  days: string[] = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
  dates: CalendarDate[] = [];
  
  constructor() { }

  ngOnInit() {
    this.generateCalendar();
  }

  generateCalendar() {
    // Generar fechas para febrero (28 días)
    for (let i = 1; i <= 28; i++) {
      // Marcar algunos días como activos (con riegos)
      const active = [2, 5, 8, 10, 12, 15, 18, 20, 22, 25].includes(i);
      this.dates.push({ day: i, active });
    }
  }

  selectDate(day: number) {
    console.log(`Día seleccionado: ${day}`);
    // Aquí puedes implementar la lógica para mostrar los riegos del día
  }
}