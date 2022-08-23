import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.css']
})
export class ListarProductosComponent implements OnInit {
  listProductos: Producto[] = [];
  constructor(private _productoSvc: ProductoService) { }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos() {
    this._productoSvc.getProductos().subscribe(res => {
      console.log(res);
      this.listProductos = res;
    })

    
    


  }

  eliminarProducto(id: any) {
    this._productoSvc.eliminarProducto(id).subscribe(data => {
      this.obtenerProductos();
    })
  }

}
