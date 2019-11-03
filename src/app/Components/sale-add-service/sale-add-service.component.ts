import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SaleService } from 'src/app/Services/Globals/sale.service';
import { ToastrService } from 'ngx-toastr';
import { Service } from 'src/app/Models/Service';
import { Plan } from 'src/app/Models/Plan';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-sale-add-service',
  templateUrl: './sale-add-service.component.html',
  styleUrls: ['./sale-add-service.component.sass']
})
export class SaleAddServiceComponent implements OnInit {

  closeResult: string;
  
  @ViewChild('content') content: any;

  private service:Service;  
  @Input() titulo:any='';

  @Output() public ventaDetalles = new EventEmitter<string>();

  public planSelected:any;
  
  formGroup: FormGroup;

  constructor(
    private modalService: NgbModal, 
    private _saleService:SaleService,    
    private toastr: ToastrService,    
    private formBuilder: FormBuilder
  ) {
    this.planSelected = 0;
  }

  ngOnInit() {

    this.formGroup = this.formBuilder.group({
      planSelected: ['', Validators.required]
    });

  }

  openModal(service){
    this.service = service;
    this.modalService.open(this.content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if(result == "si"){         

        this.toastr.success('El servicio ha sido agregado!','Servicio Agregado', {
          timeOut: 5000,
        });
                
        this._saleService.addService(this.service,this.service.plans[this.formGroup.controls.planSelected.value]);  
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
