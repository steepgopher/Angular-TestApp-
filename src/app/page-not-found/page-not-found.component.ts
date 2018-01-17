import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'clever-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class PageNotFoundComponent implements OnInit {

  constructor(
    private _title: Title
  ) {
    this._title.setTitle('Not Found');
  }

  public ngOnInit() {
  }

}
