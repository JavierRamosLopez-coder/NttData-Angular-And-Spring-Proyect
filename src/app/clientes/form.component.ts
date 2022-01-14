import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  public cliente : Cliente = new Cliente();
  public titulo : string = "Crear cliente"

  constructor(private clienteService : ClienteService, private router : Router,private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarCliente()
  }

  /**
   * Método encargado de mostrar los datos del cliente cuando lo queramos modificar
   */
  public cargarCliente() : void{
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if(id){
        this.clienteService.getClientee(id).subscribe(
          (cliente) => this.cliente = cliente
        )
      }
    }
    )
  }

  /**
   * Método encargado de crear un nuevo cliente
   */
  public create(): void{
    this.clienteService.create(this.cliente).subscribe(
      json => {
        this.router.navigate(['/clientes'])
        swal.fire('Nuevo cliente',`Cliente ${json.cliente.nombre}`,'success')
      }
    )
  }

  /**
   * Método encargado de actualizar un cliente
   */
  public update() : void{
    this.clienteService.update(this.cliente).subscribe(
      json => {
        this.router.navigate(['/clientes'])
        swal.fire('Cliente actualizado', `Cliente ${json.cliente.nombre}`,`success`)
      }
    )
  }
}
