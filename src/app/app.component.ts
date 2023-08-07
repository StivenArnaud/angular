import { Component, OnInit } from '@angular/core';
import { Observable, filter, interval, map, tap } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  interval$!: Observable<string>

  ngOnInit(): void {
    this.interval$ = interval(1000).pipe(
      filter(value => value % 3 === 0),
      map(value => value % 2 === 0 ?
          `Je suis ${value} et je suis pair`:
          `je suis ${value} et je suis impair`),
        tap(value => this.logger(value))  
    );
  }

  logger(text: string){
    console.log(text);
  }

}
