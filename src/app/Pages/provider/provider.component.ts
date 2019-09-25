import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CommercesService } from 'src/app/Services/commerces.service';
import { Router } from '@angular/router';
import { viewAttached } from '@angular/core/src/render3/instructions';
import { ToastrService } from 'ngx-toastr';
import { ProvidersService } from 'src/app/Services/providers.service';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.sass']
})
export class ProviderComponent implements OnInit {

  heading = 'Proveedores';
  subheading = 'Listado de todos los proveedores del comercio.';
  icon = 'pe-7s-phone icon-gradient bg-premium-dark';
  buttons = [{
    href:"/provider",
    icon:"plus",
    title:"Agregar Proveedor",
  }]

  public providers:any;
  private commerceSubscription: Subscription;
  providerValue;
  closeResult: string;
  
  constructor(
    public _providersService:ProvidersService,
    public router: Router,
    private toastr: ToastrService,
    private modalService: NgbModal
  ) {  
    this.providers = "";
  }


  ngOnDestroy() {
    this.commerceSubscription.unsubscribe();
  }

  ngOnInit() {
    this.obtenerProveedores();
  }

  
  obtenerProveedores(){
    this.commerceSubscription =  this._providersService.get().subscribe(data=>{
      this.providers = data;
      console.log(this.providers);
      if(this.providers == "0"){
        this.router.navigate(['/home']);
      }
    });
  }
  


  UpdateService(provider){

  
    
  }

  deleteProvider(content,provider,$event){
    $event.stopPropagation();
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if(result == "si"){
        this._providersService.deleteProvider(provider).subscribe(
          response=>{
            this.toastr.info(provider.name+' ha sido borrado!','Servicio Borrado', {
              timeOut: 5000,
            });
            this.obtenerProveedores();
          }
        )
      }
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }

  public updateTable(){
    this.providerValue="";
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}

