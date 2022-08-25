import { Component, OnInit } from '@angular/core';
import { Producto } from './models/producto';
import { ProductosService } from './servicios/productos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent implements OnInit{
  title = 'ctrdymas';

  constructor(private servicioProductos:ProductosService ){
 //dnhdjfhdf
  }
  agregarProducto(){
    //agregamos un producto creando una variable "nuevos productos"
    let nuevosProductos:Producto={
      nombre:"lampara",
      precio:2500,
      descripcion:"lampara de bajo consumo",
      idProdocto:""
    } 
    //declaramos la variable en el parametro
    this.servicioProductos.createProducto(nuevosProductos).then(producto=>{
      alert("Producto agregado con exito")
    })
    .catch(error=>{
      alert("ocurrio un error\nError: "+ error)
    })
  }
  ngOnInit(): void {
    this.servicioProductos.getProducto().subscribe(producto=>{
      console.log(producto)
    })
  }
 
}

