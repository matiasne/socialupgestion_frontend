import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CommercesService } from 'src/app/Services/commerces.service';
import { Router } from '@angular/router';
import { viewAttached } from '@angular/core/src/render3/instructions';
import { ToastrService } from 'ngx-toastr';
import { ProvidersService } from 'src/app/Services/Firestore/providers.service';

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
  private providersSubscription: Subscription;
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
    if(this.providersSubscription)
      this.providersSubscription.unsubscribe();
  }

  
  ngOnInit() {
    
    this.providersSubscription = this._providersService.getAll().subscribe((snapshot) => {
      this.providers = [];
      snapshot.forEach((snap: any) => {
        this.providers.push(snap.payload.doc.data());
        this.providers[this.providers.length - 1].id = snap.payload.doc.id;        
      });
      console.log(this.providers);
    });
  }
  


  deleteProvider(content,provider){
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if(result == "si"){     
        console.log(provider.id);
        this.toastr.info(provider.name+' ha sido borrado!','Proveedor Borrado', {
          timeOut: 5000,
        });      
        this._providersService.delete(provider.id).then(() => {
                 
        }, (error) => {
          console.error(error);
        });      
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

