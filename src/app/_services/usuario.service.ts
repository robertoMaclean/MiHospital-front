import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario, UsuarioPassword } from '../_models'


@Injectable()
export class UsuarioService {
    options = {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    }; 
    URL = '/retiro_medicamento/usuario/';
    constructor(private http: HttpClient) {

    }

    getAll() {
        return this.http.get<Usuario[]>(this.URL);
    }

    getByRUT(rut: string) {
        return this.http.get(this.URL + rut);
    }

    insert(usuario: Usuario) {
        let body = this.fillBody(usuario);

        return this.http.post(this.URL, body.toString(), this.options);
    }

    delete(rut: string) {
        return this.http.delete(this.URL + rut);
    }

    update(usuario: Usuario, rut: string) {
        let body = this.fillEditBody(usuario)
        
        return this.http.post(this.URL + rut, body.toString(), this.options);
    }

    update_password(usuarioPassword: UsuarioPassword, rut: string){
        console.log(usuarioPassword);
        let body = new URLSearchParams();
        body.set('new_password', usuarioPassword.contrasena);
        /* body.set('old_password', usuarioPassword.contrasena_antigua); */
        return this.http.post(this.URL + 'set_password/' + rut, body.toString(), this.options);
    }

    private fillBody(usuario: any): URLSearchParams {
        console.log(usuario);
        let user = JSON.parse(localStorage.getItem("currentUser"));
        let body = new URLSearchParams();
        body.set('nombres', usuario.nombres);
        body.set('apellido', usuario.apellido);
        body.set('correo', usuario.correo);
        body.set('contrasena', usuario.contrasena);
        body.set('creado_por', user['rut']);
        body.set('id_institucion', usuario.id_institucion.toString());
        body.set('telefono', usuario.telefono);
        body.set('rut', usuario.rut);
        return body;
    }

    private fillEditBody(usuario: any): URLSearchParams {

        let body = new URLSearchParams();
        body.set('rut', usuario.rut);
        body.set('nombres', usuario.nombres);
        body.set('apellido', usuario.apellido);
        body.set('correo', usuario.correo);
        body.set('id_institucion', usuario.id_institucion.toString());
        body.set('telefono', usuario.telefono);
        body.set('rut', usuario.rut);
        return body;
    }
    
}