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
  @Input() logUser = "";

  name: string = "";
  login: string = "";
  password: string = "";
  password2: string = "";

  showInformationsPanel : boolean = false;
  showLoggedAccountPanel: boolean = false;
  showCreateAccountPanel : boolean = false
  showSettingsPanel: boolean = false;
  showAccountPanel: boolean = false;

  constructor(private userService: UserService) {}

  logins: {
    imie: string,
    login: string,
    haslo: string
  }[] = [];

  onInit(){
    this.userService.getUsers().subscribe(data =>{
      this.logins = data;
    });

    if(this.isLogged){
      const user = this.logins.filter(loginDB => loginDB.login === this.logUser);
      if(user){
        this.name = user[0].imie;
        this.login = user[0].login;
        this.password = user[0].haslo;
      }
    }

  }

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
      this.showLoggedAccountPanel = true;
      
      
    }else{
      this.showCreateAccountPanel = true;
      this.showLoggedAccountPanel = false;
    }
  }



  closeCreateAccount(){
    this.showCreateAccountPanel = false;
  }

  closeLoggedAccountPanel(){
    this.showLoggedAccountPanel = false;
  }

  openInformation(){
    this.showInformationsPanel = true;
  }
  closeInformation(){
    this.showInformationsPanel = false;
  }

  createAccount(){
    if(this.name.length < 3 || this.login.length < 5 || this.password.length < 8 || this.password2.length < 8){
      alert("Wszystkie pola muszą być wypełnione(minimum 3 znaki w imieniu, 5 w loginie, 8 w haśle)");
    }
    else{
      const Log = this.logins?.filter(loginDB => loginDB.login === this.login);
      if(Log){
        alert("Login jest juz zajęty")
      }
      else{  
          if(this.password != this.password2){
            alert("Hasła nie są takie same");
          }
          else{
            this.userService.addUser({imie: this.name,login: this.login,haslo: this.password}).subscribe();
            this.logOff();
            
          }
      }
      
    }
  }

}
