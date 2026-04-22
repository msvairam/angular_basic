import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-header',
    styleUrl: './header.css',
    templateUrl: './header.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {

}