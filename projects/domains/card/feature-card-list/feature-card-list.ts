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

  protected async exectute() {
    await navigator.locks.request(
      'lock_call', 
      { 
        // mode: 'exclusive' // // only one tab executes this at a time
        mode: 'shared', // multiple tabs can be in here at the same time
      //  ifAvailable: true, // don't queue — return immediately (null callback) if lock is already held  
      }, 
      async () => {
      console.log('lock');
             const val = await new Promise((resolve, _) => {
              setTimeout(() => {
                resolve(200);
              },10000)
            });
            console.log(val); 
    });

    /*
    "A Web Lock only ensures that one tab executes the critical section at a time; 
    it doesn't automatically prevent duplicate work. After acquiring the lock,
     I always recheck whether the token still requires refreshing because another 
     tab may have already completed the refresh while this tab was waiting.
      If the token is already valid, I exit without making another API call.
       I also broadcast the refreshed token to other tabs so they update their 
       local state immediately." */
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
