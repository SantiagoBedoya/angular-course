import { Component } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-no-comunes',
  templateUrl: './no-comunes.component.html',
  styles: [
  ]
})
export class NoComunesComponent {

  /* i18nSelect */
  nombre: string = 'Santiago';
  genero: string = 'masculino';

  invitacionMapa = {
    'masculino': 'invitarlo',
    'femenino': 'invitarla'
  }

  /* i18nPlural */
  clientes: string[] = ['maria', 'luisa', 'juan', 'jose', 'rogelio'];
  clientesMapa = {
    '=0': 'no tenemos clientes esperando',
    '=1': 'tenemos un cliente esperando',
    '=2': 'tenemos 2 clientes esperando',
    'other': 'tenemos # clientes esperando'
  }

  cambiarCliente(){
    this.nombre = 'Maria';
    this.genero = 'femenino';
  }

  borrarCliente(){
    this.clientes.pop();
  }

  /* KeyValue pipe */
  persona = {
    nombre: 'Santiago',
    edad: 19,
    direccion: 'Manizales, Caldas'
  }

  /* JSON pipe */
  heroes = [
    {
      nombre: 'Superman',
      vuela: true
    },
    {
      nombre: 'Robin',
      vuela: false
    },
    {
      nombre: 'Aquaman',
      vuela: false
    }
  ]

  /* Async Pipe */
  miObservable = interval(1000);

  valorPromesa = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Tenemos data de promesa');
    }, 3500);
  });

}
