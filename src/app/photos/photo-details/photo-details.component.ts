import { PhotoComment } from './../../interfaces/photo-comment';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PhotosService } from 'src/app/service/photos.service';
import { Photo } from 'src/app/interfaces/photo';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-photo-details',
  templateUrl: './photo-details.component.html',
  styleUrls: ['./photo-details.component.css']
})
export class PhotoDetailsComponent implements OnInit {

  photo$: Observable<Photo>;
  photoId: number;
  

  constructor(
    private route: ActivatedRoute, 
    private photosService: PhotosService,
    private router: Router
    ) { }

  ngOnInit() {
    this.photoId = this.route.snapshot.params.photoId;

    this.photo$ = this.photosService.findById(this.photoId)    
  }

  remove(){
    this.photosService.removePhoto(this.photoId).subscribe(() =>{
        this.router.navigate(['']);
    })
  }


}
