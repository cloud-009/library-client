import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { RouterModule } from '@angular/router';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TableComponent } from './table/table.component';



@NgModule({
  declarations: [
    HeaderComponent,
    HeaderComponent,
    FooterComponent,
    SidenavComponent,
    PagenotfoundComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule,
  ], 
  exports: [
    CommonModule,
    MaterialModule,
    HeaderComponent,
    FooterComponent,
    SidenavComponent,
    RouterModule,
    PagenotfoundComponent,
    ReactiveFormsModule,
    TableComponent
  ]
})
export class SharedModule { }
