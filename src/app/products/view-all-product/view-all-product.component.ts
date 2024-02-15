import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from '../../interfaces/product';
import { ProductsService } from '../products.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-all-product',
  templateUrl: './view-all-product.component.html',
  styleUrl: './view-all-product.component.css'
})
export class ViewAllProductComponent implements OnInit {
  @ViewChild('closebuttonupdate') closebuttonupdate: any;
  @ViewChild('closebuttonadd') closebuttonadd: any;
  @ViewChild('closebuttondelete') closebuttondelete: any;
  @ViewChild('seachString') seachString: any;

  productList: Product[];

  product: Product = {
    Id: '',
    Name: '',
    Description: '',
    Price: 0.0
  };

  productForm = new FormGroup({
    Name: new FormControl(''),
    Description: new FormControl(''),
    Price: new FormControl(''),
    Id: new FormControl('')
  })

  clearProductForm() {
    this.productForm.setValue({ Name: '', Description: '', Price: '', Id: '' });
    this.productForm.enable();
  }

  getProduct(id: any) {
    this.productService.getSingleProduct(id).subscribe(data => {
      this.product = data.data as Product;
      this.productForm.setValue({ Name: this.product.Name, Description: this.product.Description, Price: this.product.Price.toString(), Id: this.product.Id });
      this.productForm.enable();

    })
  }

  getDeleteProduct(id: any) {
    this.productService.getSingleProduct(id).subscribe(data => {
      this.product = data.data as Product;
      this.productForm.setValue({ Name: this.product.Name, Description: this.product.Description, Price: this.product.Price.toString(), Id: this.product.Id });
      this.productForm.disable();
    })
  }

  deleteProduct() {
    this.productService.deleteProduct(this.productForm.value.Id ?? '').subscribe(data => {
      console.log('Response', data.status);
      this.closebuttondelete.nativeElement.click();

      this.productService.viewAllProducts().subscribe(data => {
        this.productList = data.data as Product[];
      });
    });
  }

  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
    this.productService.viewAllProducts().subscribe(data => {
      this.productList = data.data as Product[];
    })
  }

  applySearch(){
    const searchStr =this.seachString.nativeElement.value;
    this.productService.getBySearchString (searchStr).subscribe(data =>{
      this.productList = data.data as Product[];
    })
  }

  createProduct() {
    this.productService.createProduct(
      this.productForm.value.Name ?? '',
      this.productForm.value.Description ?? '',
      this.productForm.value.Price ?? '').subscribe(data => {
        console.log('Response', data.status)
        this.closebuttonadd.nativeElement.click();

        this.productService.viewAllProducts().subscribe(data => {
          this.productList = data.data as Product[];
        });
      })
  }

  updateProduct() {
    this.productService.updateProduct(
      this.productForm.value.Name ?? '',
      this.productForm.value.Description ?? '',
      this.productForm.value.Price ?? '',
      this.productForm.value.Id ?? '').subscribe(data => {
        console.log('Response', data.status);
        this.closebuttonupdate.nativeElement.click();

        this.productService.viewAllProducts().subscribe(data => {
          this.productList = data.data as Product[];
        });
      })
  }

}
