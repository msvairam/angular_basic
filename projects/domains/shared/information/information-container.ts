import { NgOptimizedImage } from '@angular/common';
import {
  afterEveryRender,
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  input,
  signal,
  SimpleChanges,
} from '@angular/core';
import { email, form, required, FormField } from '@angular/forms/signals';
import { ConvertToInt } from '../../../lib-common/directives/convert-integer';

@Component({
  selector: 'information-view',
  templateUrl: './information.container.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormField, NgOptimizedImage, ConvertToInt],
})
export class InformationView {

    private readonly elementRef = inject(ElementRef);

  public readonly user = signal({ email: '', age: 25 });

  protected readonly userForm = form(this.user, (path) => {
    required(path.email, { message: 'Email id Required' });
    email(path.email);
  });

  public readonly message = input.required({ transform: trimString });

  ngOnChanges(changes: SimpleChanges<InformationView>) {
    console.log('ngOnChanges calling');
    if (changes.message) {
      console.log(changes.message.currentValue);
      console.log(changes.message.firstChange);
      console.log(changes.message.previousValue);
    }
  }

  ngDoCheck() {
    console.log('ngDoCheck calling');
  }

  ngAfterContentInit() {
    console.log('ngAfterContentInit calling');
  }

  ngAfterContentChecked() {
    console.log('ngAfterContentChecked calling');
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit calling');
    this.elementRef.nativeElement.querySelector('input')?.focus();
  }

  ngAfterViewChecked() {
    console.log('ngAfterViewChecked calling');
  }

  afterNextRender() {
    console.log('afterNextRender calling');
  }

  afterEveryRender() {
    console.log('afterEveryRender calling');
  }

  constructor() {
    const destroyRef = inject(DestroyRef);
    console.log(destroyRef.destroyed);
    destroyRef.onDestroy(() => {
      console.log('Home Page Destory');
    });

    afterEveryRender(() => {
      console.log('afterEveryRender calling');
    });

    afterNextRender(() => {
      console.log('afterNextRender calling');
    });
  }
}

function trimString(value: string) {
  return value.trim() ?? '';
}
