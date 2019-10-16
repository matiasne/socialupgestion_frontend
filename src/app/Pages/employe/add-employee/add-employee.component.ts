import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/Models/User';
import { UsersService } from 'src/app/Services/Firestore/users.service';
import { Subscribable, Subscription } from 'rxjs';
import { EmployeesService } from 'src/app/Services/Firestore/employees.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.sass']
})
export class AddEmployeeComponent implements OnInit {

  public busqueda:string;
  public users:any;
  public employee:any;
  private subscriptionUsers:Subscription;

  constructor(
    public _userService:UsersService,
    public _employeeService:EmployeesService,
    private toastr: ToastrService
  ) { 
    this.employee = new User();
  }

  ngOnInit() {
  }

  buscarUsuario(){
    if(this.subscriptionUsers)
      this.subscriptionUsers.unsubscribe();

    this.subscriptionUsers = this._userService.getAllbyEMail(this.busqueda).subscribe((snapshot) => {
      this.users = [];
      snapshot.forEach((snap: any) => {
        this.users.push(snap.payload.doc.data());
        this.users[this.users.length - 1].id = snap.payload.doc.id;        
      });
      console.log(this.users);
    });
  }

  asignarRol(user){

    this._userService.asignEmployee(user);

    this.toastr.info('el usuario '+user.name+' ha sido asignado como empleado!','Empleado Asignado', {
      timeOut: 5000,
    });
  }

  

}
