import { Router } from '@angular/router';
  import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  loginForm: FormGroup;
  @ViewChild('userNameInput') userNameInput: ElementRef<HTMLInputElement>

  constructor(
     private formBuilder: FormBuilder,
     private authenticateService: AuthService,
     private router: Router,
     ) { }


  ngOnInit() {
      this.loginForm = this.formBuilder.group({
        userName: ['', Validators.required],
        password: ['', Validators.required],
      })
  }

  login(){
    const userName = this.loginForm.get('userName').value;
    const password = this.loginForm.get('password').value;

    this.authenticateService
        .authenticate(userName, password)
        .subscribe((res =>{
          this.router.navigate(['user', userName])
        }),
         (err) =>{
          this.loginForm.reset();
          this.userNameInput.nativeElement.focus();
          alert('login failed');
         })

  }

}
