import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'detalle-cliente',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  // Creación de un objeto de la clase Cliente
  cliente : Cliente;
  titulo : String = "FOTO"
  constructor(private clienteService : ClienteService, private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {

    // El contenido del onInit se va a encargar de almacenar en una variable,
    // gracias al método get, la id de cada cliente. Tras esto se establecerá
    // una condición para ver si dicha id existe y si existe que la muestre.
    this.activatedRoute.paramMap.subscribe(params => {
      let id = +params.get('id')
      if(id){
        this.clienteService.getCliente(id).subscribe(cliente => {
          this.cliente = cliente;
        })
      }
    });

  }

}
