import { Component, OnInit } from '@angular/core';
import { RetiroMedicamentoService, AlertService, InstitucionService } from '../_services';
import { first, map } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material';
import { RetiroMedicamento, Institucion } from '../_models';
import { SelectionModel } from '@angular/cdk/collections';
import { FormGroup } from '@angular/forms';
import { DialogConfirmComponent, DialogData } from '../dialog-confirm/dialog-confirm.component'
import { MatDialog } from '@angular/material';
import { RetiroMedicamentoFormComponent } from '../retiro-medicamento-form/retiro-medicamento-form.component';


@Component({
  selector: 'app-retiro-medicamento',
  templateUrl: './retiro-medicamento.component.html',
  styleUrls: ['./retiro-medicamento.component.css']
})
export class RetiroMedicamentoComponent implements OnInit {

  displayedColumns: string[] = ['select', 'nombre', 'nombre_paciente', 'paciente_rut', 'fecha', 'hora', 'lugar', 'dosis', 'editar'];
  dataSource:  MatTableDataSource<RetiroMedicamento>;
  selection = new SelectionModel<RetiroMedicamento>(true, []);
  deleteButton: boolean;
  retiroMedicamentos: RetiroMedicamento[];
  loading = false;
  submitted = false;
  instituciones: Institucion[];
  header: string;
  edit: boolean;

  constructor(
    private retiroMedicamentoService: RetiroMedicamentoService,
    private alertService: AlertService,
    public dialog: MatDialog,
    private institucionService: InstitucionService
  ) {}

  ngOnInit() {
    this.loadRetiroMedicamentos();
    this.deleteButtonActive();  
    this.getInstituciones();
    this.header = 'Administración Retiro Medicamentos';
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
      message: "¿Está seguro que desea eliminar a los retiro medicamentos seleccionados?"
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
          this.alertService.error(error.message);
          this.loadRetiroMedicamentos();
          this.loading = false;
      }); 
    }   
  }

  getInstituciones(){
    this.institucionService.getInstituciones().pipe(first()).subscribe(instituciones=>{
      this.instituciones = instituciones;
    })
  }

  new(){
    const dialogRef = this.dialog.open(RetiroMedicamentoFormComponent, {
      width: '600px',
      data: null
    });
    dialogRef.afterClosed().subscribe(()=> {
      this.loadRetiroMedicamentos();
      this.selection.clear();
    });
  }

  update(retiroMedicamento: RetiroMedicamento){
    this.edit = true;
    const dialogRef = this.dialog.open(RetiroMedicamentoFormComponent, {
      width: '600px',
      data: retiroMedicamento
    });
    dialogRef.afterClosed().subscribe(()=> {
      this.loadRetiroMedicamentos();
      this.edit = false;
      this.selection.clear();
    });
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

}
