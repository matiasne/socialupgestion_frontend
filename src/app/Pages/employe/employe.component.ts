import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommercesService } from 'src/app/Services/commerces.service';
import { Router } from '@angular/router';
import { EmployeesService } from 'src/app/Services/employees.service';
import { UserService } from 'src/app/Services/user.service';
import { User } from 'src/app/Models/User';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employe',
  templateUrl: './employe.component.html',
  styleUrls: ['./employe.component.sass']
})
export class EmployeComponent implements OnInit {
  
  heading = 'Empleados';
  subheading = 'Listado de todos los empleados del comercio.';
  icon = 'pe-7s-phone icon-gradient bg-premium-dark';
  buttons = [{
    href:"/employee",
    icon:"plus",
    title:"Agregar Empleado"
  }]

  public commerce:any;
  public employees:any;
  private commerceSubscription: Subscription;
  empleadoValue;
  
  
  constructor(
    private modalService: NgbModal,
    public _commerceService:CommercesService,
    public router: Router,
    public _employeeService:EmployeesService,
    private toastr: ToastrService
  ) {
  
    this.commerce = "";
    
    this.commerceSubscription =  this._commerceService.getSelectedCommerce().subscribe(data=>{
      this.commerce = data;
      console.log(this.commerce);
      if(this.commerce == "0"){
        this.router.navigate(['/home']);
      }
    });
  }

  ngOnDestroy() {
    this.commerceSubscription.unsubscribe();
  }

  ngOnInit() {
    this.obtenerEmpleados();
  }

  obtenerEmpleados(){
    this._employeeService.get().subscribe(data=>{
      this.employees = data;
    })
  }


  desasignar(user){
    this._employeeService.desasignarRolEmpleado(user).subscribe(data=>{
      this.toastr.info('el empleado '+user.name+' ha sido removido','Empleado Borrado', {
        timeOut: 5000,
      });
      this.obtenerEmpleados();
    })
  }

  public updateTable(){
    this.empleadoValue="";
  }

}
