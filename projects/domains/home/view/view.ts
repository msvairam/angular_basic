import { ChangeDetectionStrategy, Component, contentChild, DestroyRef, inject, signal, viewChild } from '@angular/core';
import { Header } from '../../shared/header/header';
import { Footer } from '../../shared/Footer/footer';
import { InformationView } from '../../shared/information/information-container';
import { CustomSlider } from '../../../lib-view/custom-slider/custom.slider'

@Component({
    selector: 'app-home',
    styleUrl: './view.css',
    templateUrl: './view.html',
    imports: [Header, Footer, InformationView, CustomSlider],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
    protected readonly message =  signal<string>('Modern Application');

    private readonly footer = viewChild.required(Footer);

    protected changeFooterMessage() {
        console.log(this.footer().message);
    
        setTimeout(() => {
      
            this.message.update(val => val = 'Update Modern Application');
    
        },5000);
    }
}