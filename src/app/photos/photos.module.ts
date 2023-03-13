import { NgModule } from '@angular/core';

import { PhotoFormModule } from './photo-form/photo-form.module';
import { PhotoListModule } from './photo-list/photo-list.module';
import { PhotoDetailsComponent } from './photo-details/photo-details.component';
import { PhotoDetailsModule } from './photo-details/photo-details.module';


@NgModule({
  imports: [
    PhotoListModule,
    PhotoFormModule,
    PhotoDetailsModule
  ],
  declarations: [] 
})
export class PhotosModule { }
