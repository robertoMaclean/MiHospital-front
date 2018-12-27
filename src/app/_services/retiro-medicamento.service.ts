import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RetiroMedicamento } from '../_models'


@Injectable()
export class RetiroMedicamentoService {
    URL = '/retiro_medicamento/retiro_medicamento/';
    constructor(private http: HttpClient) {

    }

    getAll() {
        return this.http.get<RetiroMedicamento[]>(this.URL);
    }

    getById(id: number) {
        return this.http.get(this.URL + id);
    }

    insert(retiroMedicamento: RetiroMedicamento) {
        let body = this.fillBody(retiroMedicamento);
        let options = {
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        };
        return this.http.post(this.URL, body.toString(), options);
    }

    update(retiroMedicamento: RetiroMedicamento, id: Number) {
        let body = this.fillBody(retiroMedicamento);
        let options = {
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        };
        console.log(body.getAll("lugar"));
        console.log(body.toString())
        return this.http.post(this.URL + id , body.toString(), options);
    }

    delete(id: number) {
        return this.http.delete(this.URL + id);
    }

    pacienteExist(rut: string){
        if(rut=='') rut='-1';
        return this.http.get(this.URL + 'paciente_exist/' + rut);
    }

    fillBody(retiroMedicamento: RetiroMedicamento){
        let body = new URLSearchParams();
        let newDate = new Date(retiroMedicamento.fecha);
        body.set('nombre', retiroMedicamento.nombre);
        body.set('hora', retiroMedicamento.hora);
        body.set('fecha', newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate());
        body.set('lugar', retiroMedicamento.lugar);
        body.set('paciente_rut', retiroMedicamento.paciente_rut);
        body.set('id_institucion', retiroMedicamento.id_institucion);
        body.set('dosis', retiroMedicamento.dosis);
        return body;
    }
    
    
}