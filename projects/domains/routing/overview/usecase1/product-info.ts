import { Component, input, OnInit, inject} from '@angular/core';
import { ProductData } from './product-data';

@Component({
    template: `<h1>Product Info1   </h1> {{data()}}`,
})
export class ProductInfo implements OnInit {
    data = input();
    private productData = inject(ProductData);

    public isChangeSaved() {
        return true;
    }

    ngOnInit() {
        this.productData.getProducts().subscribe((data) => {
            console.log(data);
        })
    }

}