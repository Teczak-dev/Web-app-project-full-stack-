import { Component,EventEmitter,Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-lockscreen',
  imports: [FormsModule, HttpClientModule],
  templateUrl: './lockscreen.component.html',
  styleUrl: './lockscreen.component.css'
})
export class LockscreenComponent {
  
  users: any[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  username = "";
  password = "";

  @Output() setIsLogin = new EventEmitter<void>();
  @Output() powerOffEvent = new EventEmitter<void>();

  loginUser(){
  
    if(this.validUser()){
      this.setIsLogin.emit();
    }else{
      alert("Login failed");
    }

  }

  validUser():boolean{
    for (let user of this.users) {
      if (user.login === this.username && user.haslo === this.password) {
        return true;
      }
    }
    return false;
  }

  powerOff(){
    this.powerOffEvent.emit();
  }

}
