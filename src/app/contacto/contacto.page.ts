import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.page.html',
  styleUrls: ['./contacto.page.scss'],
  standalone: false
})
export class ContactoPage implements OnInit {

  constructor() { }
mensaje = {
  nombre: '',
  correo: '',
  texto: ''
};

enviarMensaje() {
  // Aquí puedes agregar la lógica para enviar el mensaje, por ejemplo, un API REST o alertas
  console.log('Mensaje enviado:', this.mensaje);
  alert('Gracias por contactarnos, te responderemos pronto.');
  
  // Limpiar formulario
  this.mensaje = { nombre: '', correo: '', texto: '' };
}

  ngOnInit() {
  }

}
