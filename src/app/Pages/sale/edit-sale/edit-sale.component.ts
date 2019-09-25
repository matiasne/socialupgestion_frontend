import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-edit-sale',
  templateUrl: './edit-sale.component.html',
  styleUrls: ['./edit-sale.component.sass']
})
export class EditSaleComponent implements OnInit {
  
  closeResult: string;
  registerForm: FormGroup;
  registerFormProduct: FormGroup;
  registerFormService: FormGroup;
  registerFormPaymentMethod: FormGroup;
  submitted = false;
  submittedprod = false;
  submittedserv = false;
  submittedMethod = false;

  products:any[];
  services:any[];
  prods:any[];
  prod2:any[];

  servs:any[];
  serv2:any[];

  methodlist:any[];
  methodpay:any[];

  heading;
  subheading;
  icon;
  items: any;
  orderForm: any;

  j:any=[];
  k:any=[];
  
  totalprev:number=0;

  constructor(private modalService: NgbModal,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService){

      var commerce = JSON.parse(localStorage.getItem('commerce'));
      this.prods=commerce.products;
      this.servs=commerce.services;

      this.products = [];
      this.services = [];

      this.prod2= [];
      this.serv2= [];

      this.j=[];
      this.k=[];

      this.methodlist = [];

      this.methodpay=[{
        name: "Efectivo"
      },{
        name: "Credito"
      },{
        name: "Debito"
      },{
        name: "Cuenta Corriente"
      },{
        name: "Descuentos"
      }];
  }

  ngOnInit() {
 
    this.registerForm = this.formBuilder.group({
      nombrecliente: [this.route.snapshot.params.name, Validators.required],
      //empleado: [this.route.snapshot.params.empleado], //Si soy administrador puedo selecionar empleado y si soy empleado toma mi id
      salestatus:[this.route.snapshot.params.estado],
      paymentform:[this.route.snapshot.params.pago],
      total:[ this.route.snapshot.params.total,Validators.compose([
        Validators.required,
        Validators.min(1)
      ])],
      description:[this.route.snapshot.params.descripcion]
    });

    if(this.route.snapshot.params.id != undefined){

      this.heading = 'Actualizar Venta';
      this.subheading = 'Modificar campos para actualizar la venta.';
      this.icon = 'pe-7s-phone icon-gradient bg-premium-dark';

      this.j = JSON.parse(this.route.snapshot.params['productos']);

      this.products.push({
        name: this.j['name'],
        count: this.j['count'],
        price: this.j['price'],
        priceTotal: (parseInt(this.j['count']) * parseInt(this.j['price']))
      });

      this.k = JSON.parse(this.route.snapshot.params['servicios']);

      this.services.push({
        name: this.k['name'],
        price: this.k['price'],
      });


    }else{
      this.heading = 'Generar Venta';
      this.subheading = 'Completar los campos para generar la nueva venta.';
      this.icon = 'pe-7s-phone icon-gradient bg-premium-dark';

      this.registerForm.patchValue({
        total:0,
      });
    }


    this.registerFormProduct = this.formBuilder.group({
      nameprod: ['', Validators.required],
      cantprod: [1,[Validators.required]],
      priceprod: ['',Validators.compose([
        Validators.required,
        Validators.min(1)
      ])]
    });

    this.registerFormService = this.formBuilder.group({
      nameserv: ['', Validators.required],
      priceserv: ['' , Validators.compose([
        Validators.required,
        Validators.min(1)
      ])],
    });

    this.registerFormPaymentMethod = this.formBuilder.group({
      methodname:['', Validators.required],
      subtotal:['', Validators.required]
    });

  }

  get f() { return this.registerForm.controls; }

  get prod(){
    return this.registerFormProduct.controls;
  }

  get serv(){
    return this.registerFormService.controls;
  }

  get meth(){
    return this.registerFormPaymentMethod.controls;
  }

  onProductChange() {
   this.prod2=this.registerFormProduct.controls['nameprod'].value;
   this.registerFormProduct.patchValue({
    priceprod: this.prod2['price'],
    });
  }

  onServiceChange() {
    this.serv2 =this.registerFormService.controls['nameserv'].value;
    this.registerFormService.patchValue({
      priceserv: this.serv2['price'],
    });
  } 

  Guardar(){

    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }
  }

  agregar(){

    this.submittedprod = true;
    
    if (this.registerFormProduct.invalid) {
      return;
    }

    this.toastr.success('El producto ha sido agregado!','Producto Agregado', {
      timeOut: 5000,
    });

    let t : number= parseInt(this.registerFormProduct.controls['cantprod'].value) * parseInt(this.registerFormProduct.controls['priceprod'].value);

    this.registerForm.patchValue({
      total: String(t + parseInt(this.registerForm.controls['total'].value)),
    });
    this.products.push({
      name: this.prod2['name'],
      count: this.registerFormProduct.controls['cantprod'].value,
      price: parseInt(this.registerFormProduct.controls['priceprod'].value),
      priceTotal: parseInt(this.registerFormProduct.controls['cantprod'].value) * 
      parseInt(this.registerFormProduct.controls['priceprod'].value),
    });


    this.registerFormProduct.patchValue({
      nameprod: '',
      cantprod: '',
      priceprod: ''
    });
  }


  agregarService(){

    
    this.submittedserv = true;

    if (this.registerFormService.invalid) {
      return;
    }

    this.toastr.success(' El servicio ha sido agregado!','Servicio Agregado', {
      timeOut: 5000,
    });

    this.registerForm.patchValue({
      total: String(parseInt(this.registerFormService.controls['priceserv'].value) + parseInt(this.registerForm.controls['total'].value)),
    });


    this.services.push({
      name: this.serv2['name'],
      price: this.registerFormService.controls['priceserv'].value,
    });

    this.registerFormService.patchValue({
      nameserv: '',
      priceserv: '',
    });
  }


  agregarMethod(){
    
    this.submittedMethod=true;

    if (this.registerFormPaymentMethod.invalid) {
      return;
    }

    this.totalprev = this.totalprev + parseInt(this.registerFormPaymentMethod.controls['subtotal'].value);

    if(this.totalprev <= this.registerForm.controls['total'].value){
        
        this.methodlist.push({
          namee:this.registerFormPaymentMethod.controls['methodname'].value,
          porciento:(this.registerFormPaymentMethod.controls['subtotal'].value)/this.registerForm.controls['total'].value,
          subtotal:this.registerFormPaymentMethod.controls['subtotal'].value,
        });

        this.toastr.success('El metodo de pago ha sido agregado!','Metodo pago Agregado', {
          timeOut: 5000,
        });
            
        this.registerFormPaymentMethod.patchValue({
          methodname: '',
          subtotal: ''
        });
        
    }else{

      this.toastr.error('Error al ingresar cantidad de pago! Limite Superado!','Metodo Pago', {
        timeOut: 5000,
      });

      this.totalprev = this.totalprev - parseInt(this.registerFormPaymentMethod.controls['subtotal'].value);
    }
  }

  deleteProduct(content,product,position){

    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if(result == "si"){
        this.registerForm.patchValue({
          total: String(parseInt(this.registerForm.controls['total'].value) - parseInt(product.priceTotal)),
        });
        this.products.splice(position,1);
        
        this.toastr.success(' El Producto ha sido borrado!','Producto Borrado', {
          timeOut: 5000,
        });
      }
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }

  deleteService(content,service,position2){

    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if(result == "si"){
        this.registerForm.patchValue({
          total: String(parseInt(this.registerForm.controls['total'].value) - parseInt(service.price)),
        });
        this.services.splice(position2,1);
      
        this.toastr.success(' El Servicio ha sido borrado!','Servicio Borrado', {
          timeOut: 5000,
        });
      }
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    
  }

  deleteMethod(content,method,position2){
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if(result == "si"){
        
        this.totalprev = this.totalprev - parseInt(method.subtotal);

        this.methodlist.splice(position2,1);

        this.toastr.success(' La Forma de pago ha sido borrado!','Forma de pago Borrada', {
          timeOut: 5000,
        });
      }
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


  open(content) {

    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if(result == "si"){
        this.registerFormProduct.patchValue({
          nameprod: '',
          cantprod: 1,
          priceprod: ''
        });
        this.registerFormService.patchValue({
              nameserv: '',
              priceserv: '',
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
