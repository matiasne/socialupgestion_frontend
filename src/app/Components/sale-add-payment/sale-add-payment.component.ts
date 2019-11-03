import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { Sale } from 'src/app/Models/Sale';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SaleService } from 'src/app/Services/Globals/sale.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sale-add-payment',
  templateUrl: './sale-add-payment.component.html',
  styleUrls: ['./sale-add-payment.component.sass']
})
export class SaleAddPaymentComponent implements OnInit {

  public sale:Sale;
  public amount:number;
  public method:String;
  closeResult: string;  
  @ViewChild('content') content: any;
  @Input() titulo:any='Agregar Pago';  
  @Output() public ventaPago = new EventEmitter<string>();

  formGroup: FormGroup;
  
  constructor(
    private modalService: NgbModal, 
    private toastr: ToastrService,
    private _saleService:SaleService,
    private formBuilder: FormBuilder
  ) { 
    this.sale = new Sale();
  }

  ngOnInit() {

    this.formGroup = this.formBuilder.group({
      method: ['', Validators.required],
      amount: ['', Validators.required]
    });

  }

  openModal(){
    this.modalService.open(this.content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if(result == "si"){        
        this.toastr.success('El pago ha sido agregado!','Pago Agregado', {
          timeOut: 5000,
        });
        this._saleService.addPayment(this.formGroup.controls.amount.value,this.formGroup.controls.method.value);  
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
