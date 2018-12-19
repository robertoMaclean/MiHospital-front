import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RetiroMedicamentoComponent } from './retiro-medicamento/retiro-medicamento.component';
import { RetiroMedicamentoService, AlertService, InstitucionService } from './_services';
import { MaterialModule } from './material'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DialogConfirmComponent } from './dialog-confirm/dialog-confirm.component';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { RetiroMedicamentoFormComponent } from './retiro-medicamento-form/retiro-medicamento-form.component';
import { AlertComponent } from './_directives';
import { UsuarioComponent } from './usuario/usuario.component';

@NgModule({
  declarations: [
    AppComponent,
    RetiroMedicamentoComponent,
    DialogConfirmComponent,
    RetiroMedicamentoFormComponent,
    AlertComponent,
    UsuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    NgxMaterialTimepickerModule.forRoot()
  ],
  providers: [
    RetiroMedicamentoService,
    AlertService,
    InstitucionService,
    { provide: MAT_DATE_LOCALE, useValue: 'es-CL' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
  bootstrap: [AppComponent],
  entryComponents: [DialogConfirmComponent, RetiroMedicamentoFormComponent]
})
export class AppModule {

}
