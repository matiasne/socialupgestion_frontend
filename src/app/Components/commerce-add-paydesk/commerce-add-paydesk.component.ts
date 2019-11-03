import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { ModalDismissReasons, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CommercesService } from 'src/app/Services/Firestore/commerces.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-commerce-add-paydesk',
  templateUrl: './commerce-add-paydesk.component.html',
  styleUrls: ['./commerce-add-paydesk.component.sass']
})
export class CommerceAddPaydeskComponent implements OnInit {
  
  closeResult: string;  
  public name:String = "";
  @ViewChild('content') content: any;
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
    });

  }

  openModal(){
    this.modalService.open(this.content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if(result == "si"){ 
       
        console.log(this.formGroup.valid)
       
        this.retorno.emit(this.formGroup.controls.name.value);
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
