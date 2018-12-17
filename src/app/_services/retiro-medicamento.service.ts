import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

    insert(user: RetiroMedicamento) {
        return this.http.post(this.URL, user);
    }

    /* update(user: User) {
        return this.http.put(this.URL + `/users/` + user.id_usuario, user);
    } */

    delete(id: number) {
        return this.http.delete(this.URL + id);
    }
    

}