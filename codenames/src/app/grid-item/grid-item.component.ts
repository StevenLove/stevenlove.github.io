import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grid-item',
  templateUrl: './grid-item.component.html',
  styleUrls: ['./grid-item.component.css']
})
export class GridItemComponent implements OnInit {
  @Input() name: string;
  // @Input() url: string;
  url = "";
  
  constructor() { 
    
  }

  ngOnInit() {
    console.log("constructing grid-item");
    let hex = this.name.codePointAt(0).toString(16);
    this.url = "https://twemoji.maxcdn.com/72x72/"+hex+".png";
    console.log(this.url);
  }

  

  // description = "GRID COMPONENT TEST DESCRIPTION";

}
