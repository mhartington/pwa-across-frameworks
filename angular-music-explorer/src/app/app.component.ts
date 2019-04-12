import { SwUpdate } from '@angular/service-worker';
import { MusickitConfig } from './providers/musickit-config/musickit-config';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styles: []
})
export class AppComponent implements OnInit {
  constructor(
    private swUpdate: SwUpdate,
    public musickitConfig: MusickitConfig
  ) {}
  ngOnInit() {
    this.swUpdate.available.subscribe(res => this.swUpdate.activateUpdate());
  }

  auth() {
    if (this.musickitConfig.isAuthorized) {
      this.musickitConfig.unauthorize();
    } else {
      this.musickitConfig.authorize();
    }
  }
}
