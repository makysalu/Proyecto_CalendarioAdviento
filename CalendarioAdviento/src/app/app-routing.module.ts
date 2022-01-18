import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { FormCalendarioComponent } from './components/form-calendario/form-calendario.component';
import { LoginComponent } from './components/login/login.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { RegistroComponent } from './components/registro/registro.component';
import { AuthGuard } from './guardianes/auth.guard';
import { NoEncontradoComponentComponent } from './no-encontrado-component/no-encontrado-component.component';

const routes: Routes = [
  {path: '', component:PrincipalComponent},
  {path: 'calendario/:id', component:CalendarioComponent},
  {path: 'login', component:LoginComponent},
  {path: 'registro', component:RegistroComponent},
  {path: 'generar-calendario', component:FormCalendarioComponent, canActivate: [AuthGuard] },
  {path:'**', component: NoEncontradoComponentComponent}
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
