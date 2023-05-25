import { Component, OnInit } from '@angular/core';
import { PanierService } from '../_services/panier.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{

  products:any[]=[];
  Total!: any;

  constructor(private panier:PanierService,private router:Router){}
  ngOnInit(): void {
    this.panier.loadCart();
    this.products=this.panier.getProduct();
    console.log(this.products[0].quantity)
   this.console();
   this.Total=this.total();
  }
  console(){
    console.log(this.products[0].quantity);
  }
   //Change sub total amount
  // changeSubTotal(product: any, index: any) {
  //   const qty = product.quantity;
  //   const amt = product.price;

  //   this.subTotal = amt * qty;

  //   this.product_service.saveCart();
  // }

  //Remove a Product from Cart
  removeFromCart(product: any) {
    this.panier.removeProduct(product);
    this.products = this.panier.getProduct();
  }

  //Calculate Total

  get total() {
    return this.products?.reduce(
      (sum, product) => ({
        quantity: 1,
        prix: sum.prix + product.quantity * product.prix,
      }),
      { quantity: 1, prix: 0 }
    ).prix;
  }
  Commander(product:any){
    this.router.navigate(['home/cart/commander']);

  }

  updateQuantity(product: any) {
    this.panier.saveCart();
  
  }



  
}
