import { Component, OnInit, EventEmitter, ViewChild, Output } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CategoriesService } from 'src/app/Services/Firestore/categories.service';

@Component({
  selector: 'app-commerce-select-category',
  templateUrl: './commerce-select-category.component.html',
  styleUrls: ['./commerce-select-category.component.sass']
})
export class CommerceSelectCategoryComponent implements OnInit {

  closeResult: string;  
  public name:String = "";
  @ViewChild('content') content: any;
  @Output() public retorno = new EventEmitter<any>();

  formGroup: FormGroup;

  public categories:any;
  private categoriesSubscription: Subscription;
  
  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    public _categoriesService:CategoriesService,
  ) { }

  ngOnInit() {

    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
    });

  }


  openModal(){

    this.categoriesSubscription = this._categoriesService.getCommerceCategories().subscribe((snapshot) => {
      this.categories = [];
      snapshot.forEach((snap: any) => {
        this.categories.push(snap.payload.doc.data());
        this.categories[this.categories.length - 1].id = snap.payload.doc.id;        
      });
      console.log(this.categories);
    });

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
