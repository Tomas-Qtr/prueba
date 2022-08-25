import { Injectable } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import {AngularFirestore ,AngularFirestoreCollection} from '@angular/fire/compat/firestore';
import { Producto } from '../models/producto';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private coleccionProductos: AngularFirestoreCollection<Producto>

  getProducto(){

    return this.coleccionProductos.snapshotChanges().
    pipe(map(action=>action.map(a=>a.payload.doc.data())))
  }


  constructor(private db:AngularFirestore) { 

  this.coleccionProductos = db.collection('productos')

  }

  createProducto(nuevoProducto:Producto){
    
    return new Promise(async (resolve, rejects)=>{
      try{
        const id = this.db.createId();
        nuevoProducto.idProdocto= id;
    
        const respuesta= await this.coleccionProductos.doc().set(nuevoProducto);
        resolve(respuesta)
        }
        catch(error){
          rejects(error)
        }
    })
    
  }
}
