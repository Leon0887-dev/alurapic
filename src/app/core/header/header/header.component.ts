import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user$: Observable<User>;
 

  constructor(
    private userService: UserService,
    private router: Router
    ) { 
      this.user$ = userService.getUser();
  }

  ngOnInit() {
  }

  logout(){
    this.userService.logout();
    this.router.navigate(['']);
  }

}
