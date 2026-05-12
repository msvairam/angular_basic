import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";

@Component({
    selector: 'app-name-editor',
    template: `<input type='text' [formControl]='name' />
    <button (click)="updateValue()">Update</button>
    `,
    imports: [ReactiveFormsModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NameEditor {
    protected readonly name = new FormControl();

    protected updateValue() {
        this.name.setValue('Vairamuthu');
    }
}