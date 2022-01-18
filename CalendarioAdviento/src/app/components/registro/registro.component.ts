import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  public contactForm: FormGroup;

  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;



  constructor(
    private router: Router, 
    private loginService: LoginService
  ) {this.contactForm = this.createForm(); }

  ngOnInit(): void {
   
  }

  get email() { return this.contactForm.get('email'); }
  get password() { return this.contactForm.get('password'); }
  get confpassword() { return this.contactForm.get('confpassword'); }

  createForm(): FormGroup {
    return new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)]),
      confpassword: new FormControl('', [Validators.required, Validators.minLength(5)]),
    });
  }

  registro(){
    if (this.contactForm.valid) {
      this.loginService.registro(this.email?.value,this.password?.value)
      .then( res => {
          this.router.navigate(['/']);
        })
      .catch( error =>{
        alert(error);
      })
    }
    else alert ("rellene el formulario correctamente")
  }
}
