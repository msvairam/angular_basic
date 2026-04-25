import { Component, input } from '@angular/core';

@Component({
    template: `<h1>Product Info</h1> {{data()}}`,
})
export class ProductInfo {
    data = input();

}