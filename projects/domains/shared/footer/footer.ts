import { ChangeDetectionStrategy, Component, contentChild } from '@angular/core';
import { InformationView } from '../information/information-container';

@Component({
    selector: 'app-footer',
    styleUrl: './footer.css',
    templateUrl: './footer.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
    public readonly message = 'copyright @2026';

    private readonly information = contentChild.required(InformationView);

    ngAfterViewInit() {
        console.log(this.information().message());
    }
}