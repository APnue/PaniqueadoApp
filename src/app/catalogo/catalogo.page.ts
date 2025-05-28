import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.page.html',
  styleUrls: ['./catalogo.page.scss'],
  standalone: false,
})
export class CatalogoPage implements OnInit {

  productos: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<any[]>('https://paniqueado.atwebpages.com/api/productos_con_categoria.php')
      .subscribe(data => {
        this.productos = data;
      }, error => {
        console.error('Error al cargar productos:', error);
      });
  }
}
