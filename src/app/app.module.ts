import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RetiroMedicamentoComponent } from './retiro-medicamento/retiro-medicamento.component';
import { RetiroMedicamentoService } from './_services';

@NgModule({
  declarations: [
    AppComponent,
    RetiroMedicamentoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    RetiroMedicamentoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
