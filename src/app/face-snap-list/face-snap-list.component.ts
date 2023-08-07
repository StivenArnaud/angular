import { Component, OnInit } from '@angular/core';
import { FaceSnap } from '../models/facen-snap.model';
import { FaceSnapService } from '../services/face-snaps.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-face-snap-list',
  templateUrl: './face-snap-list.component.html',
  styleUrls: ['./face-snap-list.component.scss']
})
export class FaceSnapListComponent implements OnInit{

  faceSnaps!: FaceSnap[]
  faceSnaps$!: Observable<FaceSnap[]>


  constructor(private faceSnapService: FaceSnapService){}

  ngOnInit(): void {
    this.faceSnaps$ = this.faceSnapService.getAllFaceSnaps();
  }

  // ngOnDestroy(): void {
  //   this.destroy$.next(true)
  // }

}

