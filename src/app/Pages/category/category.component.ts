import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.sass']
})
export class CategoryComponent implements OnInit {

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

  
  
  constructor( private modalService: NgbModal
    ) { }

  ngOnInit() {

    this.category=[{
      id:1,
      name:"Dulces"
    },{
      id:2,
      name:"Pizzas"
    }];
  }

  deleteCategory(content,$event){

    $event.stopPropagation();
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log(result);
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

}
