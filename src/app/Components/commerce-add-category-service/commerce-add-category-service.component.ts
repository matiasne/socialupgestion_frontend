import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-commerce-add-category-service',
  templateUrl: './commerce-add-category-service.component.html',
  styleUrls: ['./commerce-add-category-service.component.sass']
})
export class CommerceAddCategoryServiceComponent implements OnInit {

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
