import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean;
  loggedInUser: string;

  constructor(
    private loginService: LoginService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loginService.getAuth().subscribe(auth =>{
      if(auth){
        if(auth.email != null)
        {
          this.isLoggedIn = true;
          this.loggedInUser = auth.email;
        }
      }
      else{
        this.isLoggedIn = false;
        //this.router.navigate(['/login'])
      }
    })
  }

  logout():void{
    this.loginService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }

}
