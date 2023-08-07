import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { FaceSnap } from '../models/facen-snap.model';
import { FaceSnapService } from '../services/face-snaps.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-face-snap',
  templateUrl: './new-face-snap.component.html',
  styleUrls: ['./new-face-snap.component.scss']
})
export class NewFaceSnapComponent implements OnInit {

  snapForm!: FormGroup
  faceSnapPreview$!: Observable<FaceSnap>
  urlRegx!: RegExp

  constructor(private formBuilder: FormBuilder,
              private faceSnapService: FaceSnapService,
              private router: Router){}

  ngOnInit(): void {
    this.urlRegx = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/;
    this.snapForm = this.formBuilder.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
      imageUrl: [null, [Validators.required, Validators.pattern(this.urlRegx)]],
      location: [null]
    },
    {
      updateOn: 'blur'
    }
    )

    this.faceSnapPreview$ = this.snapForm.valueChanges.pipe(
      map(value => ({
        ...value,
        createdDate: new Date(),
        id: 0,
        snaps:0
      }))
    )
  }

  onSnapFormSubmit(){
    this.faceSnapService.addNewFaceSnap(this.snapForm.value)
    this.router.navigateByUrl('/facesnaps')
  }

}
