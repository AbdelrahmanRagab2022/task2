import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { product } from '../_Models/Product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  allProduct:any=JSON.parse(localStorage.getItem('cache')||'false');
  sync:boolean=false;


  constructor(public _ProductService: ProductsService) { 
  }

  ngOnInit(): void {
    this.getAllProduct();

  }
  syncData() {
    this.allProduct=null;
    localStorage.removeItem('cache');
    this.getAllProduct();
  }
  syncItem(index:number) {
    this._ProductService.getProductById(index).subscribe(
      (data)=>{
        this.allProduct[index]=data;
      }
    );
  }
getAllProduct() {
  if(!this.allProduct) {
this._ProductService.getProduct().subscribe(
  (data)=>{
    this.allProduct= data;
  }

  
  );
}
}

}
