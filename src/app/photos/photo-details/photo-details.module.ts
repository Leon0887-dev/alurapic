import { VmessageModule } from './../../shared/components/vmessage/vmessage.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoDetailsComponent } from './photo-details.component';
import { PhotoModule } from '../photo/photo.module';
import { PhotoCommentsComponent } from './photo-comments/photo-comments.component';
import { PhotoOwnerOnlyDirective } from './photo-owner-only/photo-owner-only.directive';
import { ShowIfLoggedModule } from 'src/app/shared/directives/show-if-logged/show-if-logged.module';

@NgModule({
  imports: [
    CommonModule,
    PhotoModule,
    RouterModule,
    ReactiveFormsModule,
    VmessageModule,
    ShowIfLoggedModule
  ],
  exports: [PhotoDetailsComponent,PhotoCommentsComponent],
  declarations: [PhotoDetailsComponent, PhotoCommentsComponent, PhotoOwnerOnlyDirective]
})
export class PhotoDetailsModule { }
