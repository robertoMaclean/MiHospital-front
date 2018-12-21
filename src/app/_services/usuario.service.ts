import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../_models'


@Injectable()
export class UsuarioService {
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
        let options = {
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        };

        return this.http.post(this.URL, body.toString(), options);
    }

    delete(rut: string) {
        return this.http.delete(this.URL + rut);
    }

    update(usuario: Usuario, rut: string) {
        let body = this.fillBody(usuario)
        let options = {
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        };
        return this.http.put(this.URL + rut, body.toString(), options);
    }

    private fillBody(usuario: any): URLSearchParams {
        console.log(usuario);
        let user = JSON.parse(localStorage.getItem("currentUser"));
        let body = new URLSearchParams();
        body.set('rut', usuario.rut);
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
    
}