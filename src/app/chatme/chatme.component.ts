import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-chatme',
  templateUrl: './chatme.component.html',
  styleUrls: ['./chatme.component.css']
})
export class ChatmeComponent implements OnInit {

  constructor(private router: Router) { }

  back()
  {
    this.router.navigate(['/loginchat']); 
  }

  ngOnInit() {
  }

}
