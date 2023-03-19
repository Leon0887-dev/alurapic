import { ElementRef, OnInit, Renderer, Renderer2 } from '@angular/core';
import { Directive, Input } from '@angular/core';
import { UserService } from 'src/app/core/user/user.service';
import { Photo } from 'src/app/interfaces/photo';

@Directive({
    selector: '[showIfLogged]'
})
export class ShowIfLoggedDirective implements OnInit{

  @Input() ownedPhoto: Photo

  constructor(
    private element: ElementRef<any>,
    private renderer: Renderer,
    private userService: UserService,
  ){}
    ngOnInit(): void {
      !this.userService.isLogged() 
         && this.renderer.setElementStyle(this.element.nativeElement, 'display', 'none');
    }
}