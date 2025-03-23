import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DockComponent } from "./dock/dock.component";
import { UpbarComponent } from "./upbar/upbar.component";
import { NgIf } from '@angular/common';
import { LockscreenComponent } from "./lockscreen/lockscreen.component";


@Component({
  selector: 'app-root',
  imports: [DockComponent, UpbarComponent, NgIf, LockscreenComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'app';
  
  isPowerOn = false;
  isLogin = false;

  powerOff(){
    this.isPowerOn = false;
  }

  PowerOn() {
    this.isPowerOn = true;
  }

  setIsLoginTrue(){
    this.isLogin = true;
  }

  setIsLoginFalse(){
    this.isLogin = false;
  }



}