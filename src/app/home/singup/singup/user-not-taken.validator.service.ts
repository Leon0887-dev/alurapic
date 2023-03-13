import { SignupService } from './../../../service/signup.service';
import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import {debounceTime, first, map, switchMap} from 'rxjs/operators';




@Injectable()
export class UserNotTakenValidatorService{

    constructor(private SignupService: SignupService){}

    checkUserNameTaken(){

        return (control: AbstractControl) =>{
          return control.valueChanges
                 .pipe(debounceTime(300))
                 .pipe(switchMap(userName =>{
                    return this.SignupService.checkUserNameTaken(userName); 
                 }))
                 .pipe(map(isTaken => isTaken ? {userNameTaken: true} : null))
                 .pipe(first());
        }
    }
}