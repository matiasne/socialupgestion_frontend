import {Component, HostBinding, ViewChild} from '@angular/core';
import {select} from '@angular-redux/store';
import {Observable, Subscription} from 'rxjs';
import {ThemeOptions} from '../../../theme-options';
import { CommercesService } from 'src/app/Services/Firestore/commerces.service';
import { SaleService } from 'src/app/Services/Globals/sale.service';
import { Sale } from 'src/app/Models/Sale';
import { SaleAddPaymentComponent } from 'src/app/Components/sale-add-payment/sale-add-payment.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {

  @ViewChild("saleAddPayment") saleAddPayment: SaleAddPaymentComponent;
  
  public commerceName:string;
  public commerceIcon:string;
  private commerceSubscription: Subscription;
  private saleSubscription:Subscription;
  public sale:Sale;

  constructor(public globals: ThemeOptions,
    public _commerceService:CommercesService,
    public _saleService:SaleService
    ) {
      this.sale = new Sale();
  }

  ngOnInit() {

    this.saleSubscription = this._saleService.getActualSaleSubs().subscribe(data=>{
      this.sale = data;
      console.log(this.sale);
    })

    this.commerceSubscription =  this._commerceService.getSelectedCommerce().subscribe(data=>{
       console.log(data);   
       if(data)   {
         this.commerceName = data.name;
         this.commerceIcon = data.icon;
       }  
       else{
         this.commerceName = undefined;
         this.commerceIcon = undefined;
       }       
     });
   }

  @HostBinding('class.isActive')
  get isActiveAsGetter() {
    return this.isActive;
  }

  isActive: boolean;

  @select('config') public config$: Observable<any>;

  toggleSidebarMobile() {
    this.globals.toggleSidebarMobile = !this.globals.toggleSidebarMobile;
  }

  toggleHeaderMobile() {
    this.globals.toggleHeaderMobile = !this.globals.toggleHeaderMobile;
  }

  
  public agregarPago(){
    this.saleAddPayment.openModal();
  }

}
