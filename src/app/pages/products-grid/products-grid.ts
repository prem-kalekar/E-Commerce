import { Component, computed, inject, input, signal, Signal } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { ProductCard } from '../../components/product-card/product-card';

@Component({
  selector: 'app-products-grid',
  imports: [ProductCard],
  templateUrl: './products-grid.html',
  styleUrl: './products-grid.scss',
})
export class ProductsGrid {
  private readonly _productService = inject(ProductService);
  public category = input<string>('all');
  public products = signal<Product[]>([]);
  public filteredProducts = computed(() => {
    if (this.category().toLocaleLowerCase() === 'all') return this.products();
    return this.products().filter(
      (p) => p.category.toLocaleLowerCase() === this.category().toLocaleLowerCase(),
    );
  });

  constructor() {
    this.products.set(this._productService.getProducts());
  }

  public addToCart(event: Product) {}
}
