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
  nombre: [
    { type: 'required', message: 'Nombre es un campo requerido' },
    { type: 'minlength', message: 'El nombre debe tener un mínimo de ...' },
    { type: 'maxlength', message: 'El nombre debe tener un largo máximo de 45 caracteres' }
  ],
  correo: [
    { type: 'required', message: 'Correo es un campo requerido' },
    { type: 'pattern', message: 'Ingrese un correo válido' }
  ],
  rut: [
    { type: 'required', message: 'RUT es un campo requerido' },
    { type: 'rutFormat', message: 'El RUT no es válido' }
  ],
  repetir_contrasena: [
    { type: 'required', message: 'Confirmar contraseña es requerido' },
    { type: 'notSame', message: 'Password mismatch' }
  ],
  contrasena: [
    { type: 'required', message: 'Contraseña es un campo requerido' },
    { type: 'minlength', message: 'La contraseña debe tener un largo mínimo de 6 caracteres' },
    { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number' }
  ],
  terms: [
    { type: 'pattern', message: 'You must accept terms and conditions' }
  ],
  paciente_rut: [
    { type: 'validRUT', message: 'El RUT ingresado no se encuentra registrado'},
    { type: 'required', message: 'El RUT del paciente es un campo requerido'}
  ],
  fecha: [
    { type: 'required', message: 'Fecha es un campo requerido' },
    { type: 'pattern', message: 'La fecha no tiene un formato válido' }
  ],
  hora: [
    { type: 'required', message: 'Hora es un campo requerido' }
  ],
  id_institucion: [
    { type: 'required', message: 'Institución es un campo requerido' }
  ]

}