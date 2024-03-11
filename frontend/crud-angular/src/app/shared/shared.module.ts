import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Material
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatTable, MatTableModule} from '@angular/material/table';
import {MatDividerModule} from '@angular/material/divider';
import {MatGridListModule} from '@angular/material/grid-list';
import { ReactiveFormsModule } from '@angular/forms';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatPaginator} from '@angular/material/paginator';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';

//Modules
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatIconModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatTableModule,
    MatGridListModule,
    MatPaginatorModule,
    MatSelectModule,
    MatDialogModule,
    MatExpansionModule,
    FormsModule
  ],
  exports:[
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatDividerModule,
    MatGridListModule,
    MatPaginatorModule,
    MatSelectModule,
    MatDialogModule,
    MatExpansionModule,
    FormsModule
  ]
})
export class SharedModule { }
