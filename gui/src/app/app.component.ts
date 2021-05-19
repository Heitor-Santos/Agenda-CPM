import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: "app"
  gerencia: string;
  isOn: boolean
  constructor(private router: Router,private route: ActivatedRoute){}
  async ngOnInit() {
    const gerencMap = { "professor": "/prof", "administrador": "/admin" }
    const user = JSON.parse(localStorage.getItem("AgendaCPMuser"));
    const expiresAt = new Date(localStorage.getItem("AgendaCPMexpiresAt")); 
    if (user && user["type"] && expiresAt>= new Date()) {
      this.isOn = this.isOnGerencia(this.route.snapshot.url.toString())
      this.gerencia = gerencMap[user["type"]];
    }
    else {
      localStorage.setItem("AgendaCPMexpiresAt", "")
      localStorage.setItem("AgendaCPMToken", "")
      localStorage.setItem("AgendaCPMuser", JSON.stringify({}))
      this.gerencia = "/login"
    }
    this.router.events.subscribe(val=>{
      if(val instanceof NavigationEnd){
        this.isOn =this.isOnGerencia(val.urlAfterRedirects)
      }
    })
  }

  isOnGerencia(url:string){
    return url.endsWith("/prof") || url.endsWith("/admin")
  }

  logoutAccount(){
    localStorage.setItem("AgendaCPMexpiresAt", "")
    localStorage.setItem("AgendaCPMToken", "")
    localStorage.setItem("AgendaCPMuser", JSON.stringify({}))
    this.router.navigateByUrl("/");
  }
}