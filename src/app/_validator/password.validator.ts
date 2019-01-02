import { FormControl, FormGroup, NgForm, FormGroupDirective } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    
    if(control.parent.get('contrasena').value==''){
      return false;
    }
    let contrasenaInvalid = control.parent.get('contrasena').invalid;
    return !(control && (control.parent.get('contrasena').value == control.parent.get('repetir_contrasena').value) && control.dirty) || contrasenaInvalid;
  }
}

export class PasswordValidator {

  static areEqual(group: FormGroup) {
    let pass = group.controls.contrasena.value;
    let confirmPass = group.controls.repetir_contrasena.value;
    return pass === confirmPass ? null : { notSame: true }   
  }
}

