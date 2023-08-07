import { Component, OnInit, Input } from '@angular/core';
import { FaceSnap } from '../models/facen-snap.model';
import { FaceSnapService } from '../services/face-snaps.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-face-snap',
  templateUrl: './face-snap.component.html',
  styleUrls: ['./face-snap.component.scss']
})
export class FaceSnapComponent implements OnInit{

  @Input() faceSnap!: FaceSnap;

  btnLabel!: string;

  constructor(private faceSnapService: FaceSnapService,
              private router: Router){}

  ngOnInit(): void {
    this.btnLabel = 'Oh Snap!';
  }

  onSnap(){
    if(this.btnLabel == 'Oh Snap!'){
      this.faceSnapService.snapFaceSnapById(this.faceSnap.id, 'snap')
      this.btnLabel = 'Oops unSnap!';
    }else{
      this.faceSnapService.snapFaceSnapById(this.faceSnap.id, 'unsnap')
      this.btnLabel = 'Oh Snap!';
    }
  }

  onViewFaceSnap(){
    this.router.navigateByUrl(`facesnaps/${this.faceSnap.id}`);
  }

}
