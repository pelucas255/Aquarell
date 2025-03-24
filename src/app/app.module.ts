import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
<<<<<<< HEAD
import { HttpClientModule } from '@angular/common/http'; // ← ✅ Usa este, sin miedo al warning

=======
import { HttpClientModule } from '@angular/common/http';  // Importación añadida
>>>>>>> 142f90fa4ffbc47ea1bba189e6281f666543ab02
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
<<<<<<< HEAD
    BrowserModule,
    HttpClientModule,        // ✅ Esto habilita HttpClient sin errores
    IonicModule.forRoot(),   // ✅ Necesario para reconocer <ion-app> y demás
    AppRoutingModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
=======
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    HttpClientModule  // Módulo añadido a los imports
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
>>>>>>> 142f90fa4ffbc47ea1bba189e6281f666543ab02
