import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { ClientsService } from 'src/app/Services/clients.service';
import { ProductsService } from 'src/app/Services/products.service';
import { ServicesService } from 'src/app/Services/services.service';
import { UserService } from 'src/app/Services/user.service';
import { PaydesksService } from 'src/app/Services/paydesks.service';
import { SalesService } from 'src/app/Services/sales.service';

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

  productosAgregados:any[];
  serviciosAgregados:any[];

  user:any; 

  commerce;any;

  clientes:any;

  productos:any;
  productoSeleccionado:any;

  servicios:any;
  servicioSeleccionado:any;

  entries:any[];
  methodpay:any[];

  cajas:any;

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
    private toastr: ToastrService,
    private _clientService:ClientsService,
    private _productService:ProductsService,
    private _servicesService:ServicesService,
    private _userService:UserService,
    private _paydeksService:PaydesksService,
    private _salesService:SalesService
    ){

      this.commerce = JSON.parse(localStorage.getItem('commerce'));

      this._productService.get().subscribe(data =>{
        this.productos = data;
      });

      this._servicesService.get().subscribe(data =>{
        this.servicios = data;
      });

      this._clientService.get().subscribe(data =>{
        this.clientes = data;
      });

      this._paydeksService.get().subscribe(data =>{
        this.cajas = data;
      });

      this._userService.validate().subscribe(
        data=>{
          this.user= data;
        }
      );



      this.productosAgregados = [];
      this.serviciosAgregados = [];

      this.productoSeleccionado= "";
      this.servicioSeleccionado= "";

      this.j=[];
      this.k=[];

      this.entries = [];

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
      caja_id: [this.route.snapshot.params.name, Validators.required],
      cliente_id: [this.route.snapshot.params.name, Validators.required],
      //empleado: [this.route.snapshot.params.empleado], //Si soy administrador puedo selecionar empleado y si soy empleado toma mi id
      enum_status:[this.route.snapshot.params.estado],
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

      this.productosAgregados.push({
        name: this.j['name'],
        count: this.j['count'],
        price: this.j['price'],
        priceTotal: (parseInt(this.j['count']) * parseInt(this.j['price']))
      });

      this.k = JSON.parse(this.route.snapshot.params['servicios']);

      this.serviciosAgregados.push({
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
      producto: ['', Validators.required],
      cantidad: [1,[Validators.required]],
      precio: ['',Validators.compose([
        Validators.required,
        Validators.min(1)
      ])]
    });

    this.registerFormService = this.formBuilder.group({
      servicio: ['', Validators.required],
      priceserv: ['' , Validators.compose([
        Validators.required,
        Validators.min(1)
      ])],
    });

    this.registerFormPaymentMethod = this.formBuilder.group({
      method:['', Validators.required],
      subtotal:['', Validators.required]
    });

  }

  get f() { return this.registerForm.controls; }

  get fProd(){
    return this.registerFormProduct.controls;
  }

  get fServ(){
    return this.registerFormService.controls;
  }

  get fMeth(){
    return this.registerFormPaymentMethod.controls;
  }

  onProductChange() {
   this.productoSeleccionado=this.registerFormProduct.controls['producto'].value;
   this.productoSeleccionado.cantidad = this.registerFormProduct.controls['cantidad'].value;
   this.registerFormProduct.patchValue({
    precio: this.productoSeleccionado['price'],
   });
  }

  onServiceChange() {
    this.servicioSeleccionado = this.registerFormService.controls['servicio'].value;
    this.registerFormService.patchValue({
      priceserv: this.servicioSeleccionado['price'],
    });
  } 

 

  agregarProducto(){    
    
    if (this.registerFormProduct.invalid) {
      this.submittedprod = true;
      return;
    }
    else{
      this.submittedprod = false;
    }

    this.toastr.success('El producto ha sido agregado!','Producto Agregado', {
      timeOut: 5000,
    });

    let t : number= parseInt(this.registerFormProduct.controls['cantidad'].value) * parseInt(this.registerFormProduct.controls['precio'].value);

    this.registerForm.patchValue({
      total: String(t + parseInt(this.registerForm.controls['total'].value)),
    });

    this.productosAgregados.push( {
      id: this.registerFormProduct.controls['producto'].value.id,
      amount: this.registerFormProduct.controls['cantidad'].value,
      price: this.registerFormProduct.controls['precio'].value
    });


    this.registerFormProduct.patchValue({
      producto: '',
      cantidad: '',
      precio: ''
    });
  }


  agregarService(){  

    if (this.registerFormService.invalid) {
      this.submittedserv = true;
      return;
    }
    else{
      this.submittedserv = false;
    }

    this.toastr.success(' El servicio ha sido agregado!','Servicio Agregado', {
      timeOut: 5000,
    });

    this.registerForm.patchValue({
      total: String(parseInt(this.registerFormService.controls['priceserv'].value) + parseInt(this.registerForm.controls['total'].value)),
    });

    this.serviciosAgregados.push({
      id: this.registerFormService.controls['servicio'].value.id,
      price: this.registerFormService.controls['priceserv'].value
    });

    this.registerFormService.patchValue({
      servicio: '',
      priceserv: '',
    });
  }


  agregarMethod(){
    
    

    if (this.registerFormPaymentMethod.invalid) {
      this.submittedMethod=true;
      return;
    }
    else{
      this.submittedMethod=false;
    }

    this.totalprev = this.totalprev + parseInt(this.registerFormPaymentMethod.controls['subtotal'].value);

    if(this.totalprev <= this.registerForm.controls['total'].value){
        
        this.entries.push({
          enum_pay_with: this.registerFormPaymentMethod.controls['method'].value,
          porciento:(this.registerFormPaymentMethod.controls['subtotal'].value)/this.registerForm.controls['total'].value,
          amount:this.registerFormPaymentMethod.controls['subtotal'].value,
        });

        this.toastr.success('El metodo de pago ha sido agregado!','Metodo pago Agregado', {
          timeOut: 5000,
        });
            
        this.registerFormPaymentMethod.patchValue({
          method: '',
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
        this.productosAgregados.splice(position,1);
        
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
        this.serviciosAgregados.splice(position2,1);
      
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
        
        this.totalprev = this.totalprev - parseInt(method.amount);

        this.entries.splice(position2,1);

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
          producto: '',
          cantidad: 1,
          precio: ''
        });
        this.registerFormService.patchValue({
          servicio: '',
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


  Guardar(){
    console.log(this.registerForm.controls.enum_status.value);
    this.submitted = true;
    var venta = {
      client_id : this.registerForm.controls.cliente_id.value,
      description :  this.registerForm.controls.description.value,
      total_cost :  this.registerForm.controls.total.value,     
      products : this.productosAgregados,
      services : this.serviciosAgregados,
      payment:{
        enum_status :  this.registerForm.controls.enum_status.value,
        paydesk_id : this.registerForm.controls.caja_id.value,
        entries : this.entries,
        description : "Ingreso por Venta"
      }        
    }
    
    console.log(venta);

    this._salesService.add(venta).subscribe(data =>{
      console.log(data);
    })

    if (this.registerForm.invalid) {
      return;
    }
  }


}
