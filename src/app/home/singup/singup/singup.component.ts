import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NewUser } from 'src/app/interfaces/new-user';
import { SignupService } from 'src/app/service/signup.service';
import { UserNotTakenValidatorService } from './user-not-taken.validator.service';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css'],
  providers: [UserNotTakenValidatorService]
})
export class SingupComponent implements OnInit {

  signupForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userNotTakenValidatorService: UserNotTakenValidatorService,
    private signupService: SignupService,
    private router: Router
    ) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      email: ['' ,[Validators.required, Validators.email]],
      userName: ['', 
        [
          Validators.required, 
          Validators.pattern(/^[a-z0-9_\-]+$/),
          Validators.minLength(2), 
          Validators.maxLength(30)
        ],
        this.userNotTakenValidatorService.checkUserNameTaken()
      ],

      fullName: ['', 
        [
          Validators.required, 
          Validators.minLength(2), 
          Validators.maxLength(40)
        ]  
      ],
      password: ['', 
        [
          Validators.required, 
          Validators.minLength(8), 
          Validators.maxLength(14)
        ]  
      ],

    })
  }


  signup(){
    const newUser = this.signupForm.getRawValue() as NewUser;
    this.signupService.signup(newUser)
    .subscribe( 
      () => this.router.navigate(['']),
      err => console.log(err)
    
    )

  }

}
