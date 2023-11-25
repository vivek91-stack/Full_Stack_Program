import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  showhidePassword = false;
  logs : Array<Date>= [];

  today = new Date();

  constructor() {
  }
  
  ngOnInit(): void {
  }

  showPassword(){
    this.showhidePassword = !this.showhidePassword;
    
    this.logs.push(this.today)
  }

}
