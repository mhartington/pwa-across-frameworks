import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss']
})
export class LandingPage implements OnInit {
  ev: any;
  constructor(private router: Router) {}

  ngOnInit() {
    fromEvent(window, 'beforeinstallprompt').subscribe((res: any) => {
      console.log(res);
      this.ev = res;
    });
  }

  navigate() {
    this.router.navigateByUrl('/browse', { replaceUrl: true });
  }

  push() {
    if (this.ev) {
      this.ev.preventDefault();
      this.ev.prompt();
      this.ev.userChoice.then((choiceResult: { outcome: string; }) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
      });
    }
    this.navigate();
  }
}
