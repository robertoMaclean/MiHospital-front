import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AlertService, UsuarioService } from '../_services';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Usuario } from '../_models';
import { first } from 'rxjs/operators';
import { PasswordValidator, MyErrorStateMatcher, account_validation_messages } from '../_validator';

@Component({
  selector: 'app-password-form',
  templateUrl: './password-form.component.html',
  styleUrls: ['./password-form.component.css']
})
export class PasswordFormComponent implements OnInit {

  form_title: string;
  passwordForm: FormGroup;
  submitted = false;
  loading = false;
  matcher = new MyErrorStateMatcher();
  account_validation_messages = account_validation_messages;

  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    public dialogRef: MatDialogRef<PasswordFormComponent>,
    private usuarioService: UsuarioService,
    @Inject(MAT_DIALOG_DATA) public usuario: Usuario
    
  ) { }

  ngOnInit() {
    this.form_title = 'Cambiar contraseña';
    this.passwordForm = this.formBuilder.group({
      /* contrasena_antigua: ['', [Validators.required, Validators.minLength(6)]], */
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
      repetir_contrasena: ['', [Validators.required]]
    },{validators: PasswordValidator.areEqual });

  }

  onSubmit() {
    this.submitted = true;

    if (this.passwordForm.invalid) {
      console.log("holaaaa");
      return;
    }
    
    this.loading = true;
    
    this.usuarioService.update_password(this.passwordForm.value, this.usuario.rut)
    .pipe(first())
    .subscribe(
      () => {
        this.alertService.success('Contraseña actualizada satisfactoriamente', true);
        this.loading = false;
        this.passwordForm.reset();
        this.dialogRef.close();
      },
      error => {
        this.alertService.error(error);
        this.loading = false;
      }
    );
    
      
  }

}
