import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetiroMedicamentoFormComponent } from './retiro-medicamento-form.component';

describe('RetiroMedicamentoFormComponent', () => {
  let component: RetiroMedicamentoFormComponent;
  let fixture: ComponentFixture<RetiroMedicamentoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetiroMedicamentoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetiroMedicamentoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
