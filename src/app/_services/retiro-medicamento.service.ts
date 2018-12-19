import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RetiroMedicamento } from '../_models'


@Injectable()
export class RetiroMedicamentoService {
    URL = '/retiro_medicamento/';
    constructor(private http: HttpClient) {

    }

    getAll() {
        return this.http.get<RetiroMedicamento[]>(this.URL);
    }

    getById(id: number) {
        return this.http.get(this.URL + id);
    }

    insert(retiroMedicamento: RetiroMedicamento) {
        let body = new URLSearchParams();
        let newDate = new Date(retiroMedicamento.fecha);

        
        body.set('nombre', retiroMedicamento.nombre);
        body.set('hora', retiroMedicamento.hora);
        body.set('fecha', newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate());
        body.set('lugar', retiroMedicamento.lugar);
        body.set('paciente_rut', retiroMedicamento.paciente_rut);
        body.set('id_institucion', retiroMedicamento.id_institucion);
        body.set('dosis', retiroMedicamento.dosis);
        let options = {
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        };
        return this.http.post(this.URL, body.toString(), options);
    }

    /* update(user: User) {
        return this.http.put(this.URL + `/users/` + user.id_usuario, user);
    } */

    delete(id: number) {
        return this.http.delete(this.URL + id);
    }

    pacienteExist(rut: string){
        if(rut=='') rut='-1';
        return this.http.get('/retiro_medicamento/' + 'paciente_exist/' + rut);
    }
    
    
}