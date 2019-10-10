import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationProvider } from 'src/app/Services/Firestore/authentication/authentication';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate  {
  
  constructor(
    public authService: AuthenticationProvider,
    public router: Router,    
    private toastr: ToastrService,
  ){ }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this.authService.isLoggedIn !== true) {
      
      this.toastr.error('Por favor ingrese con su cuenta para continuar','Login Error', {
        timeOut: 5000,
      }); 
      this.router.navigate(['/'])
      return false;
      
      
    }

    if(this.authService.isEmailVerified !== true) {
      
      this.toastr.error('Por favor valide su mail antes de continuar','Login Error', {
        timeOut: 5000,
      }); 
      this.authService.signOut();
      this.router.navigate(['/']);
      return false;
      
     
    }
    return true;
  }
  
}
