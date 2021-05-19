import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { login } from 'src/requests/professor';

class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('',[
    Validators.required
  ])
  matcher = new MyErrorStateMatcher()
  email: string
  password: string
  constructor(private changeDetectorRefs: ChangeDetectorRef, private router: Router, public snackBar: MatSnackBar){}
  async login(){
    this.email = (<HTMLInputElement>document.getElementById('email')).value
    this.password = (<HTMLInputElement>document.getElementById('password')).value
    const response = await login(this.email,this.password)
    if(response.error) return await this.openSnack(response.error, "snack-error");
    const expiresIn = response.data.expiresIn;
    const token = response.data.token;
    const expiresAt = new Date()
    expiresAt.setSeconds(expiresAt.getSeconds()+expiresIn)
    localStorage.setItem("AgendaCPMexpiresAt",expiresAt+"")
    localStorage.setItem("AgendaCPMToken", token)
    localStorage.setItem("AgendaCPMuser",JSON.stringify(response.data.user))
    
    const route = response.data.user.type=="administrador" ? "/admin" : "/prof"
    this.router.navigateByUrl(route)
  }

  async openSnack(msg: string, className: string) {
    this.snackBar.open(msg, undefined, {
      panelClass: [className],
      duration: 2000,
    })
  }
}