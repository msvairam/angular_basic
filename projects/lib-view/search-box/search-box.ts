import { Component, ChangeDetectionStrategy, input, output, signal } from '@angular/core';

interface SearchList {
    name: string,
    id: number
}

@Component({
    selector: 'app-search-box',
    template: `
    
        <div class="search-container">
            <h5>{{searchLabel()}}</h5>
            <div class="input-container">
                <input type="text"  
                (input)="inputChange.emit($event.target.value)" 
                (focus)="showResult(true)"
                (blur)="showResult(false)"
                />
                @if(isOpen()) {
                    <div class="search-items">
                        @for(item of searchList(); track item.id) {
                            <div class="search-item" 
                                (click)="selectedItem(item.id)"
                            >
                                <span>{{item.name}}</span>
                            </div>
                        }
                    </div>
                }
            </div>
        </div>

    `,
    styles: `
        .search-container {
                display: flex;
                justify-content: center;
                flex-direction: column;
                align-items: center;
        }

        .input-container {
               width: 50%;
                position: relative;
        }

        input {
               width: 100%;
                height: 35px;
                border-radius: 5px;
                border: 2px solid #ccc;
        }

        .search-items {
            position: absolute;
            width: 100%;
            border: 1px solid #ccc;
            .search-item {
                padding: 10px;
                font-size: 1.2rem;
                cursor: pointer;
            }
            
        }

    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBox {
    public readonly searchList = input.required<SearchList[]>();
    public readonly searchLabel = input<string>('');
    public readonly inputChange = output<string>();
    protected isOpen = signal<boolean>(false);

    selectedItem($event: number) {
        console.log($event);
    }

    showResult(val: boolean) {
        this.isOpen.set(val);
    }
}