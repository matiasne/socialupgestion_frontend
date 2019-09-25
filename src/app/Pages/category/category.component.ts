import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/Services/categoryes.service';
import { Category } from 'src/app/Models/Category';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

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
    public _categoriesService:CategoriesService,
    private toastr: ToastrService
  ) { 
    this.categories = "";
  }

  ngOnInit() {
    console.log("Init category");
    this.obtenerCategorias();
  }

  obtenerCategorias(){
    this.categories = [];
    this.categoryesSubscription =  this._categoriesService.get().subscribe(data=>{
      this.categories = data;     
    });
  }

  ngOnDestroy() {
    console.log("destroy category");
    this.categoryesSubscription.unsubscribe();
  }

  delete(category){
    this._categoriesService.delete(category).subscribe(
      response=>{
        this.toastr.info(category.name+' ha sido borrado!','Servicio Borrado', {
          timeOut: 5000,
        });
        this.obtenerCategorias();
      }
    )
  }

}
