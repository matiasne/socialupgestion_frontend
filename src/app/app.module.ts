import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgReduxModule} from '@angular-redux/store';
import {NgRedux, DevToolsExtension} from '@angular-redux/store';
import {rootReducer, ArchitectUIState} from './ThemeOptions/store';
import {ConfigActions} from './ThemeOptions/store/config.actions';
import {AppRoutingModule} from './app-routing.module';
import {LoadingBarRouterModule} from '@ngx-loading-bar/router';

import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';

// BOOTSTRAP COMPONENTS

import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {PERFECT_SCROLLBAR_CONFIG} from 'ngx-perfect-scrollbar';
import {PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';
import {ChartsModule} from 'ng2-charts';

//FIREBASE

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
// LAYOUT

import {BaseLayoutComponent} from './Layout/base-layout/base-layout.component';
import {PagesLayoutComponent} from './Layout/pages-layout/pages-layout.component';
import {PageTitleComponent} from './Layout/Components/page-title/page-title.component';

// HEADER

import {HeaderComponent} from './Layout/Components/header/header.component';
import {SearchBoxComponent} from './Layout/Components/header/elements/search-box/search-box.component';
import {UserBoxComponent} from './Layout/Components/header/elements/user-box/user-box.component';
// SIDEBAR


import {SidebarComponent} from './Layout/Components/sidebar/sidebar.component';
import {LogoComponent} from './Layout/Components/sidebar/elements/logo/logo.component';

// FOOTER

import {FooterComponent} from './Layout/Components/footer/footer.component';

// DEMO PAGES

// Dashboards

import {AnalyticsComponent} from './DemoPages/Dashboards/analytics/analytics.component';

// Pages

import {ForgotPasswordBoxedComponent} from './DemoPages/UserPages/forgot-password-boxed/forgot-password-boxed.component';
import {LoginBoxedComponent} from './DemoPages/UserPages/login-boxed/login-boxed.component';
import {RegisterBoxedComponent} from './DemoPages/UserPages/register-boxed/register-boxed.component';

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

import {RegularComponent} from './DemoPages/Tables/regular/regular.component';
import {TablesMainComponent} from './DemoPages/Tables/tables-main/tables-main.component';

// Widgets

import {ChartBoxes3Component} from './DemoPages/Widgets/chart-boxes3/chart-boxes3.component';

// Forms Elements

import {ControlsComponent} from './DemoPages/Forms/Elements/controls/controls.component';
import {LayoutComponent} from './DemoPages/Forms/Elements/layout/layout.component';

// Charts

import {ChartjsComponent} from './DemoPages/Charts/chartjs/chartjs.component';

// Chart.js Examples

import {LineChartComponent} from './DemoPages/Charts/chartjs/examples/line-chart/line-chart.component';
import {BarChartComponent} from './DemoPages/Charts/chartjs/examples/bar-chart/bar-chart.component';
import {ScatterChartComponent} from './DemoPages/Charts/chartjs/examples/scatter-chart/scatter-chart.component';
import {RadarChartComponent} from './DemoPages/Charts/chartjs/examples/radar-chart/radar-chart.component';
import {PolarAreaChartComponent} from './DemoPages/Charts/chartjs/examples/polar-area-chart/polar-area-chart.component';
import {BubbleChartComponent} from './DemoPages/Charts/chartjs/examples/bubble-chart/bubble-chart.component';
import {DynamicChartComponent} from './DemoPages/Charts/chartjs/examples/dynamic-chart/dynamic-chart.component';
import {DoughnutChartComponent} from './DemoPages/Charts/chartjs/examples/doughnut-chart/doughnut-chart.component';
import {PieChartComponent} from './DemoPages/Charts/chartjs/examples/pie-chart/pie-chart.component';
import { LoginComponent } from './Pages/login/login.component';
import { HomeComponent } from './Pages/home/home.component';
import { ProductComponent } from './Pages/product/product.component';
import { SaleComponent } from './Pages/sale/sale.component';
import { SubscriptionComponent } from './Pages/subscription/subscription.component';
import { PaymentComponent } from './Pages/payment/payment.component';
import { PaymentstoreComponent } from './Pages/payment/paymentstore/paymentstore.component';
import { ClientComponent } from './Pages/client/client.component';
import { EmployeComponent } from './Pages/employe/employe.component';
import { SingleModalComponent } from './DemoPages/Components/single-modal/single-modal.component';
import { ModalComponent } from './Components/modal/modal.component';
import { ModalaboutComponent } from './Components/modalabout/modalabout.component';
import { ProviderComponent } from './Pages/provider/provider.component';
import { ServiceComponent } from './Pages/service/service.component';
import { CajaComponent } from './Pages/caja/caja.component';
import { EditServiceComponent } from './Pages/service/edit-service/edit-service.component';
import { ToastrModule } from 'ngx-toastr';
import { EditClientComponent } from './Pages/client/edit-client/edit-client.component';
import { EditProviderComponent } from './Pages/provider/edit-provider/edit-provider.component';
import { EditCommerceComponent } from './Pages/commerce/edit-commerce/edit-commerce.component';
import { AddEmployeeComponent } from './Pages/employe/add-employee/add-employee.component';
import { EditSubscriptionComponent } from './Pages/subscription/edit-subscription/edit-subscription.component';
import { CategoryComponent } from './Pages/category/category.component';
import { EditSaleComponent } from './Pages/sale/edit-sale/edit-sale.component';
import { FilterPipe } from './filter.pipe';
import { EditCategoryComponent } from './Pages/category/edit-category/edit-category.component';
import { EditProductComponent } from './Pages/product/edit-product/edit-product.component';
import { EditCajaComponent } from './Pages/caja/edit-caja/edit-caja.component';
import { environment } from 'src/environments/environment';
import { AngularFirestore, AngularFirestoreModule } from 'angularfire2/firestore';
import { SignupComponent } from './Pages/signup/signup.component';
import { ResetPasswordComponent } from './Pages/reset-password/reset-password.component';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthenticationProvider } from './Services/Firestore/authentication/authentication';
import { ImageSelectComponent } from './Components/image-select/image-select.component';

import { ImageCropperModule } from 'ngx-image-cropper';
import { NgxFileDropModule } from 'ngx-file-drop';
import { LocationSelectComponent } from './Components/location-select/location-select.component';
import { AgmCoreModule } from '@agm/core';
import { PeriodTimeSelectComponent } from './Components/period-time-select/period-time-select.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

const firebaseConfig = {
  apiKey: "AIzaSyDAhS48nSs-siVX7Cpf1dgSLOcM3F4mesc",
  authDomain: "socialup-gestion.firebaseapp.com",
  databaseURL: "https://socialup-gestion.firebaseio.com",
  projectId: "socialup-gestion",
  storageBucket: "socialup-gestion.appspot.com",
  messagingSenderId: "420603724818",
  appId: "1:420603724818:web:613185ef81f6f1b00604cb",
  measurementId: "G-0Q1S00KMXP"
}

@NgModule({
  declarations: [

    // LAYOUT

    AppComponent,
    BaseLayoutComponent,
    PagesLayoutComponent,
    PageTitleComponent,

    // HEADER

    HeaderComponent,
    SearchBoxComponent,
    UserBoxComponent,

    // SIDEBAR

    SidebarComponent,
    LogoComponent,

    // FOOTER

    FooterComponent,

    // DEMO PAGES

    // Dashboards

    AnalyticsComponent,

    // User Pages

    ForgotPasswordBoxedComponent,
    LoginBoxedComponent,
    RegisterBoxedComponent,

    // Elements

    StandardComponent,
    IconsComponent,
    DropdownsComponent,
    CardsComponent,
    ListGroupsComponent,
    TimelineComponent,

    // Components

    AccordionsComponent,
    TabsComponent,
    CarouselComponent,
    ModalsComponent,
    ProgressBarComponent,
    PaginationComponent,
    TooltipsPopoversComponent,

    // Tables

    RegularComponent,
    TablesMainComponent,

    // Dashboard Boxes

    ChartBoxes3Component,

    // Form Elements

    ControlsComponent,
    LayoutComponent,

    // CHARTS

    ChartjsComponent,

    // Chart.js Examples

    LineChartComponent,
    BarChartComponent,
    DoughnutChartComponent,
    RadarChartComponent,
    PieChartComponent,
    PolarAreaChartComponent,
    DynamicChartComponent,
    BubbleChartComponent,
    ScatterChartComponent,
    LoginComponent,
    HomeComponent,
    ProductComponent,
    SaleComponent,
    SubscriptionComponent,
    PaymentComponent,
    PaymentstoreComponent,
    ClientComponent,
    EmployeComponent,
    SingleModalComponent,
    ModalComponent,
    ModalaboutComponent,
    ProviderComponent,
    ServiceComponent,
    CategoryComponent ,
    CajaComponent,
    EditServiceComponent,
    EditClientComponent,
    EditProviderComponent,
    EditCommerceComponent,
    AddEmployeeComponent,
    EditSaleComponent,
    EditSubscriptionComponent,
    FilterPipe,
    EditCategoryComponent,
    EditProductComponent,
    EditCajaComponent,
    SignupComponent,
    ResetPasswordComponent,
    ImageSelectComponent,
    LocationSelectComponent,
    PeriodTimeSelectComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule.enablePersistence(),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB3wHh6FC8s9pGTodHC9F47Ac8OAWG-6as',
      libraries: ['places']
    }),
    AppRoutingModule,
    BrowserAnimationsModule,
    NgReduxModule,
    CommonModule,
    LoadingBarRouterModule,
    ImageCropperModule,
    NgxFileDropModule,
    // Angular Bootstrap Components

    PerfectScrollbarModule,
    NgbModule,
    AngularFontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    // Charts

    ChartsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    {
      provide:
      PERFECT_SCROLLBAR_CONFIG,
      // DROPZONE_CONFIG,
      useValue:
      DEFAULT_PERFECT_SCROLLBAR_CONFIG,
      // DEFAULT_DROPZONE_CONFIG,
    },
    ConfigActions,    
    AngularFirestore,
    AuthenticationProvider
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(private ngRedux: NgRedux<ArchitectUIState>,
              private devTool: DevToolsExtension) {

    this.ngRedux.configureStore(
      rootReducer,
      {} as ArchitectUIState,
      [],
      [devTool.isEnabled() ? devTool.enhancer() : f => f]
    );

  }
}
