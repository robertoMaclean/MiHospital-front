import { Component, OnInit } from '@angular/core';
import { RetiroMedicamentoService, AlertService, InstitucionService } from '../_services';
import { first, map } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material';
import { RetiroMedicamento, Institucion } from '../_models';
import { SelectionModel } from '@angular/cdk/collections';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { DialogConfirmComponent, DialogData } from '../dialog-confirm/dialog-confirm.component'
import { MatDialog } from '@angular/material';
import { RetiroMedicamentoFormComponent } from '../retiro-medicamento-form/retiro-medicamento-form.component';


@Component({
  selector: 'app-retiro-medicamento',
  templateUrl: './retiro-medicamento.component.html',
  styleUrls: ['./retiro-medicamento.component.css']
})
export class RetiroMedicamentoComponent implements OnInit {

  displayedColumns: string[] = ['select', 'nombre', 'nombre_paciente', 'rut_paciente', 'fecha', 'hora', 'lugar', 'dosis'];
  dataSource:  MatTableDataSource<RetiroMedicamento>;
  selection = new SelectionModel<RetiroMedicamento>(true, []);
  deleteButton: boolean;
  retiroMedicamentos: RetiroMedicamento[];
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  instituciones: Institucion[];

  constructor(
    private retiroMedicamentoService: RetiroMedicamentoService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    public dialog: MatDialog,
    private institucionService: InstitucionService
  ) {}

  ngOnInit() {
    this.loadRetiroMedicamentos();
    this.deleteButtonActive();  
    this.getInstituciones();
    this.registerForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      hora: ['', Validators.required],
      fecha: ['', [Validators.required]],
      lugar: ['', [Validators.required]],
      paciente_rut: ['', [Validators.required], this.validateRut.bind(this)],
      id_institucion: ['', [Validators.required]]
    });
  }

  private loadRetiroMedicamentos() {
    this.retiroMedicamentoService.getAll().pipe(first()).subscribe(retiroMedicamentos => { 
      this.retiroMedicamentos = retiroMedicamentos; 
      this.dataSource = new MatTableDataSource<RetiroMedicamento>(this.retiroMedicamentos);
    });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  deleteButtonActive(){
    if(this.selection.selected.length>0){
      this.deleteButton = false;
    }else{
      this.deleteButton = true;
    }
  }

  confirmDeleteUser() {
    let message: DialogData = {
      title: "Eliminar usuario",
      message: "¿Está seguro que desea eliminar a los usuarios seleccionados?"
    }
    this.openDeleteDialog(message);
  }

  openDeleteDialog(response: any): void {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '400px',
      data: response
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.deleteRetiroMedicamento();
        this.selection.clear();
      }   
    });
  }

  deleteRetiroMedicamento() {
    for(let i=0;i<this.selection.selected.length;i++){
      let id = this.selection.selected[i].id;
      this.loading = true;
      this.retiroMedicamentoService.delete(id).pipe(first()).subscribe(
        () => { 
          this.alertService.success('Retiro medicamento eliminado!', true);
          this.loadRetiroMedicamentos();
          this.loading = false;
        },
        error => {
          this.alertService.error(error);
          this.loadRetiroMedicamentos();
          this.loading = false;
      }); 
    }   
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    
    this.loading = true;
    this.retiroMedicamentoService.insert(this.registerForm.value)
      .pipe(first())
      .subscribe(
        () => {
          this.alertService.success('Usuario ingresado satisfactoriamente', true);
          this.loading = false;
          this.loadRetiroMedicamentos();
          this.registerForm.reset();
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        }
      );
  }

  validateRut(control: AbstractControl){
    return this.retiroMedicamentoService.pacienteExist(control.value).pipe(map(res =>{
      return res ? null : { validRUT: true }
    }));
  }

  getInstituciones(){
    this.institucionService.getInstituciones().pipe(first()).subscribe(instituciones=>{
      this.instituciones = instituciones;
    })
  }

  new(){
    const dialogRef = this.dialog.open(RetiroMedicamentoFormComponent, {
      width: '500px'
    });
    dialogRef.afterClosed().subscribe(()=> {
      this.loadRetiroMedicamentos();
    });
  }

  onChange(){
    alert("hola");
  }

}
