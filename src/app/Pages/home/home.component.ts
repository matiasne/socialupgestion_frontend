import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';
import { Router } from '@angular/router';
import { Commerce } from 'src/app/Models/Commerce';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CommercesService } from 'src/app/Services/Firestore/commerces.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  public commerces:any[];
  closeResult: string;
  private commerceSubscription: Subscription;
  
  constructor(
    private _userService:UserService,
    private _commercesSerivce:CommercesService,
    public router: Router,
    private toastr: ToastrService,
    private modalService: NgbModal,
  ) { }

  ngOnInit(
  ) {   
    
    this.commerceSubscription = this._commercesSerivce.getAllbyUser().subscribe((clientSnapshot) => {
      this.commerces = [];
      clientSnapshot.forEach((clientData: any) => {
        this.commerces.push(clientData.payload.doc.data());
        this.commerces[this.commerces.length - 1].id = clientData.payload.doc.id;        
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
