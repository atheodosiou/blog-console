import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/services/authGuard.service';

const routes: Routes = [
  { path: '', redirectTo: '/console', pathMatch: 'full' },
  { path: 'console', loadChildren: () => import('./pages/console/console.module').then(m => m.ConsoleModule), canActivate: [AuthGuard] },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
  { path: '**', loadChildren: () => import('./pages//notFound/notFound.module').then(m => m.NotFoundModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
