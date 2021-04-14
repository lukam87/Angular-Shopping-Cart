import { Shipping } from 'src/app/shopping/core/shipping-model';

export interface Order {
  datePlaced: number;
  items: [
    product: {
      imageUrl: string;
      price: number;
      title: string;
    },
    quantity: number,
    totalPrice: number
  ];
  shipping: Shipping;
  userId: string;
}
