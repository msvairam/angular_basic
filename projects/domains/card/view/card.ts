import { ChangeDetectionStrategy, Component, effect, input, model } from '@angular/core';
import { Card } from '../modal/card';
import { HightLightDirective } from '@lib-shared/directives/highlights';
import { CapPipe } from '@lib-shared/pipe/captiletter';
import { MenuBehaviour } from '@lib-shared/directives/menu-behavior';

@Component({
    selector: 'card',
    templateUrl: './card.html',
    styleUrls: ['./card.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [HightLightDirective, CapPipe],
    hostDirectives: [{
        directive: MenuBehaviour,
        inputs: ['menuId : id'],
        outputs: ['menuClosed: closed'],
    }]
})
export class CardView {
    public readonly card = input<Card>();
    public readonly clickedCard = model();

    protected selectedModel(id: string = ''): void {
        this.clickedCard.update((val) => val = id);
    }

    constructor() {
        effect(() => {
            console.log(this.clickedCard());
        })
    }
}