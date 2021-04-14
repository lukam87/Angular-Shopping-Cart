import { Product } from './product-model';
import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart {
  items: ShoppingCartItem[] = [];

  constructor(private itemMap: { [productKey: string]: ShoppingCartItem }) {
    this.itemMap = itemMap || {};
    if (!itemMap) return;

    Object.keys(itemMap).forEach((key) => {
      let item = itemMap[key];

      this.items.push(new ShoppingCartItem({ ...item, key: key }));
    });
  }

  get totalPrice() {
    let count = 0;

    Object.keys(this.items).forEach((key) => {
      count += this.items[key].quantity * this.items[key].price;
    });
    return count;
  }

  get totalCount() {
    let count = 0;

    Object.keys(this.items).forEach((key) => {
      count += this.items[key].quantity;
    });

    return count;
  }

  getQuantity(product: Product) {
    let item = this.itemMap[product.key];

    return item ? item.quantity : 0;
  }
}
