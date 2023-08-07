import { Injectable } from "@angular/core";
import { FaceSnap } from "../models/facen-snap.model";
import { HttpClient } from "@angular/common/http";
import { Observable, map, switchMap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class FaceSnapService{

  constructor(private httpClient: HttpClient){}


    faceSnaps: FaceSnap[] = []

    getAllFaceSnaps(): Observable<FaceSnap[]> {
        return this.httpClient.get<FaceSnap[]>('http://localhost:3000/facesnaps');
    }


    getFaceSnapById(faceSnapId: number): Observable<FaceSnap> {
        return this.httpClient.get<FaceSnap>(`http://localhost:3000/facesnaps/${faceSnapId}`)   
    }

    snapFaceSnapById(faceSnapId: number, snapType: 'snap' | 'unsnap'): Observable<FaceSnap> {
        return this.getFaceSnapById(faceSnapId).pipe(
          map(faceSnap => ({
            ...FaceSnap,
            snaps: faceSnap.snaps + (snapType === 'snap' ? 1 : -1)
          })),
          switchMap(updateFaceSnap => this.httpClient.put<FaceSnap>(`http://localhost:3000/facesnaps/${faceSnapId}`, updateFaceSnap))
        )
    }

    addNewFaceSnap(formValue:{title: string, description: string, imageUrl: string, location?: string}){
        const faceSnap: FaceSnap = {
          ...formValue,
          createdDate: new Date(),
          snaps: 0,
          id: this.faceSnaps[this.faceSnaps.length - 1].id + 1
        };

        this.faceSnaps.push(faceSnap);
    }
}