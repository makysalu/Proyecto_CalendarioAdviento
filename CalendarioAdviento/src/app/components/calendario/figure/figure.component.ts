import { Component, Input, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-figure',
  templateUrl: './figure.component.html',
  styleUrls: ['./figure.component.css']
})
export class FigureComponent implements OnInit {
  @Input() show: boolean = false;
  @Input() image: string = "";
  constructor(private storage:AngularFireStorage) { }

  ngOnInit(): void {
    console.log(this.image);
    
  }
}
