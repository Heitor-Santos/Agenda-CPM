import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls:['./app.component.scss']
})
export class AppComponent {
  title: "app"
  gerencia: string
  async ngOnInit() {
    const gerencMap = {"professor":"/prof", "administrador":"/admin"}
    const user = JSON.parse(localStorage.getItem("user"));
    if(user && user["type"]){
      this.gerencia = gerencMap[user["type"]];
    }
    else this.gerencia = "/login"
  }
}