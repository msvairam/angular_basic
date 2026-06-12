import { Component, ChangeDetectionStrategy, input, output, OnInit, inject, ElementRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Option } from '../../lib-common/model/option';


@Component({
  selector: 'app-multiple-select-dropdown',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './multiple-select-dropdown.html',
  styleUrl: './multiple-select-dropdown.css',
  host: {
    '(document:click)': 'onClickOutside($event)',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MulipleSelectDropdown implements OnInit {

    private readonly el = inject(ElementRef);

    // Input Signal
    public readonly options = input.required<Option[]>();
    public readonly placeholder = input('Select Options');

    // Output Signal
    public readonly selectionChange = output<Option[]>();

    // Template Variables
    protected isOpen = false;
    protected searchTerm  = '';
    protected selectedItems: Option[] = [];
    protected filteredOptions: Option[] = [];

    public ngOnInit() {
        this.filteredOptions = [...this.options()];
    }

    protected isSelected(option: Option): boolean {
        return this.selectedItems.some(opt => opt.id === option.id);
    }

    protected isAllSelected(): boolean {
        return this.filteredOptions.length > 0 &&
            this.filteredOptions.every(opt => this.isSelected(opt));
    }

    protected filterOptions() {
        const term = this.searchTerm.toLowerCase();
        this.filteredOptions = this.options().filter(opt => 
            opt.label.toLowerCase().includes(term)
        )
    }

    protected toggleOption(option: Option) {
        const index = this.selectedItems.findIndex(item => item.id === option.id);
        if (index > -1) {
            this.selectedItems.splice(index, 1);
        } else {
            this.selectedItems.push(option);
        }
        this.selectionChange.emit(this.selectedItems);
    }

    protected toggleSelectAll(): void {
        if(this.isAllSelected()) {
            this.selectedItems = [];
        } else {
            this.selectedItems = [...this.filteredOptions];
        }
        this.selectionChange.emit(this.selectedItems);
    }

    protected toggleDropdown() {
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
            this.searchTerm = '';
             this.filteredOptions = [...this.options()];
        }
    }

    protected onClickOutside($event: Event) {
        if (!this.el.nativeElement.contains($event.target)) {
            this.isOpen = false;
        }
    }
}
