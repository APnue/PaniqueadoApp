import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-catalogo-categorias',
  templateUrl: './catalogo-categorias.page.html',
  styleUrls: ['./catalogo-categorias.page.scss'],
  standalone: false
})
export class CatalogoCategoriasPage implements OnInit {

  productos: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>('https://paniqueado-api.onrender.com/api/productos_con_categoria.php')
      .subscribe(data => {
        this.productos = data;
      });
  }

}
