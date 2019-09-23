import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-subscription',
  templateUrl: './edit-subscription.component.html',
  styleUrls: ['./edit-subscription.component.sass']
})
export class EditSubscriptionComponent implements OnInit {

  closeResult: string;
  registerForm: FormGroup;
  registerFormService: FormGroup;
  submitted = false;
  submittedprod = false;
  submittedserv = false;
  submittedMethod = false;

  services:any[];
  servs:any[];
  serv2:any[];

  heading;
  subheading;
  icon;
  items: any;
  orderForm: any;

  k:any=[];

  methodlist:any[];
  methodpay:any[];

  totalprev:number=0;

  currentDate() {
    const currentDate = new Date();
    return currentDate.toISOString().substring(0,10);
  }

  constructor(private modalService: NgbModal,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService){

      var commerce = JSON.parse(localStorage.getItem('commerce'));

      this.servs=commerce.services;
    
      this.services = [];

      this.serv2= [];

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
      nombrecliente: [this.route.snapshot.params.cliente, Validators.required],
      //empleado: [this.route.snapshot.params.empleado], //Si soy administrador puedo selecionar empleado y si soy empleado toma mi id
      dateIni: [this.currentDate() ,Validators.required],
      period: [this.route.snapshot.params.periodo],
      status:[this.route.snapshot.params.estado],
      statuspayment:[this.route.snapshot.params.estadopago],
      total:[this.route.snapshot.params.total,Validators.min(1)],
    });

    if(this.route.snapshot.params.id != undefined){

      this.heading = 'Detalle de la Suscripcion';
      this.subheading = 'Campos rellenos con los detalles de la suscripcion';
      this.icon = 'pe-7s-phone icon-gradient bg-premium-dark';

      this.k = JSON.parse(this.route.snapshot.params['servicios']);

      this.services.push({
        name: this.k['name'],
        price: this.k['price'],
      });

    }else{
      this.heading = 'Generar Suscripcion';
      this.subheading = 'Completar los campos para generar la nueva suscripcion.';
      this.icon = 'pe-7s-phone icon-gradient bg-premium-dark';

      this.registerForm.patchValue({
        total:0,
      });

    }

    this.registerFormService = this.formBuilder.group({
      nameserv: ['', Validators.required],
      priceserv: ['' , Validators.compose([
        Validators.required,
        Validators.min(1)
      ])],
    });

  }

  get f() { return this.registerForm.controls; }

  get serv(){
    return this.registerFormService.controls;
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
  

  deleteService(content,service,position2){

    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if(result == "si"){
        this.registerForm.patchValue({
          total: String (parseInt(this.registerForm.controls['total'].value) - service.price),
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

  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if(result == "si"){
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
