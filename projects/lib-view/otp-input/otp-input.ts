import {
  Component,
  ChangeDetectionStrategy,
  input,
  inject,
  computed,
  viewChildren,
  ElementRef,
  effect,
} from '@angular/core';

import { OTPInputData } from './otp-input-data';

@Component({
  selector: 'app-otp-input',
  template: `
    @for (otp of otps(); track $index; let i = $index) {
      <input
        #cell
        type="text"
        name="{{ $index }}-otp-field"
        inputmode="numeric"
        [value]="otp"
        [class.filled]="otp !== ''"
        [class.error]="false"
        (keydown)="onKeyDown($event, i)"
        (input)="onInput($event, i)"
        (paste)="onPaste($event)"
        (focus)="onFocus(i)"
      />
    }
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: row;
      gap: 10px;
    }
    input {
      height: 35px;
      width: 35px;
      padding: 5px;
      text-align: center;

      .filled {
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OTPInput {
  protected otpData = inject(OTPInputData);

  public readonly length = input.required<number>();
  protected readonly cells = viewChildren<ElementRef<HTMLInputElement>>('cell');

  protected otps = computed(() => this.otpData.otp());

  // Events
  onKeyDown(event: KeyboardEvent, i: number) {
    if (event.key === 'Backspace') {
      event.preventDefault();

      this.otpData.setDigit('', i);
      if (i > 0) {
        this.cells()[i - 1].nativeElement.focus();
      }
      return;
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault();

      if (i > 0) {
        this.cells()[i - 1].nativeElement.focus();
      }
      return;
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();

      if (i < this.length() - 1) {
        this.cells()[i + 1].nativeElement.focus();
      }
      return;
    }

    const isPaste = (event.ctrlKey || event.metaKey) && event.key === 'v';
    const isCopy = (event.ctrlKey || event.metaKey) && event.key === 'c';
    const isSelect = (event.ctrlKey || event.metaKey) && event.key === 's';

    if (isPaste || isCopy || isSelect) return;

    if (!/^\d$/.test(event.key) && !['Tab'].includes(event.key)) {
      event.preventDefault();
    }
  }

  onInput(event: Event, i: number): void {
    const input = event.target as HTMLInputElement;
    const val = input.value;
    const digit = val.replace(/\D/g, '').slice(-1);

    this.otpData.setDigit(digit, i);

    input.value = digit;

    if (digit && i < this.otps().length - 1) {
      this.cells()[i + 1].nativeElement.focus();
    }
  }

  onPaste(event: ClipboardEvent): void {
    event.preventDefault();
    const pasted =
      event.clipboardData?.getData('text').replace(/\D/g, '').slice(0, this.length()) ?? '';

    if (!pasted) return;

    this.otpData.fill(pasted);
  }

  onFocus(i: number): void {
    this.cells()[i].nativeElement.select();
  }

  constructor() {
    effect(() => {
        const _length =  this.length();
        this.otpData.setLength(_length);
    });
  } 
}
