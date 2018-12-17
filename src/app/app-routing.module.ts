import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RetiroMedicamentoComponent } from './retiro-medicamento/retiro-medicamento.component';

const routes: Routes = [
  { path: '', component: RetiroMedicamentoComponent },
  { path: 'hola', component: RetiroMedicamentoComponent }
];

@NgModule({
  
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
