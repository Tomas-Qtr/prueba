import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Producto } from './models/producto';
import { ProductosService } from './servicios/productos.service';
import { StorageService } from './servicios/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent implements OnInit{

  habilitaBoton=true;

  imagen:string;
  nombreImagen:string
  title = 'ctrdymas';

//la variable que vamoas a usar para cambiar el boton agrgar/editar
  textoboton:string

  productoselecionado:Producto

  //Creaos el controlador del formulario
  nuevosproducts=new FormGroup({
    nombre: new FormControl('',Validators.required),
    precio: new FormControl(0,Validators.required),
    descripcion: new FormControl('',Validators.required),

  })
  productos:Producto[];
  constructor(private servicioProductos:ProductosService, private servicioStrorage:StorageService ){
 //dnhdjfhdf
  }


//Hacemos un metodo que agrega productos a la base de datos y los muestra en cards
  agregarProducto(){
    
    this.textoboton = 'agregar producto'
    //agregamos un producto creando una variable "nuevos productos"
    if(this.nuevosproducts.valid){
      let nuevosProductos:Producto={
        //Vinculamos el controlador de formulario
      nombre: this.nuevosproducts.value.nombre,
      precio: this.nuevosproducts.value.precio,
      descripcion:this.nuevosproducts.value.descripcion,
      imagen:"",
      idProdocto:""
    } 
    //storage para subir la imagen a la base de datos e firebase y que se muestra en la pagina
      this.servicioStrorage.subirImagen(this.nombreImagen, this.imagen)
      .then(
        async res=>{
          this.servicioStrorage.obtenerUrlImagen(res)
          .then(
            async url =>{
               //declaramos la variable en el parametro
              this.servicioProductos.createProducto(nuevosProductos, url).then(producto=>{
                alert("Producto agregado con exito")
              })
              .catch(error=>{
                alert("ocurrio un error\nError: "+ error)
              })
                                                        
            }
          )
        }
      )
     
    }
    else{
      alert("Hay campos vacios")
    }  
  }

  actualizarProductos(){
    //este nuevo metodo va a llamra a los datos
    let nuevosProductos:Producto={
      //Vinculamos el controlador de formulario
    nombre: this.nuevosproducts.value.nombre,
    precio: this.nuevosproducts.value.precio,
    descripcion:this.nuevosproducts.value.descripcion,
    imagen:"",
    idProdocto:this.productoselecionado.idProdocto
  } 
    //
    this.servicioProductos.editarProducto(this.productoselecionado.idProdocto, nuevosProductos).then((resp)=>{
      alert("Producto actualizado con exito")
    })
    .catch((error)=>{
      alert('No se pudo actualizar el producto ')
    })
  }


  mostarEditar(productoSeleccionado:Producto){
    this.textoboton = 'actualizar producto'
    this.productoselecionado = productoSeleccionado

    this.nuevosproducts.setValue({
      nombre: productoSeleccionado.nombre,
      descripcion: productoSeleccionado.descripcion,
      precio: productoSeleccionado.precio,
      imagen: productoSeleccionado.imagen
    }
    
    )
    this.textoboton="Editar producto"
  }


  cargarProducto(){
    if(this.textoboton === "Agregar producto"){
      this.agregarProducto()
    }
    else if (this.textoboton === "Edidtar Producto"){
      this.actualizarProductos()
    }
  }



  //creamos una funcion que al selccionar un producto busque su id para despues eliminarlo
  mostrarEliminarProducto(producto:Producto){
    this.productoselecionado = producto
  }
  //careamos la funcion que hace eliminar el producto vinculandoce con el servicio
  eliminarProducto(producto:Producto){
    this.productoselecionado = producto
    this.servicioProductos.deleteProducto(this.productoselecionado.idProdocto).then((resp)=>{
      alert('el producto fue eliminado con exito')
    })
    .catch((err)=>{
      alert('no se pudo eliminar')
    })
  }

  //

  habilitarBoton(){
    this.habilitaBoton=!this.habilitaBoton;
  }


  cargarImagen(event:any){
    let archivo = event.target.files[0]
    let reader = new FileReader()
    if(archivo!=undefined){
      reader.readAsDataURL(archivo)
      reader.onloadend = () =>{
        let url = reader.result
        if (url!=null){
          this.nombreImagen= archivo.name
          this.imagen =url.toString()
        }
      }
    }
  }
  ngOnInit(): void {
    this.servicioProductos.getProducto().subscribe(producto=>{
      this.productos = producto;
    })
  }
  
}

