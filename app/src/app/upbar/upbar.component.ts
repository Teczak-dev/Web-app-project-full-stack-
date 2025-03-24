import { Component,EventEmitter,Input,Output } from '@angular/core';
import { NgIf } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-upbar',
  imports: [NgIf,FormsModule],
  templateUrl: './upbar.component.html',
  styleUrl: './upbar.component.css'
})
export class UpbarComponent {

  @Input() isLogged: boolean = false;

  name: string = "";
  login: string = "";
  password: string = "";
  password2: string = "";

  showCreateAccountPanel : boolean = false
  showSettingsPanel: boolean = false;
  showAccountPanel: boolean = false;



  openSettings(){
    //console.log("Settings");
    this.showSettingsPanel = !this.showSettingsPanel;
    this.showAccountPanel = false;
    //alert("Settings");
  }

  openAccount(){
    this.showAccountPanel = !this.showAccountPanel;
    this.showSettingsPanel = false;
  }

  @Output() powerOffEvent = new EventEmitter<void>();
  @Output() LogOutEvent = new EventEmitter<void>();

  PowerOffBtn() {
    this.powerOffEvent.emit();
  }

  logOff(){
    this.LogOutEvent.emit();
  }

  odmierzanie = setInterval(() => {
    const now = new Date();
    const godzina = now.getHours();
    const minuta = now.getMinutes();
    const timeElement = document.getElementById("time");
    if (timeElement) {
      timeElement.innerHTML = godzina.toString().padStart(2, '0') + ":" + minuta.toString().padStart(2, '0');
    }
  }, 1000);

  openAccountPanels(){//* Zarządzanie które okno konta otworzyć
    if(this.isLogged){
      this.showCreateAccountPanel = false;
    }else{
      this.showCreateAccountPanel = true;
    }
  }



  closeCreateAccount(){
    this.showCreateAccountPanel = false;
  }
  createAccount(){


    this.LogOutEvent.emit();
  }

}
