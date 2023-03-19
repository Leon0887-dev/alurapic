import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { Photo } from '../interfaces/photo';
import { PhotoComment } from '../interfaces/photo-comment';
import { catchError, map } from 'rxjs/operators';

const API = 'http://localhost:3000/'

@Injectable({
  providedIn: 'root'
})
export class PhotosService {

  

  constructor(private http: HttpClient) { }


  listFromUser(userName: string): Observable<Photo[]>{
   return this.http.get<Photo[]>(API + userName +'/photos');
  }

  listFromUserPaginated(userName: string, page: number): Observable<Photo[]>{
     
    const params = new HttpParams().append('page', page.toString())
    
    return this.http.get<Photo[]>(API + userName +'/photos',{params});
  }

  upload(description: string, allowComments: boolean, file: File){
    const formData = new FormData();
    formData.append('description', description)
    formData.append('allowComments', allowComments ? 'true' : 'false')
    formData.append('imageFile', file);

    return this.http.post(API + 'photos/upload', formData);
  }

  findById(id: number): Observable<Photo>{
    return  this.http.get<Photo>(API + 'photos/' + id)
  }

  getComments(photoId: number): Observable<PhotoComment[]>{
    return this.http.get<PhotoComment[]>(API + 'photos/' + photoId + '/comments')
  }

  addComment(photoId: number, commentText: string){
    return this.http.post(API + 'photos/' + photoId + '/comments',
            {commentText: commentText}
    )
  }

  removePhoto(photoId: number){
    return this.http.delete(API + 'photos/' + photoId)
  }


  like(photoId: number){
    return this.http.post(
      API + 'photos/' + photoId + '/like', {}, {observe: 'response'}
    )
    .pipe(map(res => true))
    .pipe(catchError(err =>{
       return err.status == '304' ? of(false) : throwError(err);
    }))
  } 

}
