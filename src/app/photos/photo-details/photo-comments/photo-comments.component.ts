import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { PhotoComment } from 'src/app/interfaces/photo-comment';
import { PhotosService } from 'src/app/service/photos.service';

@Component({
  selector: 'app-photo-comments',
  templateUrl: './photo-comments.component.html',
  styleUrls: ['./photo-comments.component.css']
})
export class PhotoCommentsComponent implements OnInit {

  @Input() photoId: number;

  commentForm: FormGroup;

  comments$: Observable<PhotoComment[]>

  constructor(
    private photosService: PhotosService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.comments$ = this.photosService.getComments(this.photoId); 

    this.commentForm = this.formBuilder.group({
        comment: ['', Validators.maxLength(300)]
    });
  }


  save(){
    const comment = this.commentForm.get('comment').value as string;
    this.comments$ = this.photosService
        .addComment(this.photoId, comment)
        .pipe(switchMap(() => this.photosService.getComments(this.photoId)))
        .pipe(tap(() =>{
          this.commentForm.reset();
        }))
        
  }


}
