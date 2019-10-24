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
        this.commerceSubscription.unsubscribe();
      }); 
      console.log(this.commerces);
    });
  }

  ngAfterViewInit(){
    this._commercesSerivce.setSelectedCommerce(0);  
  }

  ngOnDestroy() {
    this.commerceSubscription.unsubscribe();
  }  

  selecionarComercio(commerce_id){
    this._commercesSerivce.setSelectedCommerce(commerce_id);    
    this.router.navigate(['/products']);
  }

}
