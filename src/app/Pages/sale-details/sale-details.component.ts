import { Component, OnInit, ViewChild } from '@angular/core';
import { SaleService } from 'src/app/Services/Globals/sale.service';
import { Sale } from 'src/app/Models/Sale';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { SaleAddPaymentComponent } from 'src/app/Components/sale-add-payment/sale-add-payment.component';
import { CommercesService } from 'src/app/Services/Firestore/commerces.service';
import { Commerce } from 'src/app/Models/Commerce';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-sale-details',
  templateUrl: './sale-details.component.html',
  styleUrls: ['./sale-details.component.sass']
})
export class SaleDetailsComponent implements OnInit {

  @ViewChild("saleAddPayment") saleAddPayment: SaleAddPaymentComponent;
  
  public sale:Sale;
  public commerce:Commerce;
  registerForm: FormGroup;

  heading = 'Venta';
  subheading = 'Detalles de la venta en curso';
  icon = 'pe-7s-cart icon-gradient bg-premium-dark';
  
  constructor(    
    private _saleService:SaleService,    
    private formBuilder: FormBuilder,
    private _commerceService:CommercesService,
    private toastr: ToastrService
  ) { 
    this.sale = new Sale();
    this.commerce = new Commerce();
  }

  ngOnInit() {   

    this._saleService.getActualSaleSubs().subscribe(data=>{
      this.sale = data;     
      console.log(this.sale);
      if(!this.sale.paydesk)
        this.sale.paydesk = this.commerce.paydesks[0];    
    })

    this._commerceService.getSelectedCommerce().subscribe(data=>{
      console.log(data);      
      this.commerce = data;  
      
    })

  }

  public setPaydesk(){
    this._saleService.setPaydesk(this.sale.paydesk);
  }

  public setStatus(status){
    this._saleService.setStatus(this.sale.status);
  }

  public agregarPago(){
    this.saleAddPayment.openModal();
  }

  
  Cancelar(){
    this._saleService.cancel();
  }

  Guardar(){

    //verificar que estén todos los datos.

    var error = "";
    var subtitle =""

    if(!this.sale.paydesk){
      error = "Caja no seleccionada";
      subtitle = "Por favor seleccione una caja antes de continuar"
    }

    if(!this.sale.status){
      error = "Estado no seleccionado";
      subtitle = "Por favor seleccione una estado antes de continuar"
    }

    if(!this.sale.clientId){
      error = "Cliente no seleccionado";
      subtitle = "Por favor seleccione una cliente antes de continuar"
    }

    if(this.sale.products.length == 0 && this.sale.services.length == 0){
      error = "No hay productos ni servicios";
      subtitle = "Por favor seleccione una producto o servicio antes de continuar"
    }

    if(this.sale.payments.length == 0){
      error = "No hay pagos seleccionado";
      subtitle = "Por favor seleccione un pago antes de continuar"
    }

    if(error != ""){
      this.toastr.error(subtitle,error, {
        timeOut: 5000,
      });
      return;
    }
    else{
      this._saleService.save();
      this.toastr.success("La venta a sido guardada correctamebte","Venta Guardada", {
        timeOut: 5000,
      });
    }
    

    
    
  }

  deleteProduct(index){
    this._saleService.deleteProduct(index);
    this.toastr.info("El producto ha sido removida","Producto Removido", {
      timeOut: 5000,
    });
  }

  deleteService(index){
    this._saleService.deleteService(index);
    this.toastr.info("El servicio ha sido removida","Servicio Removido", {
      timeOut: 5000,
    });
  }

  deleteMethod(index){
    this.toastr.info("El método ha sido removida","Método Removido", {
      timeOut: 5000,
    });
    this._saleService.deleteMethod(index);
  }


}
