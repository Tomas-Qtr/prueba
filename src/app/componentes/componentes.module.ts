import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrudComponent } from './crud/crud.component';
import { AgregarComponent } from './agregar/agregar.component';
import { CardComponent } from './card/card.component';



@NgModule({
  declarations: [
    CrudComponent,
    AgregarComponent,
    CardComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ComponentesModule { }
