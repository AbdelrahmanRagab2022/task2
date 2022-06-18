import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  constructor(public _ProductService:ProductsService) { }

  ngOnInit(): void {
  }
  setCategory(category:string) {
this._ProductService.category.next(category);
  }

}
