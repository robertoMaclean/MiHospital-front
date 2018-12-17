import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetiroMedicamentoComponent } from './retiro-medicamento.component';

describe('RetiroMedicamentoComponent', () => {
  let component: RetiroMedicamentoComponent;
  let fixture: ComponentFixture<RetiroMedicamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetiroMedicamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetiroMedicamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
