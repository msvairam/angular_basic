import { Injectable, signal, linkedSignal, computed } from '@angular/core';

@Injectable()
export class OTPInputData {
  private readonly length = signal(0);

  private digits = linkedSignal<string[]>(() => Array(this.length()).fill(''));

  public otp = computed(() => this.digits());

  public setLength(length: number): void {
    this.length.set(length);
  }

  public setDigit(updatedVal: string, i: number): void {
    this.digits.update((val) => val.map((d, ind) => (ind == i ? updatedVal : d)));
  }

  public fill(pasted: string): void {
    this.digits.set(new Array(this.length()).fill('').map((_, i) => pasted[i] ?? ''));
  }
}
