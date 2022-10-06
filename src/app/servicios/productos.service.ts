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
//agregamos "url:string"
  createProducto(nuevoProducto:Producto, url:string){
    
    return new Promise(async (resolve, rejects)=>{
      try{
        const id = this.db.createId();
        nuevoProducto.idProdocto= id;
        //decimos que la url de firebase va a estar declarada en imagen
        nuevoProducto.imagen=url;
        const respuesta= await this.coleccionProductos.doc(id).set(nuevoProducto);
        resolve(respuesta)
        }
        catch(error){
          rejects(error)
        }
    })
    
  }

  editarProducto(idProdocto:string, nuevoDatos:Producto){
    //quremos ingresar (por el parametro "idProdocto") al documento para despues subir lo nuevos datos (gracias al parametro "nuevoDatos")
    return this.coleccionProductos.doc(idProdocto).update(nuevoDatos)

  }

  deleteProducto(idProdocto:string){
    return new Promise((resolve, rejects)=>{
      try{
        const res = this.coleccionProductos.doc(idProdocto).delete()
        resolve(res)
      }
      catch(error){
        rejects(error)
      }
    })
   
    
  }

  
}
