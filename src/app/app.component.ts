import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Producto } from './models/producto';
import { ProductosService } from './servicios/productos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent implements OnInit{

  title = 'ctrdymas';
  //Creaos el controlador del formulario
  nuevosproducts=new FormGroup({
    nombre: new FormControl('',Validators.required),
    precio: new FormControl(0,Validators.required),
    descripcion: new FormControl('',Validators.required)

  })
  productos:Producto[];
  constructor(private servicioProductos:ProductosService ){
 //dnhdjfhdf
  }
//Hacemos un metodo que agrega productos a la base de datos y los muestra en cards
  
  agregarProducto(){
    //agregamos un producto creando una variable "nuevos productos"
    if(this.nuevosproducts.valid){
      let nuevosProductos:Producto={
        //Vinculamos el controlador de formulario
      nombre: this.nuevosproducts.value.nombre!,
      precio: this.nuevosproducts.value.precio!,
      descripcion:this.nuevosproducts.value.descripcion!,
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
    else{
      alert("Hay campos vacios")
    }  
  }
  ngOnInit(): void {
    this.servicioProductos.getProducto().subscribe(producto=>{
      this.productos = producto;
    })
  }
 
}

