import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenericGetResponse } from '../interfaces/genericGetResponse';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private httpClient: HttpClient) {

  }

  baseURL = 'http://localhost:3000/api/v1/products/';

  viewAllProducts(): Observable<GenericGetResponse> {
    return this.httpClient.get<GenericGetResponse>(this.baseURL);
  }

  getSingleProduct (id: string): Observable<GenericGetResponse>{
    const singleProductURL = this.baseURL + id;
    return this.httpClient.get<GenericGetResponse>(singleProductURL)
  }

  deleteProduct (id: string): Observable<GenericGetResponse>{
    const deleteProductURL = this.baseURL + id;
    return this.httpClient.delete<GenericGetResponse>(deleteProductURL)
  }

  createProduct (Name:string, Description:string, Price:string) :Observable<GenericGetResponse>{
    let priceNumeric =parseFloat(Price).toFixed(2);

    let payload ={
      Name: Name,
      Description: Description,
      Price: priceNumeric
    }

   return this.httpClient.post<GenericGetResponse>(this.baseURL, payload);
  }

  updateProduct (Name:string, Description:string, Price:string, Id:string) :Observable<GenericGetResponse>{
    let priceNumeric =parseFloat(Price).toFixed(2);

    let payload ={
      Id: Id,
      Name: Name,
      Description: Description,
      Price: priceNumeric
    }

    return this.httpClient.put<GenericGetResponse>(this.baseURL, payload);
  
  }

  getBySearchString (seachString:string):Observable<GenericGetResponse> {
    let searchURL = this.baseURL;
    if (seachString.length > 0 ){
      searchURL =this.baseURL + 'search/' + seachString;
    }
    return this.httpClient.get<GenericGetResponse>(searchURL);
  }

}
