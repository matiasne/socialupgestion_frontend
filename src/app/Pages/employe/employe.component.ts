import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmployeesService } from 'src/app/Services/Firestore/employees.service';

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
  private employeesSubscription: Subscription;
  
  empleadoValue;
  
  closeResult: string;
  
  
  constructor(
    private modalService: NgbModal,
    public router: Router,
    public _employeeService:EmployeesService,
    private toastr: ToastrService
  ) {
  
    this.commerce = "";
    
    
    
  }

  ngOnDestroy() {
    if(this.employeesSubscription)
      this.employeesSubscription.unsubscribe();
  }

  
  ngOnInit() {
        
    this.employeesSubscription = this._employeeService.getAll().subscribe((snapshot) => {
      this.employees = [];
      snapshot.forEach((snap: any) => {
        this.employees.push(snap.payload.doc.data());
        this.employees[this.employees.length - 1].id = snap.payload.doc.id;        
      });
      console.log(this.employees);
    });
  }

  deleteEmployee(content,employee){
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if(result == "si"){     
        console.log(employee.id);
        this.toastr.info(employee.name+' ha sido borrado!','Empleado Borrado', {
          timeOut: 5000,
        });      
        this._employeeService.delete(employee.id).then(() => {
                 
        }, (error) => {
          console.error(error);
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

 

  public updateTable(){
    this.empleadoValue="";
  }

}
