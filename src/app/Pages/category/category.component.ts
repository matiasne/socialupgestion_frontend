import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/Models/Category';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { CategoriesService } from 'src/app/Services/Firestore/categories.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.sass']
})
export class CategoryComponent implements OnInit {

  public categories:any;
  private categoryesSubscription: Subscription;

  heading = 'Categorias';
  subheading = 'Listado de todos las categorias del comercio.';
  icon = 'pe-7s-phone icon-gradient bg-premium-dark';
  buttons = [{
    href:"/category",
    icon:"plus",
    title:"Agregar Categoria"
  }]
  closeResult: string;

  category:any=[];

  
  constructor(
    private modalService: NgbModal,
    public _categoriesService:CategoriesService,
    private toastr: ToastrService
  ) { 
    this.categories = "";
  }

  ngOnInit() {
    console.log("Init category");
    this.categoryesSubscription = this._categoriesService.getAll().subscribe((snapshot) => {
      this.categories = [];
      snapshot.forEach((snap: any) => {
        this.categories.push(snap.payload.doc.data());
        this.categories[this.categories.length - 1].id = snap.payload.doc.id;        
      });
      console.log(this.categories);
    });
  }


  ngOnDestroy() {
    console.log("destroy category");
    this.categoryesSubscription.unsubscribe();
  }

  delete(content,category){

    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if(result == "si"){
        this._categoriesService.delete(category.id);
        this.toastr.info(category.name+' ha sido borrado!','Categoria Borrada', {
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
