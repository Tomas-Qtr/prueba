import { Injectable } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import {AngularFirestoreCollection} from '@angular/fire/compat/firestore'
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private coleccionProductos: AngularFirestoreCollection<Producto>

  getProducto(){

    this.coleccionProductos.snapshotChanges();
  }


  constructor() { 

  

  }
}
