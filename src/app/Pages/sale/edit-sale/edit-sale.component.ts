import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators, FormGroup} from '@angular/forms'
import { SaleService } from 'src/app/Services/Globals/sale.service';
import { Sale } from 'src/app/Models/Sale';

@Component({
  selector: 'app-edit-sale',
  templateUrl: './edit-sale.component.html',
  styleUrls: ['./edit-sale.component.sass']
})
export class EditSaleComponent implements OnInit {
  
  closeResult: string;
  registerForm: FormGroup;
  registerFormPaymentMethod: FormGroup;
  submitted = false;
  

  cajas:any;

  heading;
  subheading;
  icon;
  items: any;
  orderForm: any;


  public sale:Sale;

  constructor(private modalService: NgbModal,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private _saleService:SaleService
    ){      

    

      this.sale = new Sale();
      
  }

  ngOnInit() {
 
    this.heading = 'Venta';
    this.subheading = 'Venta en curso';
    this.icon = 'pe-7s-cart icon-gradient bg-premium-dark';

    this.registerForm = this.formBuilder.group({
      caja_id: [this.route.snapshot.params.name, Validators.required],
      cliente_id: [this.route.snapshot.params.name, Validators.required],
      enum_status:[this.route.snapshot.params.estado],
      description:[this.route.snapshot.params.descripcion]
    });

    this._saleService.getActualSaleSubs().subscribe(data=>{
      this.sale = data;
      console.log(this.sale);
    })

  }

  get f() { return this.registerForm.controls; }

 

  

  deleteProduct(content,product,position){

    

  }

  deleteService(content,service,position2){

    
    
  }

  deleteMethod(content,method,position2){
    
  }


  open(content) {

    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if(result == "si"){
        
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

  Cancelar(){
    this._saleService.cancel();
  }

  Guardar(){
    this._saleService.save();
    
  }


}
