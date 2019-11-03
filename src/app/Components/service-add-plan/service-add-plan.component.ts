import { Component, OnInit, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-service-add-plan',
  templateUrl: './service-add-plan.component.html',
  styleUrls: ['./service-add-plan.component.sass']
})
export class ServiceAddPlanComponent implements OnInit {

  public period:string;
  public price:string;
  public name:string;
  closeResult: string;  
  @ViewChild('content') content: any;
  @Input() titulo:any='Agregar Pago';  
  @Output() public retorno = new EventEmitter<any>();

  formGroup: FormGroup;
  
  constructor(
    private modalService: NgbModal, 
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {

    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      period: ['', Validators.required],
      price: ['', Validators.required]
    });

  }

  openModal(){
    this.modalService.open(this.content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if(result == "si"){  
        this.toastr.info('El plan ha sido agregado!','Plan Agregado', {
          timeOut: 5000,
        });
        let params = {
          period:this.formGroup.controls.period.value,
          price:this.formGroup.controls.price.value,
          name:this.formGroup.controls.name.value
        }
        this.retorno.emit(params);
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
