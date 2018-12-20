import { Component, OnInit } from '@angular/core';
import { Institucion } from '../_models';
import { InstitucionService, UsuarioService, AlertService } from '../_services';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { first, map } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css']
})

export class UsuarioFormComponent implements OnInit {

  instituciones: Institucion[];
  registerForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private institucionService: InstitucionService,
    private usuarioService: UsuarioService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    public dialogRef: MatDialogRef<UsuarioFormComponent>
    ) { }

  ngOnInit() {
    this.getInstituciones();
    this.registerForm = this.formBuilder.group({
      nombres: ['', Validators.required],
      apellido: ['', Validators.required],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
      correo: ['', [Validators.required]],
      telefono: [''],
      rut: ['', Validators.required],
      id_institucion: ['', Validators.required]
    });
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
    this.usuarioService.insert(this.registerForm.value)
      .pipe(first())
      .subscribe(
        () => {
          this.alertService.success('Usuario ingresado satisfactoriamente', true);
          this.loading = false;
          this.registerForm.reset();
          this.dialogRef.close();
        },
        error => {
          console.log(error);
          this.alertService.error(error);
          this.loading = false;
        }
      );
      
  }
}
