import { Component, input } from '@angular/core';

@Component({
    template: `<h1>Product Info1   </h1> {{data()}}`,
})
export class ProductInfo {
    data = input();

    public isChangeSaved() {
        return true;
    }

}