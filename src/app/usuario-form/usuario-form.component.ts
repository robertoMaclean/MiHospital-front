import { Component, OnInit, Inject } from '@angular/core';
import { Institucion, Usuario } from '../_models';
import { InstitucionService, UsuarioService, AlertService } from '../_services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RutValidador, SamePasswords, account_validation_messages } from '../_validator';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css']
})

export class UsuarioFormComponent implements OnInit {

  instituciones: Institucion[];
  registerForm: FormGroup;
  account_validation_messages = account_validation_messages;
  loading = false;
  submitted = false;
  
  constructor(
    private institucionService: InstitucionService,
    private usuarioService: UsuarioService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    public dialogRef: MatDialogRef<UsuarioFormComponent>,
    @Inject(MAT_DIALOG_DATA) private usuario: Usuario
    ) { }

  ngOnInit() {
    console.log(this.account_validation_messages);
    this.getInstituciones();
    if(this.usuario == null){
      this.registerForm = this.formBuilder.group({
        nombres: ['', Validators.required],
        apellido: ['', Validators.required],
        contrasena: ['', [Validators.required, Validators.minLength(6)]],
        repetir_contrasena: ['', [Validators.required]],
        correo: ['', [Validators.required]],
        telefono: [''],
        rut: ['', Validators.compose([Validators.required, RutValidador.rutFormat, Validators.minLength(6)])],
        id_institucion: ['', Validators.required],
      });
    }else{
      this.registerForm = this.formBuilder.group({
        nombres: [this.usuario.nombres, Validators.required],
        apellido: [this.usuario.apellido, Validators.required],
        contrasena: ['', [Validators.required, Validators.minLength(6)]],
        correo: [this.usuario.correo, [Validators.required]],
        telefono: [this.usuario.telefono],
        rut: [this.usuario.rut, [Validators.required, RutValidador.rutFormat, Validators.minLength(6)]],
        id_institucion: ['', Validators.required],
      });
    }
    
    if(this.usuario!=null){
      this.registerForm.controls['id_institucion'].setValue(this.usuario.institucion.id);
      this.registerForm.controls['id_institucion'].patchValue(this.usuario.institucion.id);
    }
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
        this.dialogRef.close();
      },
      error => {
        this.alertService.error(error);
        this.loading = false;
      }
    );
    
  }
}
