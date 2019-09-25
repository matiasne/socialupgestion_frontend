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
import {EditProductComponent} from './Pages/product/edit-product/edit-product.component';

//Sale
import {SaleComponent} from './Pages/sale/sale.component';
import {EditSaleComponent} from './Pages/sale/edit-sale/edit-sale.component';

//Subscription
import {SubscriptionComponent} from './Pages/subscription/subscription.component';
import {EditSubscriptionComponent} from './Pages/subscription/edit-subscription/edit-subscription.component';


//Payment
import {PaymentComponent} from './Pages/payment/payment.component';
import {PaymentstoreComponent} from './Pages/payment/paymentstore/paymentstore.component';


//Cliente
import {ClientComponent} from './Pages/client/client.component';

//Employe
import {EmployeComponent} from './Pages/employe/employe.component';

//Provider
import {ProviderComponent} from './Pages/provider/provider.component';

//Caja 
import {CajaComponent} from './Pages/caja/caja.component';
import {EditCajaComponent} from './Pages/caja/edit-caja/edit-caja.component';

//Service
import {ServiceComponent} from './Pages/service/service.component';
import { EditServiceComponent } from './Pages/service/edit-service/edit-service.component';
import { EditClientComponent } from './Pages/client/edit-client/edit-client.component';
import { EditProviderComponent } from './Pages/provider/edit-provider/edit-provider.component';
import { EditCommerceComponent } from './Pages/commerce/edit-commerce/edit-commerce.component';
import { AddEmployeeComponent } from './Pages/employe/add-employee/add-employee.component';


//Category
import {CategoryComponent} from './Pages/category/category.component';
import {EditCategoryComponent} from './Pages/category/edit-category/edit-category.component';


const routes: Routes = [
  {path: '', component: LoginComponent, data: {extraParameter: 'dashboardsMenu'}},
  {
    path: '',
    component: BaseLayoutComponent,
    children: [

      //home

      {path: 'home' , component:HomeComponent, data:{extraParameter: ''}},
      {path: 'commerce' , component:EditCommerceComponent, data:{extraParameter: ''}},

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
      {path: 'products', component:ProductComponent, data: {extraParameter: ''}},
      {path: 'product', component:EditProductComponent, data: {extraParameter: ''}},
  
      //Sale 
      {path: 'sales', component:SaleComponent, data: {extraParameter: ''}},
      {path: 'sale', component:EditSaleComponent, data: {extraParameter: ''}},

      //Subscription 
      {path: 'subscriptions', component:SubscriptionComponent, data: {extraParameter: ''}},
      {path: 'subscription', component:EditSubscriptionComponent, data: {extraParameter: ''}},
      
      //Payment
      {path: 'pagare', component:PaymentComponent, data:{extraParameter: ''} },
      {path: 'pagare/guardar', component:PaymentstoreComponent, data:{extraParameter: ''} },


      //Client
      {path: 'clients', component:ClientComponent, data:{extraParameter: ''} },
      {path: 'client', component:EditClientComponent, data:{extraParameter: ''} },

      //Employe
      {path: 'employees', component:EmployeComponent, data:{extraParameter: ''} },
      {path: 'employee', component:AddEmployeeComponent, data:{extraParameter: ''} },

      //Provider
      {path: 'providers', component:ProviderComponent, data:{extraParameter: ''} },
      {path: 'provider', component:EditProviderComponent, data:{extraParameter: ''} },

      //Caja
      {path: 'cajas', component:CajaComponent, data:{extraParameter: ''} },
      {path: 'caja', component:EditCajaComponent, data:{extraParameter: ''} },

      //Service
      {path: 'services', component:ServiceComponent, data:{extraParameter: ''} },
      {path: 'service', component:EditServiceComponent, data:{extraParameter: ''} },

      //Category
      {path: 'categories', component:CategoryComponent, data:{extraParameter: ''} },
      {path: 'category', component:EditCategoryComponent, data:{extraParameter: ''} },
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
