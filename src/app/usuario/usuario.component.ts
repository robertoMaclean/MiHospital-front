import { Component, OnInit } from '@angular/core';
import { UsuarioService, AlertService, InstitucionService } from '../_services';
import { first } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material';
import { Usuario, Institucion } from '../_models';
import { SelectionModel } from '@angular/cdk/collections';
import { DialogConfirmComponent, DialogData } from '../dialog-confirm/dialog-confirm.component'
import { MatDialog } from '@angular/material';
import { UsuarioFormComponent } from '../usuario-form/usuario-form.component';
import { PasswordFormComponent } from '../password-form/password-form.component';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})

export class UsuarioComponent implements OnInit {

  displayedColumns: string[] = ['select', 'nombres', 'apellido', 'rut', 'correo', 'telefono', 'institucion', 'editar', 'cambiar_contrasena'];
  dataSource:  MatTableDataSource<Usuario>;
  selection = new SelectionModel<Usuario>(true, []);
  deleteButton: boolean;
  usuarios: Usuario[];
  loading = false;
  submitted = false;
  edit = false;
  instituciones: Institucion[];
  header = 'Administración Usuarios';

  constructor(
    private usuarioService: UsuarioService,
    private alertService: AlertService,
    public dialog: MatDialog,
    private institucionService: InstitucionService
  ) {}

  ngOnInit() {
    this.loadUsuarios();
    this.deleteButtonActive();   
  }

  private loadUsuarios() {
    this.usuarioService.getAll().pipe(first()).subscribe(usuarios => { 
      this.usuarios = usuarios.sort(this.compare); 
      this.dataSource = new MatTableDataSource<Usuario>(this.usuarios);
      this.dataSource.filterPredicate = (usuario: Usuario, filter: string) => {     
        return this.filter(usuario, filter);
       };
    });
  }

  filter(usuario: Usuario, filter: string){
    let nombre = usuario.nombres.trim().toLocaleLowerCase().includes(filter);
    let apellido = usuario.apellido.trim().toLocaleLowerCase().includes(filter);
    let rut = usuario.rut.trim().toLocaleLowerCase().includes(filter);
    let correo = usuario.correo.trim().toLocaleLowerCase().includes(filter);
    let telefono = usuario.telefono.trim().toLocaleLowerCase().includes(filter);
    let institucion = usuario.institucion.nombre_institucion.trim().toLocaleLowerCase().includes(filter);
    return nombre || apellido || rut || correo || telefono || institucion;
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
        this.dataSource.filteredData.forEach(row => this.selection.select(row));
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
        this.deleteUsuario();
        this.selection.clear();
      }   
    });
  }

  deleteUsuario() {
    for(let i=0;i<this.selection.selected.length;i++){
      let rut = this.selection.selected[i].rut;
      console.log(rut);
      this.loading = true;
      this.usuarioService.delete(rut).pipe(first()).subscribe(
        () => { 
          this.alertService.success('Usuario eliminado!', true);
          this.loadUsuarios();
          this.loading = false;
        },
        error => {
          console.log(error.message);
          this.alertService.error(error.message);
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
    const dialogRef = this.dialog.open(UsuarioFormComponent, {
      width: '500px',
      data: null
    });
    dialogRef.afterClosed().subscribe(()=> {
      this.loadUsuarios();
      this.selection.clear();
    });
  }

  update(usuario: Usuario){
    this.edit = true;
    const dialogRef = this.dialog.open(UsuarioFormComponent, {
      width: '500px',
      data: usuario
    });
    dialogRef.afterClosed().subscribe(()=> {
      this.loadUsuarios();
      this.selection.clear();
      this.edit = false;
    });
  }

  setPassword(usuario: Usuario){
    this.edit = true;
    const dialogRef = this.dialog.open(PasswordFormComponent, {
      width: '500px',
      data: usuario
    });
    dialogRef.afterClosed().subscribe(()=> {
      this.loadUsuarios();
      this.selection.clear();
      this.edit = false;
    });
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  } 

  compare(usuario1: Usuario, usuario2: Usuario) {
    if (usuario1.rut.split('-').join() < usuario2.rut.split('-').join())
      return -1;
    if (usuario1.rut.split('-').join() > usuario2.rut.split('-').join())
      return 1;
    return 0;
  }
 
}

