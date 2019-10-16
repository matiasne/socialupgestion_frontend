import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Commerce } from 'src/app/Models/Commerce';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CommercesService } from 'src/app/Services/Firestore/commerces.service';
import { Subscription } from 'rxjs';
import { AuthenticationProvider } from 'src/app/Services/Firestore/authentication/authentication';
import { UsersService } from 'src/app/Services/Firestore/users.service';
import { AngularFirestore } from 'angularfire2/firestore';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  public commerces:any[];
  closeResult: string;
  private commerceSubscription: Subscription;

  heading = 'Comercios';
  subheading = 'Listado de todos los comercio.';
  icon = 'pe-7s-phone icon-gradient bg-premium-dark';
  buttons = [{
    href:"/commerce",
    icon:"plus",
    title:"Agregar Comercio"
  }]
  
  constructor(
    private _usersService:UsersService,
    private _commercesSerivce:CommercesService,
    public router: Router,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private auth:AuthenticationProvider,    
    private firestore: AngularFirestore,
  ) { }

  ngOnInit(
  ) {   
    
    this.commerceSubscription = this._usersService.getCommerces().subscribe((snpshot) => {
      this.commerces = [];
      snpshot.forEach((snap: any) => { 

        console.log(snap.payload.doc.data());
        
          this.firestore.doc('commerces/'+snap.payload.doc.data().commerce_id).valueChanges().subscribe(
            data=>{
              if(data){
                console.log(data);                
                this.commerces.push(data);
                this.commerces[this.commerces.length - 1].id = snap.payload.doc.data().commerce_id;
              }                 
            }
          );        
        
      }); 
      console.log(this.commerces);
    });

    
    
  
    
  }

  ngOnDestroy() {
    this.commerceSubscription.unsubscribe();
  }  

  selecionarComercio(commerce){
    this._commercesSerivce.setSelectedCommerce(commerce.id);    
    this.router.navigate(['/sales']);
  }

  deleteCommerce(content,commerce){  

    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if(result == "si"){
        this._commercesSerivce.delete(commerce.id).then(() => {
                 
        }, (error) => {
          console.error(error);
        });  
        this.toastr.info(commerce.name+' ha sido borrado!','Comercio Borrado', {
          timeOut: 5000,
        });          
        
      }
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

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
