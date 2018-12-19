import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RetiroMedicamentoComponent } from './retiro-medicamento/retiro-medicamento.component';
import { UsuarioComponent } from './usuario/usuario.component';

const routes: Routes = [
  { path: '', component: RetiroMedicamentoComponent },
  { path: 'usuarios', component: UsuarioComponent }
];

@NgModule({
  
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
