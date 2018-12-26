import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RetiroMedicamentoComponent } from './retiro-medicamento/retiro-medicamento.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { LoginComponent } from './login';
import { AuthSomeGuard } from './_guards';

const routes: Routes = [
  { path: 'retiro_medicamento', component: RetiroMedicamentoComponent, canActivate: [AuthSomeGuard] },
  { path: 'usuario', component: UsuarioComponent },
  { path: '', redirectTo: '/retiro_medicamento', pathMatch: 'full' },
  { path: 'login', component: LoginComponent}
];

@NgModule({
  
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
