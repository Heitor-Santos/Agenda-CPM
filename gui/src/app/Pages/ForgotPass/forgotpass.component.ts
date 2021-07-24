import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { changePassword } from 'src/requests/professor';

class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-forgotpass',
  templateUrl: './forgotpass.component.html',
  styleUrls: ['./forgotpass.component.scss'],
})
export class ForgotPassComponent {
  matcher = new MyErrorStateMatcher();
  name: string;
  email: string;
  password: string;
  isLoading: boolean;
  registerForm: FormGroup;
  safetyQuestions: string[];
  safetyQuestion: string;
  safetyAnswer: string;
  constructor(private changeDetectorRefs: ChangeDetectorRef, private router: Router, private route: ActivatedRoute, public snackBar: MatSnackBar, public formBuilder: FormBuilder){}
  ngOnInit(){
    this.isLoading = false;
    this.safetyQuestions = ["Qual é o nome do seu primeiro pet?", 
    "Qual é o nome da sua avó?",
    "Qual é a sua música preferida?",
    "Qual é o nome do seu filme preferido?",
    "Qual é o seu livro favorito?"];
    this.safetyQuestion = "";
    this.registerForm = this.formBuilder.group({
      email: [, { validators: [Validators.required, Validators.email], updateOn: "change" }],
      newPassword: [, { validators: [Validators.required], updateOn: "change", }],
      safetyQuestion: [, { validators: [Validators.required], updateOn: "change" }],
      safetyAnswer: [, { validators: [Validators.required], updateOn: "change" }],
    });
  }
  async changePassword(){
    this.email = (<HTMLInputElement>document.getElementById('email')).value
    this.password = (<HTMLInputElement>document.getElementById('password')).value
    this.safetyAnswer = (<HTMLInputElement>document.getElementById('saftans')).value
    this.isLoading=true;
    const response = await changePassword(this.email,this.password,this.safetyQuestion, this.safetyAnswer);
    this.isLoading=false;
    if(response.error) return await this.openSnack(response.error, "snack-error");
    await this.openSnack("Senha alterada","snack-success")
    this.router.navigateByUrl("/login");
  }

  async openSnack(msg: string, className: string) {
    this.snackBar.open(msg, undefined, {
      panelClass: [className],
      duration: 2000,
    })
  }
}