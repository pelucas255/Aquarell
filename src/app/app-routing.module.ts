import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
<<<<<<< HEAD
import { authGuard } from './guards/auth.guard';
=======
>>>>>>> 142f90fa4ffbc47ea1bba189e6281f666543ab02

const routes: Routes = [
  {
    path: '',
<<<<<<< HEAD
    redirectTo: 'login',
=======
    redirectTo: 'calendario',
>>>>>>> 142f90fa4ffbc47ea1bba189e6281f666543ab02
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home',
<<<<<<< HEAD
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [authGuard]
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule),
  },
  {
    path: 'add',
    loadChildren: () => import('./add/add.module').then( m => m.AddPageModule),
    canActivate: [authGuard]
  },
  {
    path: 'calendar',
    loadChildren: () => import('./calendar/calendar.module').then( m => m.CalendarPageModule),
    canActivate: [authGuard]
  },
  {
    path: 'plant-detail/:id',
    loadComponent: () => import('./plant-detail/plant-detail.page').then(m => m.PlantDetailPage),
    canActivate: [authGuard]
  },
=======
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'calendario',
    loadChildren: () => import('./calendario/calendario.module').then( m => m.CalendarioPageModule)
  },
 
>>>>>>> 142f90fa4ffbc47ea1bba189e6281f666543ab02
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
