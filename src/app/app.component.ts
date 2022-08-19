import { Component, OnInit } from '@angular/core';
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
  ngOnInit(): void {
    this.servicioProductos.getProducto()
  }
 
}

