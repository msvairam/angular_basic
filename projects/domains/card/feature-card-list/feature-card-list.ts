import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  inputBinding,
  model,
  resource,
  signal,
  viewChild,
  ViewContainerRef,
} from '@angular/core';
import { CardView } from '../view/card';
import { CardList } from '../data/card-list';
import { firstValueFrom } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Option } from '../../../lib-common/model/option';
import { HightLightDirective } from '../../../lib-common/directives/highlights';
import { SelectDirective } from '../../../lib-common/directives/select';
import { nxUnlessDirective } from '../../../lib-common/directives/nxunless';
import { CustomListBox } from '../../../lib-view/custom-list-box/custom-list-box';
import { MulipleSelectDropdown } from '../../../lib-view/multiple-select-dropdown/multiple-select-dropdown';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'feature-card-list',
  imports: [
    CardView,
    FormsModule,
    CommonModule,
    HightLightDirective,
    MulipleSelectDropdown,
    SelectDirective,
    nxUnlessDirective,
    CustomListBox,
    RouterOutlet,
  ],
  providers: [CardList],
  templateUrl: './feature-card-list.html',
  styleUrl: './feature-card-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureCardList {
  protected showSad: boolean = true;
  protected color: string | null = null;
  private readonly cardData = inject(CardList);
  private readonly vcr = viewChild('informationContainer', { read: ViewContainerRef });
  protected readonly selectedCard = signal(0);
  protected selected: Option[] = [];

  protected readonly cities: Option[] = [
    { id: 1, label: 'Madurai' },
    { id: 2, label: 'Chennai' },
    { id: 3, label: 'Bangalore' },
    { id: 4, label: 'Mumbai' },
    { id: 5, label: 'Delhi' },
    { id: 6, label: 'Hyderabad' },
  ];

  protected readonly heroes = [
    {
      name: 'Mr.Nice Happy',
      emotion: 'happy',
    },
    {
      name: 'Narco (Sad)',
      emotion: 'sad',
    },
  ];

  protected readonly hero = '';

  protected readonly cards = computed(() => this.cardResource.value() ?? []);

  protected readonly cardResource = resource({
    loader: async () => {
      return firstValueFrom(this.cardData.getCards());
    },
  });

   protected OnSelectionChange(items: Option[]) {
    this.selected = items;
  }

  private download() {
    this.cardData.downloadPDF();
  }

  protected menuClosed() {
    console.log('menuClosed');
  }

  protected resetSelectedCard() {
    console.log(this.selectedCard());
    this.selectedCard.update((val) => (val = 0));
  }



    constructor() {
    effect(async () => {
      const container = this.vcr();
      if (!container) return; // Wait for the signal to be populated

      container.clear();
      console.log('eff');
      const { InformationView } = await import('../../shared/information/information-container');
      this.vcr()?.createComponent(InformationView, {
        bindings: [inputBinding('message', () => 'Success Loaded')],
      });
    });

    effect(() => {
      console.log(this.selectedCard());
    });
  }
}
