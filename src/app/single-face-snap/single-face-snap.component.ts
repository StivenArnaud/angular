import { Component, OnInit } from '@angular/core';
import { FaceSnap } from '../models/facen-snap.model';
import { FaceSnapService } from '../services/face-snaps.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-single-face-snap',
  templateUrl: './single-face-snap.component.html',
  styleUrls: ['./single-face-snap.component.scss']
})
export class SingleFaceSnapComponent implements OnInit {

  faceSnap$!: Observable<FaceSnap>;

  btnLabel!: string;

  constructor(private faceSnapService: FaceSnapService,
              private route: ActivatedRoute){}

  ngOnInit(): void {
    this.btnLabel = 'Oh Snap!';
    const faceSnapId = +this.route.snapshot.params['id'];
    this.faceSnap$ = this.faceSnapService.getFaceSnapById(faceSnapId)
  }

  onSnap(faceSnapId: number){
    if(this.btnLabel == 'Oh Snap!'){
      this.faceSnap$ = this.faceSnapService.snapFaceSnapById(faceSnapId, 'snap').pipe(
        tap(() => this.btnLabel = 'Oops unSnap!')
      )
    }else{
      this.faceSnap$ = this.faceSnapService.snapFaceSnapById(faceSnapId, 'unsnap').pipe(
        tap(() => this.btnLabel = 'Oh Snap!')
      )
    }
  }

}
