import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-crear-productos',
  templateUrl: './crear-productos.component.html',
  styleUrls: ['./crear-productos.component.css']
})
export class CrearProductosComponent implements OnInit {
  productoForm: FormGroup;
  titulo = 'Crear Producto';
  id: string | null;
  constructor(private fb: FormBuilder, private router: Router, private _snackBar: MatSnackBar,
    private productoSvc: ProductoService,
    private aRoute: ActivatedRoute) {
    this.productoForm = this.fb.group({
      producto: ['', Validators.required],
      categoria: ['', Validators.required],
      ubicacion: ['', Validators.required],
      precio: ['', Validators.required],

    })

    this.id = this.aRoute.snapshot.paramMap.get('id');
   }

  ngOnInit(): void {
    this.esEditar();
  }

  onSubmit() {
    console.log(this.productoForm);
    console.log(this.productoForm.get('producto')?.value);

    const PRODUCTO: Producto = {
      nombre: this.productoForm.get('producto')?.value,
      categoria: this.productoForm.get('categoria')?.value,
      ubicacion: this.productoForm.get('ubicacion')?.value,
      precio: this.productoForm.get('precio')?.value,
    };

    if(this.id !== null) {
      //editamos producto
      this.productoSvc.editarProducto(this.id, PRODUCTO).subscribe(res => {
        console.log('Producto actualizad');
        this.router.navigate(['/']);
      })
    } else {
      //agregamos producot
      this.productoSvc.saveProducto(PRODUCTO).subscribe(
        res => {
          console.log('registro con exito');
          this._snackBar.open('Datos Añadidos', 'Ok', {
            duration: 2000,
            panelClass: ['blue-snackbar']
          });
          this.router.navigate(['/']);
        })
    }

    console.log(PRODUCTO);
    
      

    
    
    
  }

  esEditar() {
    if(this.id !== null) {
      this.titulo = 'Editar producto';
      this.productoSvc.obtenerProducto(this.id).subscribe(res => {
        this.productoForm.setValue({
          producto: res.nombre,
          categoria: res.categoria,
          ubicacion: res.ubicacion,
          precio: res.precio,
        })
      })
    }
  }

}
