import { CanDeactivateFn } from '@angular/router';
import { ProductInfo } from '../../domains/routing/overview/usecase1/product-info';

export const UnsavedChangesGuard: CanDeactivateFn<ProductInfo> = (component: ProductInfo) => {
    return component.isChangeSaved() ? true : confirm('Please save the changes');
}