import {
  Component,
  ChangeDetectionStrategy,
  input,
  signal,
  linkedSignal,
  computed,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { toSignal, toObservable, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged } from 'rxjs';

export interface Option {
  id: number;
  label: string;
  select: boolean;
}

@Component({
  selector: 'app-multiple-selectors',
  imports: [FormsModule],
  template: `
    <div class="main-container">
      <button class="selector" focus (click)="toggleDropdown()">
        <div class="label">{{selectLabel()}}</div>
        <div class="drop-icon">^</div>
      </button>
      @if (isOpen()) {
        <div class="dropdown">
          <div class="searchInput">
            <input type="text" [(ngModel)]="inputModel" placeholder="Search..." />
          </div>
          <div class="options">
            <div class="option">
              <input type="checkbox" [checked]="!isAllUnchecked()" (change)="toggleSelectAll($any($event.target).checked)"/>
              <span>SelectAll</span>
            </div>
            @let _filtered = this.filteredOptions();
            @for (option of _filtered; track option.id) {
              <div class="option">
                <input
                  type="checkbox"
                  [value]="option.id"
                  [checked]="(option.select)"
                  (change)="checkedOption($any($event.target).checked, option)"
                />
                <span>{{ option.label }}</span>
              </div>
            }
          </div>
        </div>
      }
    </div>
  `,
  styleUrls: ['./multiple-selector.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultipleSelector {
  public readonly options = input.required<Option[]>();

  protected readonly optionState = linkedSignal(() => {
    return this.options();
  });

  protected readonly selectLabel = computed(() => {
     const count = this.optionState().filter(option => option.select).length;
     return count === 0 ? 'No Selected' : `${count} Selected`;
  })

  protected readonly filteredOptions = linkedSignal(() => {
    const input = this.debounceInput() ?? '';
    return this.optionState().filter((val) => val.label.toLowerCase().includes(input));
  });

  protected readonly isAllUnchecked = computed(() => this.filteredOptions().some(option => !option.select))

  protected readonly isOpen = signal<boolean>(false);

  protected readonly inputModel = signal('');

  protected toggleDropdown() {
    this.isOpen.update((val) => !val);
    this.inputModel.set('');

    if (this.isOpen()) {
      this.filteredOptions.set([...this.optionState()]);
    }
  }

  protected readonly debounceInput = toSignal(
    toObservable(this.inputModel).pipe(
      debounceTime(300),
      takeUntilDestroyed(),
      distinctUntilChanged(),
    ),
  );

  protected onInput($event: Event) {
    console.log($event);
  }

  protected checkedOption(checked: boolean, _option: Option) {
    this.optionState.update((options: Option[]) => {
      return options.map((option: Option) => {
        return _option.id === option.id
          ? {
              ...option,
              select: checked,
            }
          : option;
      });
    });
  }

  protected toggleSelectAll(isChecked: boolean) {
        const filtered = this.filteredOptions();
        console.log(filtered);
            this.optionState.update(options => {
                return options.map(option => {
                    if(filtered.some(val => val.id === option.id)) {
                        return {
                            ...option,
                            select: isChecked,
                        }
                    } else {
                        return option;
                    }
                });
            });
        } 
}
