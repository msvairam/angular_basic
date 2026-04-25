import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    template: `<h1>Product</h1>
    <router-outlet />`,
    imports: [RouterOutlet]
})
export class Product {

}