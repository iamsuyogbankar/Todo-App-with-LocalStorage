import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodoshareService implements OnInit {

  constructor() { }

  ngOnInit(){
    this.getTodo();
  }

  getTodo(){
    // localStorage.clear();
    return JSON.parse(localStorage.getItem('todo'));
  }
  
}
