import { Component, OnInit } from '@angular/core';
import { RetiroMedicamentoService } from '../_services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-retiro-medicamento',
  templateUrl: './retiro-medicamento.component.html',
  styleUrls: ['./retiro-medicamento.component.css']
})
export class RetiroMedicamentoComponent implements OnInit {

  constructor(
    private retiroMedicamentoService: RetiroMedicamentoService
  ) {}

  ngOnInit() {
    this.retiroMedicamentoService.getAll().pipe(first()).subscribe(retiroMedicamentos =>{
      console.log(retiroMedicamentos);
    });
  }

}
