import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../products.service';
import { Product } from '../../interfaces/product';
import { Call } from '@angular/compiler';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.css'
})
export class UpdateProductComponent implements OnInit {

  product : Product;

  constructor (
    private activatedRoute: ActivatedRoute,
    private productService : ProductsService
    ) { }

  ngOnInit(): void {
  }

  
}
