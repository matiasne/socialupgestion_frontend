import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.sass']
})
export class AddEmployeeComponent implements OnInit {

  public busqueda:string;


  constructor(
    public _userService:UserService
  ) { }

  ngOnInit() {
  }

  buscarUsuario(){
    
  }

}
