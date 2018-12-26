export const account_validation_messages = {
  nombres: [
    { type: 'required', message: 'Nombres es un campo requerido' },
    { type: 'minlength', message: 'Los Nombres deben tener un mínimo de ...' },
    { type: 'maxlength', message: 'Los Nombres deben tener un largo máximo de 45 caracteres' },
    { type: 'pattern', message: 'Your username must contain only numbers and letters' },
    { type: 'validUsername', message: 'Your username has already been taken' }
  ],
  apellido: [
    { type: 'required', message: 'Apellido es un campo requerido' },
    { type: 'minlength', message: 'El apellido debe tener un mínimo de ...' },
    { type: 'maxlength', message: 'El apellido debe tener un largo máximo de 45 caracteres' },
    { type: 'pattern', message: 'Your username must contain only numbers and letters' },
    { type: 'validUsername', message: 'Your username has already been taken' }
  ],
  correo: [
    { type: 'required', message: 'Correo es un campo requerido' },
    { type: 'pattern', message: 'Ingrese un correo válido' }
  ],
  rut: [
    { type: 'required', message: 'RUT es un campo requerido' },
    { type: 'pattern', message: 'Enter a valid email' },
    { type: 'rutFormat', message: 'El RUT no es válido' }
  ],
  repetir_contrasena: [
    { type: 'required', message: 'Confirmar contraseña es requerido' },
    { type: 'notSame', message: 'Password mismatch' }
  ],
  contrasena: [
    { type: 'required', message: 'Contraseña es un campo requerid' },
    { type: 'minlength', message: 'La contraseña debe tener un largo mínimo de 6 caracteres' },
    { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number' }
  ],
  terms: [
    { type: 'pattern', message: 'You must accept terms and conditions' }
  ]
}