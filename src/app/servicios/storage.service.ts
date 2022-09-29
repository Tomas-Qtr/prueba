import { Injectable } from '@angular/core';
import {getStorage, uploadString, ref, UploadResult, getDownloadURL, } from "firebase/storage"
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private respuesta: UploadResult

  private storage = getStorage() //obtenemos la referencia al storage
  constructor() { }

  async subirImagen(nombre:string , imagen:any){//creamos una funcion para subir la imagen
    try{
      let referenciaIagen = ref(this.storage, 'productos/' +nombre) //toma como referencia en que lugar se va a gurardar la imagen y su nombre
      this.respuesta = await uploadString(referenciaIagen, imagen, 'data_url') //creo la variable donde se va a guardar la imagen
      .then(res=>{
        return res
      })
      return this.respuesta
    }
    catch(error){
      console.log(error)
      return this.respuesta
    }
  }


  obtenerUrlImagen(respuesta:UploadResult){
    return getDownloadURL (respuesta.ref) //nos dvuelve la url de la imagen con firestore con la funcion "getDownloadURL"
  }
}
