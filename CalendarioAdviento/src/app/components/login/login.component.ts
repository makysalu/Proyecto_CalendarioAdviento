import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public contactForm: FormGroup;

  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


  constructor(
    private loginService: LoginService,
    private router: Router
  ) {
    this.contactForm = this.createForm();
  }

  ngOnInit(): void {

  }

  get email() { return this.contactForm.get('email'); }
  get password() { return this.contactForm.get('password'); }

  createForm() {
    return new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    });
  }

  login():void{
    if (this.contactForm.valid) {
      this.loginService.login(this.email?.value, this.password?.value)
      .then( resultado =>{
        this.router.navigate(['/']);
      })
      .catch( error =>{
        alert(error)
      })
    }
    else alert ("rellene el formulario correctamente")
  }
}
