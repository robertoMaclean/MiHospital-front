import { FormGroup, AbstractControl } from "@angular/forms";

export function SamePasswords(control: AbstractControl) { 
  let pass = control.get('contrasena').value;
  let confirmPass = control.get('repetir_contrasena').value;
  return pass === confirmPass ? null : { notSame: true }      
}