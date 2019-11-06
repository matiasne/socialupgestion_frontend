import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CategoriesService } from 'src/app/Services/Firestore/categories.service';
import { CommercesService } from 'src/app/Services/Firestore/commerces.service';


@Component({
  selector: 'app-product-select-category',
  templateUrl: './product-select-category.component.html',
  styleUrls: ['./product-select-category.component.sass']
})
export class ProductSelectCategoryComponent implements OnInit {

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
    private _commerceService:CommercesService,
  ) { }

  ngOnInit() {

    

    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
    });

  }


  openModal(){

    console.log("OPEN")
    this.categoriesSubscription = this._commerceService.getSelectedCommerce().subscribe(data=>{
      console.log(data);   
      this.categories = data.productCategories;
      
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
