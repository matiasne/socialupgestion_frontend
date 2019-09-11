import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {BaseLayoutComponent} from './Layout/base-layout/base-layout.component';
import {PagesLayoutComponent} from './Layout/pages-layout/pages-layout.component';

// DEMO PAGES

// Dashboards

import {AnalyticsComponent} from './DemoPages/Dashboards/analytics/analytics.component';

// Pages

import {ForgotPasswordBoxedComponent} from './DemoPages/UserPages/forgot-password-boxed/forgot-password-boxed.component';
import {LoginBoxedComponent} from './DemoPages/UserPages/login-boxed/login-boxed.component';
import {RegisterBoxedComponent} from './DemoPages/UserPages/register-boxed/register-boxed.component';
import {LoginComponent} from './Pages/login/login.component';


//Home
import {HomeComponent} from './Pages/home/home.component';


// Elements

import {StandardComponent} from './DemoPages/Elements/Buttons/standard/standard.component';
import {DropdownsComponent} from './DemoPages/Elements/dropdowns/dropdowns.component';
import {CardsComponent} from './DemoPages/Elements/cards/cards.component';
import {ListGroupsComponent} from './DemoPages/Elements/list-groups/list-groups.component';
import {TimelineComponent} from './DemoPages/Elements/timeline/timeline.component';
import {IconsComponent} from './DemoPages/Elements/icons/icons.component';

// Components

import {AccordionsComponent} from './DemoPages/Components/accordions/accordions.component';
import {TabsComponent} from './DemoPages/Components/tabs/tabs.component';
import {CarouselComponent} from './DemoPages/Components/carousel/carousel.component';
import {ModalsComponent} from './DemoPages/Components/modals/modals.component';
import {ProgressBarComponent} from './DemoPages/Components/progress-bar/progress-bar.component';
import {PaginationComponent} from './DemoPages/Components/pagination/pagination.component';
import {TooltipsPopoversComponent} from './DemoPages/Components/tooltips-popovers/tooltips-popovers.component';

// Tables

import {TablesMainComponent} from './DemoPages/Tables/tables-main/tables-main.component';

// Widgets

import {ChartBoxes3Component} from './DemoPages/Widgets/chart-boxes3/chart-boxes3.component';

// Forms Elements

import {ControlsComponent} from './DemoPages/Forms/Elements/controls/controls.component';
import {LayoutComponent} from './DemoPages/Forms/Elements/layout/layout.component';

// Charts

import {ChartjsComponent} from './DemoPages/Charts/chartjs/chartjs.component';


//Product

import {ProductComponent} from './Pages/product/product.component';
import {StoreComponent} from './Pages/product/store/store.component';
import {UpdateComponent} from './Pages/product/update/update.component';
import {ProductdeleteComponent} from './Pages/product/productdelete/productdelete.component';

//Sale

import {SaleComponent} from './Pages/sale/sale.component';
import {SaleupdateComponent} from './Pages/sale/saleupdate/saleupdate.component';
import {SalestoreComponent} from './Pages/sale/salestore/salestore.component';
import {SaledeleteComponent} from './Pages/sale/saledelete/saledelete.component';

//Subscription

import {SubscriptionComponent} from './Pages/subscription/subscription.component';
import {SubscriptionstoreComponent} from './Pages/subscription/subscriptionstore/subscriptionstore.component';
import {SubscriptiondeleteComponent} from './Pages/subscription/subscriptiondelete/subscriptiondelete.component';


//Payment

import {PaymentComponent} from './Pages/payment/payment.component';
import {PaymentstoreComponent} from './Pages/payment/paymentstore/paymentstore.component';
import {PaymentdeleteComponent} from './Pages/payment/paymentdelete/paymentdelete.component';


//Cliente
import {ClientComponent} from './Pages/client/client.component';
import {ClientstoreComponent} from './Pages/client/clientstore/clientstore.component';
import {ClientupdateComponent} from './Pages/client/clientupdate/clientupdate.component';
import {ClientdeleteComponent} from './Pages/client/clientdelete/clientdelete.component';

//Employe
import {EmployeComponent} from './Pages/employe/employe.component';
import {EmployestoreComponent} from './Pages/employe/employestore/employestore.component';
import {EmployeupdateComponent} from './Pages/employe/employeupdate/employeupdate.component';
import {EmployedeleteComponent} from './Pages/employe/employedelete/employedelete.component';

const routes: Routes = [
  {path: '', component: LoginComponent, data: {extraParameter: 'dashboardsMenu'}},
  {
    path: '',
    component: BaseLayoutComponent,
    children: [

      //home

      {path: 'home' , component:HomeComponent, data:{extraParameter: ''}},

      // Dashboads

     

      // Elements

      {path: 'elements/buttons-standard', component: StandardComponent, data: {extraParameter: 'elementsMenu'}},
      {path: 'elements/dropdowns', component: DropdownsComponent, data: {extraParameter: 'elementsMenu'}},
      {path: 'elements/icons', component: IconsComponent, data: {extraParameter: 'elementsMenu'}},
      {path: 'elements/cards', component: CardsComponent, data: {extraParameter: 'elementsMenu'}},
      {path: 'elements/list-group', component: ListGroupsComponent, data: {extraParameter: 'elementsMenu'}},
      {path: 'elements/timeline', component: TimelineComponent, data: {extraParameter: 'elementsMenu'}},

      // Components

      {path: 'components/tabs', component: TabsComponent, data: {extraParameter: 'componentsMenu'}},
      {path: 'components/accordions', component: AccordionsComponent, data: {extraParameter: 'componentsMenu'}},
      {path: 'components/modals', component: ModalsComponent, data: {extraParameter: 'componentsMenu'}},
      {path: 'components/progress-bar', component: ProgressBarComponent, data: {extraParameter: 'componentsMenu'}},
      {path: 'components/tooltips-popovers', component: TooltipsPopoversComponent, data: {extraParameter: 'componentsMenu'}},
      {path: 'components/carousel', component: CarouselComponent, data: {extraParameter: 'componentsMenu'}},
      {path: 'components/pagination', component: PaginationComponent, data: {extraParameter: 'componentsMenu'}},

      // Tables

      {path: 'tables/bootstrap', component: TablesMainComponent, data: {extraParameter: 'tablesMenu'}},

      // Widgets

      {path: 'widgets/chart-boxes-3', component: ChartBoxes3Component, data: {extraParameter: 'pagesMenu3'}},

      // Forms Elements

      {path: 'forms/controls', component: ControlsComponent, data: {extraParameter: 'formElementsMenu'}},
      {path: 'forms/layouts', component: LayoutComponent, data: {extraParameter: 'formElementsMenu'}},

      // Charts

      {path: 'charts/chartjs', component: ChartjsComponent, data: {extraParameter: ''}},

      //Product 
      {path: 'producto', component:ProductComponent, data: {extraParameter: ''}},
      {path: 'producto/guardar', component:StoreComponent, data: {extraParameter: ''}},
      {path: 'producto/actualizar', component:UpdateComponent, data: {extraParameter: ''}},
      {path: 'producto/borrar', component:ProductdeleteComponent, data: {extraParameter: ''}},
      
      //Sale 
      {path: 'venta', component:SaleComponent, data: {extraParameter: ''}},
      {path: 'venta/guardar', component:SalestoreComponent, data: {extraParameter: ''}},
      {path: 'venta/actualizar', component:SaleupdateComponent, data: {extraParameter: ''}},
      {path: 'venta/borrar', component:SaledeleteComponent, data: {extraParameter: ''}},

      //Subscription 
      {path: 'subscripcion', component:SubscriptionComponent, data: {extraParameter: ''}},
      {path: 'subscripcion/guardar', component:SubscriptionstoreComponent, data: {extraParameter: ''}},
      {path: 'subscripcion/borrar', component:SubscriptiondeleteComponent, data: {extraParameter: ''}},
      
      //Payment
      {path: 'pagare', component:PaymentComponent, data:{extraParameter: ''} },
      {path: 'pagare/guardar', component:PaymentstoreComponent, data:{extraParameter: ''} },
      {path: 'pagare/borrar', component:PaymentdeleteComponent, data:{extraParameter: ''} },


      //Client
      {path: 'cliente', component:ClientComponent, data:{extraParameter: ''} },
      {path: 'cliente/guardar', component:ClientstoreComponent, data:{extraParameter: ''} },
      {path: 'cliente/actualizar', component:ClientupdateComponent, data:{extraParameter: ''} },
      {path: 'cliente/borrar', component:ClientdeleteComponent, data:{extraParameter: ''} },

      //Employe
      {path: 'empleado', component:EmployeComponent, data:{extraParameter: ''} },
      {path: 'empleado/guardar', component:EmployestoreComponent, data:{extraParameter: ''} },
      {path: 'empleado/actualizar', component:EmployeupdateComponent, data:{extraParameter: ''} },
      {path: 'empleado/borrar', component:EmployedeleteComponent, data:{extraParameter: ''} },

    ]
  },
  {
    path: '',
    component: PagesLayoutComponent,
    children: [

      // User Pages
      {path: 'login' , component:LoginComponent, data:{extraParameter: ''}},
      {path: 'pages/login-boxed', component: LoginBoxedComponent, data: {extraParameter: ''}},
      {path: 'pages/register-boxed', component: RegisterBoxedComponent, data: {extraParameter: ''}},
      {path: 'pages/forgot-password-boxed', component: ForgotPasswordBoxedComponent, data: {extraParameter: ''}},
    ]
  },
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
    })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
