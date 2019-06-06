import { SwUpdate } from '@angular/service-worker';
import { MusickitConfig } from './providers/musickit-config/musickit-config';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <nav>
      <a routerLink="/browse">Browse</a> | <a routerLink="/search">Search</a> |
      <span (click)="auth()">{{
        musickitConfig.isAuthorized ? 'Logout' : 'Login'
      }}</span>
    </nav>
    <router-outlet></router-outlet>
  `,
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
