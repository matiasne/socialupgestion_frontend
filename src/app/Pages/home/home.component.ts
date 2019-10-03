import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';
import { Router } from '@angular/router';
import { CommercesService } from 'src/app/Services/commerces.service';
import { Commerce } from 'src/app/Models/Commerce';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  public commerces:any[];
  closeResult: string;
  
  constructor(
    private _userService:UserService,
    private _commercesSerivce:CommercesService,
    public router: Router,
    private toastr: ToastrService,
    private modalService: NgbModal,
  ) { }

  ngOnInit(
  ) {   
    
    

    this._userService.validate().subscribe(
      data=>{
        
        this.getCommerces();
        
      },
      error=>{
        console.log(error);
        if(error == "401"){
          this._userService.logout();
          this.router.navigate(['/']);
        }
      }
    )
  }

  getCommerces(){
    this._commercesSerivce.setSelectedCommerce(undefined);   
    this._commercesSerivce.get().subscribe(
      (resp:any)=>{
        this.commerces = resp;
        console.log(this.commerces);
        if(this.commerces.length == 0){
          this.toastr.error('Para comenzar debes crear tu primer comercio!','Crea un comercio', {
            timeOut: 5000,
          });
        }
      },
      error=>{
        alert(error);
        this._userService.logout();
        this.router.navigate(['/']);
      }
    )
  }

  selecionarComercio(commerce){
    this._commercesSerivce.setSelectedCommerce(commerce);    
    this.router.navigate(['/sales']);
  }

  deleteCommerce(content,commerce){  

    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if(result == "si"){
        this._commercesSerivce.delete(commerce).subscribe(
          response=>{
            
            this.toastr.info(commerce.name+' ha sido borrado!','Comercio Borrado', {
              timeOut: 5000,
            });
            this.getCommerces();
          }
        )
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
