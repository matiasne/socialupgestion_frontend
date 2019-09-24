import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';
import { EmployeesService } from 'src/app/Services/employees.service';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/Models/User';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.sass']
})
export class AddEmployeeComponent implements OnInit {

  public busqueda:string;
  public users:any;
  public employee:any;

  constructor(
    public _userService:UserService,
    public _employeeService:EmployeesService,
    private toastr: ToastrService
  ) { 
    this.employee = new User();
  }

  ngOnInit() {
  }

  buscarUsuario(){
    this._userService.search(this.busqueda).subscribe(users=>{
      this.users = users;
      console.log(users);
    })
  }

  asignar(user){
    this._employeeService.asignarRolEmpleado(user).subscribe(data=>{
      this.toastr.info('el usuario '+user.name+' ha sido asignado como empleado!','Empleado Asignado', {
        timeOut: 5000,
      });
    })
  }

  

}
