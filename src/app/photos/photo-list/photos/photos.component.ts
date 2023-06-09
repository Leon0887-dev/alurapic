import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Photo } from 'src/app/interfaces/photo';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnChanges {

 @Input()  photos: Photo[];
 rows: any[]

  constructor() { }


  ngOnChanges(changes: SimpleChanges): void {
    if(changes.photos){
      this.rows = this.groupColums(this.photos)
    }
  }
  


  groupColums(photos: Photo[]) {
    const newRows = [];

    if(photos){
      for (let index = 0; index < photos.length; index+=3) {
        newRows.push(photos.slice(index, index + 3));
      }
    }


    return newRows;
  }

}
