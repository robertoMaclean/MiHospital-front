import { Component, OnInit } from '@angular/core';
import { Institucion } from '../_models';
import { InstitucionService, RetiroMedicamentoService, AlertService } from '../_services';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { first, map } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-retiro-medicamento-form',
  templateUrl: './retiro-medicamento-form.component.html',
  styleUrls: ['./retiro-medicamento-form.component.css']
})
export class RetiroMedicamentoFormComponent implements OnInit {

  instituciones: Institucion[];
  registerForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private institucionService: InstitucionService,
    private retiroMedicamentoService: RetiroMedicamentoService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    public dialogRef: MatDialogRef<RetiroMedicamentoFormComponent>
    ) { }

  ngOnInit() {
    this.getInstituciones();
    this.registerForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      hora: ['', Validators.required],
      fecha: ['', [Validators.required]],
      lugar: ['', [Validators.required]],
      paciente_rut: ['', [Validators.required], this.validateRut.bind(this)],
      id_institucion: ['', [Validators.required]],
      dosis: ['']
    });
  }

  validateRut(control: AbstractControl){
    return this.retiroMedicamentoService.pacienteExist(control.value).pipe(map(res =>{
      return res ? null : { validRUT: true }
    }));
  }

  getInstituciones(){
    this.institucionService.getInstituciones().pipe(first()).subscribe(instituciones=>{
      this.instituciones = instituciones;
    })
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    
    this.loading = true;
    this.retiroMedicamentoService.insert(this.registerForm.value)
      .pipe(first())
      .subscribe(
        () => {
          this.alertService.success('Usuario ingresado satisfactoriamente', true);
          this.loading = false;
          //this.loadRetiroMedicamentos();
          this.registerForm.reset();
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        }
      );
      this.dialogRef.close();
  }
}
