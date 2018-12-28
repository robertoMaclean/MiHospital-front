import { Component, OnInit, Inject } from '@angular/core';
import { Institucion, RetiroMedicamento } from '../_models';
import { InstitucionService, RetiroMedicamentoService, AlertService } from '../_services';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';
import { first, map } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { account_validation_messages } from '../_validator';

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
  account_validation_messages = account_validation_messages;
  private selected: number;
  edit: boolean;
  retiroID: number;

  constructor(
    private institucionService: InstitucionService,
    private retiroMedicamentoService: RetiroMedicamentoService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    public dialogRef: MatDialogRef<RetiroMedicamentoFormComponent>,
    @Inject(MAT_DIALOG_DATA) public retiroMedicamento: RetiroMedicamento
    ) { }

  ngOnInit() {
    this.getInstituciones();
    if(this.retiroMedicamento==null){
      this.edit = false;
      this.registerForm = this.formBuilder.group({
        nombre: ['', Validators.required],
        hora: ['', Validators.required],
        fecha: ['', [Validators.required]],
        lugar: ['', [Validators.required]],
        paciente_rut: ['', [Validators.required], this.validateRut.bind(this)],
        id_institucion: ['', [Validators.required]],
        dosis: ['']
      });
    }else {
      let date = this.retiroMedicamento.fecha.split('/');
      this.edit = true;
      let id_institucion: any = '';
      
      if(this.retiroMedicamento.institucion!=null){
        id_institucion = this.retiroMedicamento.institucion.id;
      }
      this.registerForm = this.formBuilder.group({
        nombre: [this.retiroMedicamento.nombre, Validators.required],
        hora: [this.retiroMedicamento.hora, Validators.required],
        fecha: [new Date(new Date( date[2] + "/" + date[1] + "/" + date[0])), [Validators.required]],
        lugar: [this.retiroMedicamento.lugar, [Validators.required]],
        paciente_rut: [this.retiroMedicamento.paciente_rut, [Validators.required], this.validateRut.bind(this)],
        id_institucion: [id_institucion, [Validators.required]],
        dosis: [this.retiroMedicamento.dosis]
      }); 
    }
    
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
    if(this.edit){
      this.retiroMedicamentoService.update(this.registerForm.value, this.retiroMedicamento.id)
      .pipe(first())
      .subscribe(
        () => {
          this.alertService.success('Retiro Medicamento actualizado satisfactoriamente', true);
          this.loading = false;
          this.registerForm.reset();
          this.dialogRef.close();
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        }
      );
    }else{
      this.retiroMedicamentoService.insert(this.registerForm.value)
      .pipe(first())
      .subscribe(
        () => {
          this.alertService.success('Retiro Medicamento ingresado satisfactoriamente', true);
          this.loading = false;
          this.registerForm.reset();
          this.dialogRef.close();
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        }
      );
    }  
  }

  compareInst(id1: number, id2: number): boolean {
    return  id1 == id2;
  }
}
