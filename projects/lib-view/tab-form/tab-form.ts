import { Component, ChangeDetectionStrategy, input, viewChild, ViewContainerRef, effect, signal, output, computed } from '@angular/core';
import { Tab } from './tab-form.model';

@Component({
    selector: 'app-tab-form',
    template: `
        <div class="tab-container">
            <div class="tab-bar">
                @let _tabs = tabs();
                @let _tabDetails = tabDetails();
                @if(_tabs.length > 0) {
                    @for(tab of _tabs;  track tab.id) {
                        <button class="tab-nav"
                         [attr.aria-selected]="_tabDetails?.id === tab.id"
                            [class.active]="_tabDetails?.id === tab.id"
                            (click)="selectedTab.set(tab.id)"
                            [class.invalid]="!tab?.status()"
                        >
                            {{tab.label}}
                    </button>
                    }
                }
            </div>
            <div class="tab-view-container">
                <div #componentLoader></div>
            </div>
            <div class="tab-footer-container">
                <button [disabled]="selectedTab() - 1 === 0" (click)="selectedTab.update(val => val - 1)"><< Prev</button>
                <button [disabled]="!valid()" (click)="submitForm.emit()">Submit</button>
                <button [disabled]="selectedTab() === _tabs.length" (click)="selectedTab.update(val => val + 1)">Next >></button>
            </div>
        </div>
    `,
    styles: `
    .tab-container {
        height: 70vh;
        margin: 2rem;
        border: 1px solid #ccc;
        display: flex;
        flex-direction: column;

        .tab-bar {  
                display: flex;
                flex-direction: row;
                border-bottom: 1px solid #ccc;

            .tab-nav {
                padding: 10px;
                border: 0;
                border-right: 1px solid #ccc;
                background-color: #f7f7f7;

                &.active {
                    background-color:#aeabab;
                    color: #fffefe;
                }

                &.invalid {
                    color: red;
                }
            }
        }

        .tab-view-container {
            flex: 1;
        }

        .tab-footer-container {
                display: flex;
                flex-direction: row;
                gap: 1rem;
                height: 25px;
                justify-content: end;
                padding-right: 10px;
                padding-bottom: 10px;
        }
    }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabForm {
    public tabs = input.required<Tab[]>();
    public valid = input.required<boolean>();
    public submitForm = output();
    public vcf = viewChild.required('componentLoader', { read: ViewContainerRef });
    public status = signal(false);
    
    public selectedTab = signal(1);

    protected tabDetails = computed(() => this.tabs().find(tab => tab.id === this.selectedTab()))

    constructor() {
         effect(async () => {
            const _vcf = this.vcf();
            if(_vcf) {
                _vcf.clear();
            }

            const selectTab = this.tabDetails();

            if(selectTab) {
                const profile = await selectTab?.component();
                _vcf.createComponent(profile);
            }

        })
    }
}