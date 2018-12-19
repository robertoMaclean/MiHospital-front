import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { AlertService } from '../_services';

@Component({
    selector: 'alert',
    templateUrl: 'alert.component.html'
})

export class AlertComponent implements OnInit, OnDestroy {
    private subscription: Subscription;
    message: any;

    constructor(private alertService: AlertService, public snackBar: MatSnackBar) { }

    ngOnInit() {
        this.subscription = this.alertService.getMessage().subscribe(message => { 
            this.message = message; 
            if(message){
                this.openSnackBar(message.text, message.type);
            }    
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    openSnackBar(message: string, action: string) {
        let config = new MatSnackBarConfig();
        config.duration = 8000;
        config.verticalPosition = 'top';
        let panelClass = '';
        if(action == 'success'){
            action = ' Cerrar';
            panelClass = 'snack-success';
        }else if(action == 'error'){
            action = ' Cerrar';
            panelClass = 'snack-error';
        }else{
            action = ' Cerrar';
            panelClass = 'snack-info';
        }
        config.panelClass = [panelClass];
        this.snackBar.open(message, action, config);
      }
}