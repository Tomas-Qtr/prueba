import { Injectable } from '@angular/core';
import {getStorage} from "firebase/storage"
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private storage = getStorage() //obtenemos la referencia al storage
  constructor() { }
}
