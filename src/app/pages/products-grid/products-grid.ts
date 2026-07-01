import { Component, computed, inject, input, signal, Signal } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products-grid',
  imports: [],
  templateUrl: './products-grid.html',
  styleUrl: './products-grid.scss',
})
export class ProductsGrid {
  private readonly _productService = inject(ProductService);
  public category = input<string>('all');
  public products = signal<Product[]>([]);
  public filteredProducts = computed(() =>
    this.products().filter(
      (p) => p.category.toLocaleLowerCase() === this.category().toLocaleLowerCase(),
    ),
  );

  constructor() {
    this.products.set(this._productService.getProducts());
  }
}
