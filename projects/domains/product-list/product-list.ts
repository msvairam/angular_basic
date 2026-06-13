import {
  Component,
  ChangeDetectionStrategy,
  inject,
  signal,
  computed,
  linkedSignal,
  effect,
} from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { rxResource, takeUntilDestroyed, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';


import { ProductData } from './data/product-data';

@Component({
  selector: 'app-product-list',
  imports: [FormsModule, CurrencyPipe],
  providers: [ProductData],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductList {
  // Inject
  private productData = inject(ProductData);

  // Template Variables
  protected readonly searchTerm = signal('');
  protected readonly currentPage = signal(1);
  protected limit = signal<number>(10);

  // Resource API
  protected readonly productResource = rxResource({
    params: () => {
      return {
        limit: this.limit(),
        skip: this.skip(),
        q: this.debounceSearchTerm(),
      };
    },
    stream: ({ params: { ...queryParams } }) => {
      return this.productData.getProducts(queryParams);
    },
  });

  // Computed signals
  protected readonly products = computed(() => this.productResource.value()?.products ?? []);
  protected readonly totalProducts = computed(() => this.productResource.value()?.total ?? 0);

  protected readonly debounceSearchTerm  =  toSignal(
        toObservable(this.searchTerm)
            .pipe(
                debounceTime(500),
                distinctUntilChanged(),
                takeUntilDestroyed(),
            ),
            { initialValue:  ''}
    );

  protected readonly visiblePages = computed(() => {
    const total = this.totalPages();
    const current = this.currentPage();
    const range = 2;

    const start = Math.max(1, current - range);
    const end = Math.min(total, current + range);

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  });

  protected readonly totalPages = computed(() => {
    return Math.ceil(this.totalProducts() / this.limit());
  })

  // Linked signal
  protected skip = linkedSignal(() => {
    const limit = this.limit();
    const currentPage = this.currentPage();
    return currentPage === 0 ? 0 : (currentPage - 1) * limit;
  });

  // functions
  onFilterChange() {
    this.skip.set(0);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }

  nextPage() {
    this.goToPage(this.currentPage() + 1);
  }

  prevPage() {
    this.goToPage(this.currentPage() - 1);
  }

  constructor() {
    effect(() => {
      console.log(this.visiblePages());
    });
  }
}
