import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Photo } from 'src/app/interfaces/photo';
import { PhotosService } from 'src/app/service/photos.service';


@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit {

  photos: Photo[];
  filter: string;
  hasMore: boolean = true;
  currentPage: number = 1;
  userName: string;
  
 
  constructor( 
    private activedRoute: ActivatedRoute, 
    private photoService: PhotosService
    ){}


  ngOnInit(): void {
    this.activedRoute.params.subscribe(params =>{
      this.userName = params.userName
      this.photos = this.activedRoute.snapshot.data['photos'];
    })
    
  }

  filterPhotos(event: string){
    this.filter = event;
  }


  load(){
    this.photoService.listFromUserPaginated(this.userName, ++this.currentPage)
     .subscribe(photos => {
       this.filter = '';
        this.photos = this.photos.concat(photos);
       if(!photos.length) this.hasMore = false;
     })
  }
  
}
