import { MatButtonModule, MatCheckboxModule, MatInputModule, MatFormFieldModule, MatNativeDateModule } from '@angular/material';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { NgModule } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatDatepickerModule } from '@angular/material/datepicker';

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatAutocompleteModule, MatFormFieldModule,
     MatInputModule, MatSlideToggleModule, MatToolbarModule, MatIconModule, MatGridListModule,
     MatTabsModule, MatDividerModule, MatListModule, MatTableModule, MatCardModule, MatExpansionModule,
     MatRadioModule, MatRadioModule, MatDialogModule, MatChipsModule, MatSelectModule, MatSnackBarModule,
     MatSidenavModule, MatTooltipModule, MatMenuModule, MatDatepickerModule, MatNativeDateModule ],
  exports: [MatButtonModule, MatCheckboxModule, MatAutocompleteModule, MatFormFieldModule, 
    MatInputModule, MatSlideToggleModule, MatToolbarModule, MatIconModule, MatGridListModule,
    MatTabsModule, MatDividerModule, MatListModule, MatTableModule, MatCardModule, MatExpansionModule,
    MatRadioModule, MatRadioModule, MatDialogModule, MatChipsModule, MatSelectModule, MatSnackBarModule,
    MatSidenavModule, MatTooltipModule, MatMenuModule, MatDatepickerModule, MatNativeDateModule ],
})
export class MaterialModule { }